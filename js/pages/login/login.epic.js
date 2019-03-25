import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import axios from 'axios';
import { I18n } from '../../utils';
const mapErrorMessage = error => {
  switch (error.code) {
    case 125:
      return I18n.t('signUpErrorEmailInvalid');
    case 126:
      return I18n.t('signUpErrorUserIdInvalid');
    case 139:
      return I18n.t('signUpErrorUsernameInvalid');

    case 200:
      return I18n.t('usernameEmpty');

    case 201:
      return I18n.t('passwordEmpty');
    case 202:
      return I18n.t('signUpErrorUsernameOccupied');

    case 203:
      return I18n.t('signUpErrorEmailOccupied');
    default:
      return I18n.t('signUpErrorDefault') + `${error}`;
  }
};
const login = (action$, state$, { dispatch, User }) =>
  action$.pipe(
    ofType('LOGIN'),
    switchMap(action =>
      Observable.create(async observer => {
        try {
          const { username, password, callback } = action.payload;
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: true,
            }),
          );
          await User.logIn({ username, password });
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          callback && callback();
        } catch (error) {
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          console.warn(error);
        } finally {
          observer.complete();
        }
      }),
    ),
  );

const signUp = (action$, state$, { User, httpClient, dispatch }) =>
  action$.pipe(
    ofType('SIGNUP'),
    switchMap(action =>
      Observable.create(async observer => {
        try {
          const { username, password, email, callback } = action.payload;
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: true,
            }),
          );
          await User.signUp({
            username,
            password,
            email,
          });
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          callback && callback();
          try {
            const ipInfo = await axios.get('https://ipapi.co/json');

            const info = {
              ip: ipInfo.data.ip,
              city: ipInfo.data.city,
              region: ipInfo.data.region,
              country_name: ipInfo.data.country_name,
              latitude: ipInfo.data.latitude,
              longitude: ipInfo.data.longitude,
              timezone: ipInfo.data.timezone,
            };

            await httpClient.post('/user/update', {
              object_id: User.objectId,
              username: username,
              password: password,
              email: email,
              detail: JSON.stringify(info),
              user_coin: User.userCoin,
            });
            // user.set('userId', data.id);
          } catch (error) {
            console.warn(error);
          }
        } catch (error) {
          console.warn(error);
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          const content = mapErrorMessage(error);
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              content,
              type: 'ERROR',
            }),
          );
        } finally {
          observer.complete();
        }
      }),
    ),
  );

export default [login, signUp];

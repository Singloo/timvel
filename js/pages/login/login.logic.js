import { createLogic } from 'redux-logic';
import axios from 'axios';
import AV from 'leancloud-storage';
const login = createLogic({
  type: 'LOGIN',
  latest: true,
  async process({ action, logic, User, httpClient, I18n }, dispatch, done) {
    try {
      const { username, password, callback } = action.payload;
      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: true,
        }),
      );
      // await AV.User.requestPasswordReset('15599028773@163.com')
      // await AV.User.logIn(username, password);

      await User.logIn({ username, password });

      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: false,
        }),
      );
      callback && callback();
      // dispatch(logic('UPDATE_USERINFO'));
    } catch (error) {
      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: false,
        }),
      );
      console.warn(error);
    } finally {
      done();
    }
  },
});

const signUp = createLogic({
  type: 'SIGNUP',
  latest: true,
  async process({ action, logic, User, httpClient, I18n }, dispatch, done) {
    try {
      const { username, password, email, callback } = action.payload;
      await User.signUp({
        username,
        password,
        email,
      });
      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: true,
        }),
      );
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

        await httpClient.post('/update_user_info', {
          object_id: User.objectId,
          username: username,
          password: password,
          email: email,
          detail: JSON.stringify(info),
        });
        // user.set('userId', data.id);
      } catch (error) {
        console.warn(error);
      }
      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: false,
        }),
      );
      callback && callback();
    } catch (error) {
      console.warn(error);
      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: false,
        }),
      );
      switch (error.code) {
        case 125:
          dispatch(
            logic('SHOW_SNAKE_BAR', {
              content: I18n.t('signUpErrorEmailInvalid'),
              type: 'ERROR',
            }),
          );
          break;
        case 126:
          dispatch(
            logic('SHOW_SNAKE_BAR', {
              content: I18n.t('signUpErrorUserIdInvalid'),
              type: 'ERROR',
            }),
          );
          break;
        case 139:
          dispatch(
            logic('SHOW_SNAKE_BAR', {
              content: I18n.t('signUpErrorUsernameInvalid'),
              type: 'ERROR',
            }),
          );
          break;
        case 200:
          dispatch(
            logic('SHOW_SNAKE_BAR', {
              content: I18n.t('usernameEmpty'),
              type: 'ERROR',
            }),
          );
          break;
        case 201:
          dispatch(
            logic('SHOW_SNAKE_BAR', {
              content: I18n.t('passwordEmpty'),
              type: 'ERROR',
            }),
          );
          break;
        case 202:
          dispatch(
            logic('SHOW_SNAKE_BAR', {
              content: I18n.t('signUpErrorUsernameOccupied'),
              type: 'ERROR',
            }),
          );
          break;
        case 203:
          dispatch(
            logic('SHOW_SNAKE_BAR', {
              content: I18n.t('signUpErrorEmailOccupied'),
              type: 'ERROR',
            }),
          );
          break;

        default:
          dispatch(
            logic('SHOW_SNAKE_BAR', {
              content: I18n.t('signUpErrorDefault') + `${error}`,
              type: 'ERROR',
            }),
          );
          break;
      }
    } finally {
      done();
    }
  },
});
export default [login, signUp];

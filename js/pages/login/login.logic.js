import { createLogic } from 'redux-logic';
import axios from 'axios';
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
      await User.logIn({ username, password });

      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: false,
        }),
      );
      callback && callback();
      dispatch(logic('UPDATE_USERINFO'));
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
      let user = await User.signUp({
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

        const { data } = await httpClient.post('/update_user_info', {
          object_id: user.get('objectId'),
          username: username,
          password: password,
          email: email,
          detail: JSON.stringify(info),
        });
        user.set('userId', data.userId);
        user.save();
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
            logic('GLOBAL_SET_STATE', {
              snakeBarInfo: I18n.t('signUpErrorEmailInvalid'),
              snakeBarType: 'error',
            }),
          );
          break;
        case 125:
          dispatch(
            logic('GLOBAL_SET_STATE', {
              snakeBarInfo: I18n.t('signUpErrorUserIdInvalid'),
              snakeBarType: 'error',
            }),
          );
          break;
        case 139:
          dispatch(
            logic('GLOBAL_SET_STATE', {
              snakeBarInfo: I18n.t('signUpErrorUsernameInvalid'),
              snakeBarType: 'error',
            }),
          );
          break;
        case 200:
          dispatch(
            logic('GLOBAL_SET_STATE', {
              snakeBarInfo: I18n.t('usernameEmpty'),
              snakeBarType: 'error',
            }),
          );
          break;
        case 201:
          dispatch(
            logic('GLOBAL_SET_STATE', {
              snakeBarInfo: I18n.t('passwordEmpty'),
              snakeBarType: 'error',
            }),
          );
          break;
        case 202:
          dispatch(
            logic('GLOBAL_SET_STATE', {
              snakeBarInfo: I18n.t('signUpErrorUsernameOccupied'),
              snakeBarType: 'error',
            }),
          );
          break;
        case 203:
          dispatch(
            logic('GLOBAL_SET_STATE', {
              snakeBarInfo: I18n.t('signUpErrorEmailOccupied'),
              snakeBarType: 'error',
            }),
          );
          break;

        default:
          dispatch(
            logic('GLOBAL_SET_STATE', {
              snakeBarInfo: I18n.t('signUpErrorDefault') + `${error}`,
              snakeBarType: 'error',
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

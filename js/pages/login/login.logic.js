import { createLogic } from 'redux-logic';

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
      const user = await User.signUp({
        username,
        password,
        email,
      });
    } catch (error) {
      console.warn(error);
      switch (error.code) {
        case 125:
          dispatch('GLOBAL_SET_STATE', {
            snakeBarInfo: I18n.t('signUpErrorEmailInvalid'),
            snakeBarType: 'error',
          });
          break;
        case 125:
          dispatch('GLOBAL_SET_STATE', {
            snakeBarInfo: I18n.t('signUpErrorUserIdInvalid'),
            snakeBarType: 'error',
          });
          break;
        case 139:
          dispatch('GLOBAL_SET_STATE', {
            snakeBarInfo: I18n.t('signUpErrorUsernameInvalid'),
            snakeBarType: 'error',
          });
          break;
        case 200:
          dispatch('GLOBAL_SET_STATE', {
            snakeBarInfo: I18n.t('usernameEmpty'),
            snakeBarType: 'error',
          });
          break;
        case 201:
          dispatch('GLOBAL_SET_STATE', {
            snakeBarInfo: I18n.t('passwordEmpty'),
            snakeBarType: 'error',
          });
          break;
        case 202:
          dispatch('GLOBAL_SET_STATE', {
            snakeBarInfo: I18n.t('signUpErrorUsernameOccupied'),
            snakeBarType: 'error',
          });
          break;
        case 203:
          dispatch('GLOBAL_SET_STATE', {
            snakeBarInfo: I18n.t('signUpErrorEmailOccupied'),
            snakeBarType: 'error',
          });
          break;

        default:
          dispatch('GLOBAL_SET_STATE', {
            snakeBarInfo: I18n.t('signUpErrorDefault') + `${error}`,
            snakeBarType: 'error',
          });
          break;
      }
    } finally {
      done();
    }
  },
});
export default [login, signUp];

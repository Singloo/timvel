import { createLogic } from 'redux-logic';

const navigate = createLogic({
  type: 'NAVIGATION_NAVIGATE',
  latest: true,
  async process({ action, navigation }, dispatch, done) {
    const { routeName, params } = action.payload;
    navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName,
      params: params || {},
    });
    done();
  },
});

const navigateBack = createLogic({
  type: 'NAVIGATION_BACK',
  latest: true,
  async process({ action, navigation }, dispatch, done) {
    navigation.dispatch({
      type: 'Navigation/BACK',
    });
    done();
  },
});

const updateUserinfoFromLeanCloud = createLogic({
  type: 'UPDATE_USERINFO',
  latest: true,
  async process({ action, logic, User, httpClient, I18n }, dispatch, done) {
    try {
      const { password } = action.payload;
      if (!User.isLoggedIn()) {
        done();
        return;
      }
      const {
        user_id,
        object_id,
        username,
        usertitle,
        usercoin,
        email,
        phone_number,
        organization,
      } = await User.getUserInfo();
      const data = await httpClient.post('/update_user_info', {
        params: {
          user_id,
          object_id,
          username,
          usertitle,
          usercoin,
          email,
          phone_number,
          organization,
          password: password || null,
        },
      });
      console.warn(data);
    } catch (error) {
      console.warn(error);
    } finally {
      done();
    }
  },
});

export default [navigate, navigateBack, updateUserinfoFromLeanCloud];

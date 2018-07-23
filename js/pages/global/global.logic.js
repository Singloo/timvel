import { createLogic } from 'redux-logic';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
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

const navigateReset = createLogic({
  type: 'NAVIGATION_RESET',
  latest: true,
  async process({ action, navigation }, dispatch, done) {
    const { routeName } = action.payload;
    const navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })],
    });
    navigation.dispatch(navAction);
    done();
  },
});

const navigateReplace = createLogic({
  type: 'NAVIGATION_REPLACE',
  latest: true,
  async process({ action, navigation }, dispatch, done) {
    const { routeName, params } = action.payload;
    navigation.dispatch({
      type: 'Replace',
      routeName,
      params: params || {},
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
      const ipData = await axios.get('https://ipapi.co/json');
      const info = {
        ip: ipData.ip,
        city: ipData.city,
        region: ipData.region,
        country_name: ipData.country_name,
        latitude: ipData.latitude,
        longitude: ipData.longitude,
        timezone: ipData.timezone,
      };
      const { data } = await httpClient.post('/update_user_info', {
        params: {
          user_id,
          object_id,
          username,
          usertitle,
          usercoin,
          email,
          phone_number,
          organization,
          detail: { ...info },
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

const snakeBar = createLogic({
  type: 'SHOW_SNAKE_BAR',
  latest: true,
  process: ({ logic, action }, dispatch, done) => {
    const { content, type, duration } = action.payload;
    dispatch(
      logic('GLOBAL_SET_STATE', {
        snakeBarInfo: content,
        snakeBarType: type || 'NORMAL',
        snakeBarDuration: duration || 3000,
      }),
    );
    done();
  },
});

export default [
  navigate,
  navigateBack,
  updateUserinfoFromLeanCloud,
  navigateReplace,
  navigateReset,
  snakeBar,
];

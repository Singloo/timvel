import { createLogic } from 'redux-logic';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
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
      const user = await User.currentAsync();
      if (!user) {
        done();
        return;
      }
      const { data: ipData } = await axios.get('https://ipapi.co/json');
      user.set('city', ipData.city);
      user.set('country', ipData.country_name);
      const systemVersion = DeviceInfo.getSystemVersion();
      const deviceStorage =
        DeviceInfo.getTotalDiskCapacity() / 1024 / 1024 / 1024;
      const deviceId = DeviceInfo.getUniqueID();
      const appVersion = DeviceInfo.getVersion();
      let batteryLevel = 0;
      try {
        batteryLevel = await DeviceInfo.getBatteryLevel();
        batteryLevel = (batteryLevel * 100).toFixed(1);
      } catch (error) {}
      const deviceCountry = DeviceInfo.getDeviceCountry();
      const brand = DeviceInfo.getBrand();
      const deviceName = DeviceInfo.getDeviceName();
      const info = {
        ip: ipData.ip,
        city: ipData.city,
        region: ipData.region,
        country_name: ipData.country_name,
        latitude: ipData.latitude,
        longitude: ipData.longitude,
        timezone: ipData.timezone,
        systemVersion,
        deviceStorage,
        deviceId,
        appVersion,
        batteryLevel,
        deviceCountry,
        brand,
        deviceName,
      };
      const user_info = {
        user_id: user.get('userId'),
        object_id: user.get('objectId'),
        username: user.get('username'),
        user_coin: user.get('userCoin'),
        email: user.get('email'),
        phone_number: user.get('mobilePhoneNumber'),
        organization: user.get('organization'),
        avatar: user.get('avatar'),
      };
      const { data } = await httpClient.post('/update_user_info', {
        ...user_info,
        city: ipData.city,
        country: ipData.country_name,
        detail: info,
        password: password,
      });
      if (data.id) {
        user.set('userId', data.id);
      }
      user.save();
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
  process: ({ logic, action, getState }, dispatch, done) => {
    const { content, type, duration } = action.payload;
    //type:'NORMAL' 'ERROR' 'SUCCESS'
    // const { show } = getState().snakebar;
    dispatch(
      logic('SNAKE_BAR_SET_STATE', {
        // show: true,
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

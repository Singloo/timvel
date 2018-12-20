import { createLogic } from 'redux-logic';
import { NavigationActions, StackActions } from 'react-navigation';
// import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import AV from 'leancloud-storage';
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
    const popAction = StackActions.pop({
      n: 1,
    });
    navigation.dispatch(popAction);
    done();
  },
});

const navigateReset = createLogic({
  type: 'NAVIGATION_RESET',
  latest: true,
  async process({ action, navigation }, dispatch, done) {
    const { routeName } = action.payload;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });

    navigation.dispatch(resetAction);
    done();
  },
});

const navigateReplace = createLogic({
  type: 'NAVIGATION_REPLACE',
  latest: true,
  async process({ action, navigation }, dispatch, done) {
    const { routeName, params } = action.payload;
    const replaceAction = StackActions.replace({
      routeName,
      params: params || {},
    });
    navigation.dispatch(replaceAction);
    done();
  },
});

const updateUserinfoFromLeanCloud = createLogic({
  type: 'UPDATE_USERINFO',
  latest: true,
  async process(
    { action, logic, User, httpClient, I18n, Network },
    dispatch,
    done,
  ) {
    try {
      const { password } = action.payload;
      const user = await User.init()

      if (!user) {
        done();
        return;
      }
      // try {
      const { data: ipData } = await Network.getIpInfo();
      user.set('city', ipData.city);
      user.set('country', ipData.country);
      // } catch (err) {
      //   console.warn(err.message);
      // }
      const systemVersion = DeviceInfo.getSystemVersion();
      const deviceStorage =
        DeviceInfo.getTotalDiskCapacity() / 1024 / 1024 / 1024;
      const deviceId = DeviceInfo.getUniqueID();
      const appVersion = DeviceInfo.getVersion();
      let batteryLevel = 0;
      try {
        batteryLevel = await DeviceInfo.getBatteryLevel();
        batteryLevel = (batteryLevel * 100).toFixed(1);
      } catch (error) {
        console.warn('error');
      }
      const deviceCountry = DeviceInfo.getDeviceCountry();
      const brand = DeviceInfo.getBrand();
      const deviceName = DeviceInfo.getDeviceName();
      const info = {
        ip: ipData.ip,
        city: ipData.city,
        region: ipData.regionName,
        country_name: ipData.country,
        latitude: ipData.lat,
        longitude: ipData.lon,
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
        object_id: user.get('objectId'),
        username: user.get('username'),
        user_coin: user.get('userCoin'),
        email: user.get('email'),
        phone_number: user.get('mobilePhoneNumber'),
        organization: user.get('organization'),
        avatar: user.get('avatar'),
      };
      await httpClient.post('/update_user_info', {
        ...user_info,
        city: ipData.city,
        country: ipData.country_name,
        detail: info,
        password: password,
      });
      user.save();
    } catch (error) {
      console.warn(error.message);
    } finally {
      done();
    }
  },
});

export default [
  navigate,
  navigateBack,
  updateUserinfoFromLeanCloud,
  navigateReplace,
  navigateReset,
  // snakeBar,
];

import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { $CENTER, $TYPES } from '../../utils/$observable';
import DeviceInfo from 'react-native-device-info';
const coinTransaction = (action$, state$, { User, dispatch }) =>
  action$.pipe(
    ofType('COIN_TRANSACTION'),
    map(({ payload }) => {
      const { transaction } = payload;
      $CENTER.next({
        type: $TYPES.coinTransaction,
        payload: {
          transaction,
        },
      });
      User.increaseCoin(parseInt(transaction, 10));
      return dispatch(null);
    }),
  );
const updateUserinfoFromLeanCloud = (
  action$,
  state$,
  { User, httpClient, Network },
) =>
  action$.pipe(
    ofType('UPDATE_USERINFO'),
    switchMap(action =>
      Observable.create(async observer => {
        try {
          const { password } = action.payload;
          const user = await User.init();
          if (!user) {
            observer.complete();
            return;
          }
          const { data: ipData } = await Network.getIpInfo();
          user.set('city', ipData.city);
          user.set('country', ipData.country);
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
          observer.complete();
        } catch (error) {
          console.warn(error.message);
          observer.complete();
        }
      }),
    ),
  );

export default [coinTransaction, updateUserinfoFromLeanCloud];

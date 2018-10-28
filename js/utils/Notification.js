import {
  PushNotificationIOS,
  AppState,
  Alert,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';
const AndroidNotification = NativeModules.AndroidNotification;
export default class Notification {
  constructor(installation) {
    this.Installation = installation;
  }
  IOSinitPush = () => {
    PushNotificationIOS.addEventListener('register', this.IOSonRegister);
    PushNotificationIOS.addEventListener(
      'notification',
      this.IOSonNotification,
    );
    PushNotificationIOS.requestPermissions();
  };

  //权限获取成功回调
  IOSonRegister = deviceToken => {
    console.warn(deviceToken);
    if (deviceToken) {
      this.IOSsaveInstallation(deviceToken);
    }
  };

  //保存deviceToken到Installation
  IOSsaveInstallation = deviceToken => {
    const info = {
      apnsTopic: 'com.timvel',
      deviceType: 'ios',
      deviceToken: deviceToken,
    };
    this.Installation.getCurrent()
      .then(installation => installation.save(info))
      .then(result => console.warn(result))
      .catch(error => console.warn(error));
  };

  IOSonNotification = notification => {
    //如果app在前台则显示alert
    if (AppState.currentState === 'active') {
      // this._showAlert(notification._alert);
    }
  };

  IOSonNotificationTapped = () => {
    Alert.alert('Notification Tapped');
  };
  IOScleanBadge = () => {
    this.Installation.getCurrent()
      .then(installation => {
        installation.set('badge', 0);
        return installation.save();
      })
      .then(result => {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
      })
      .catch(error => console.log(error));
  };

  //android
  AndroidinitPush = () => {
    this.AndroidInstallation();
  };

  AndroidInstallation = () => {
    AndroidNotification.saveInstaillation(installationId => {
      if (installationId) {
        // console.warn('Android installation', installationId);
        DeviceEventEmitter.addListener(
          AndroidNotification.ON_RECEIVE,
          notification => {
            console.warn('receive android notification');
          },
        );
        DeviceEventEmitter.addListener(AndroidNotification.ON_ERROR, res => {
          console.warn('android notification error');
          console.warn(res);
        });
        DeviceEventEmitter.addListener(
          AndroidNotification.ON_CUSTOM_RECEIVE,
          notification => {
            console.warn('receive custom android notification');
            // this._showAlert(JSON.parse(notification.data).alert);
          },
        );
      }
    });
  };
}

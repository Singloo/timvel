import {
  PushNotificationIOS,
  AppState,
  Alert,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';
//@ts-ignore
import Installation from 'leancloud-installation';
const AndroidNotification = NativeModules.AndroidNotification;
export default class Notification {
  Installation: Installation;
  constructor(installation: Installation) {
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
  IOSonRegister = (deviceToken: string) => {
    console.warn(deviceToken);
    if (deviceToken) {
      this.IOSsaveInstallation(deviceToken);
    }
  };

  //保存deviceToken到Installation
  IOSsaveInstallation = (deviceToken: string) => {
    const info = {
      apnsTopic: 'com.timvel',
      deviceType: 'ios',
      deviceToken: deviceToken,
    };
    this.Installation.getCurrent()
      .then((installation: any) => installation.save(info))
      .then((result: any) => console.warn(result))
      .catch((error: any) => console.warn(error));
  };

  IOSonNotification = (notification: any) => {
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
      .then((installation: any) => {
        installation.set('badge', 0);
        return installation.save();
      })
      .then((result: any) => {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
      })
      .catch((error: any) => console.log(error));
  };

  //android
  AndroidinitPush = () => {
    this.AndroidInstallation();
  };

  AndroidInstallation = () => {
    AndroidNotification.saveInstaillation((installationId: any) => {
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

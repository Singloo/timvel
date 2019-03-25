/*
 * File: /Users/origami/Desktop/timvel/js/utils/Permission.ts
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Monday March 25th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday March 25th 2019 10:11:55 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import Permissions from 'react-native-permissions';
import {
  PermissionsAndroid,
  Platform,
  PermissionsAndroidStatic,
  Permission,
} from 'react-native';
type IPermission = 'microphone' | 'camera';
const platformMap = (ios: any, android: any) =>
  Platform.select({
    ios,
    android,
  });
const permissionMap = (permission: IPermission) => {
  switch (permission) {
    case 'microphone':
      return platformMap(
        'microphone',
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
    case 'camera':
      return platformMap('camera', PermissionsAndroid.PERMISSIONS.CAMERA);
  }
};
const checkPermission = (permission: IPermission) => async (
  onDeny?: () => void,
  onGrant?: () => void,
) => {
  const fixedPermission = permissionMap(permission);
  if (!fixedPermission) {
    throw new Error('permission not exists');
  }
  if (Platform.OS === 'ios') {
    const response = await Permissions.check(fixedPermission);
    if (response === 'authorized') {
      onGrant && onGrant();
      return;
    }
    if (['undetermined', 'restricted'].includes(response)) {
      const _response = await Permissions.request(fixedPermission);
      if (_response == 'denied') {
        onDeny && onDeny();
      }
      if (_response == 'authorized') {
        onGrant && onGrant();
      }
    }
  } else {
    const allowed = await PermissionsAndroid.check(
      fixedPermission as Permission,
    );
    if (allowed) {
      onGrant && onGrant();
      return;
    }

    const granted = await PermissionsAndroid.request(
      fixedPermission as Permission,
      {
        title: 'Ask for permission',
        message: 'We need access to microphone' + ' to start video call',
        buttonNegative: 'Cancel',
        buttonPositive: 'Of course',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      onGrant && onGrant();
      // console.log('You can use the camera');
    } else {
      onDeny && onDeny();
    }
  }
};
const checkMicrophonePermission = checkPermission('microphone');

const checkCameraPermission = checkPermission('camera');

export default { checkMicrophonePermission, checkCameraPermission };

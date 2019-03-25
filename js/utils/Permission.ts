/*
 * File: /Users/origami/Desktop/timvel/js/utils/Permission.ts
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Monday March 25th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday March 25th 2019 5:54:19 pm
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
type IPermission = 'microphone' | 'camera' | 'photo';
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
    case 'photo':
      return platformMap('photo', null);
  }
};
const checkPermission = (permission: IPermission, message: string) => async (
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
        title: 'Pending permission',
        message: message || 'We need access to continue',
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
const checkMicrophonePermission = checkPermission(
  'microphone',
  'We need access to microphone to record audio',
);

const checkCameraPermission = checkPermission(
  'camera',
  'We use access to your camera to shoot picture and set your avatar',
);
const checkPhotoPermission = checkPermission(
  'photo',
  'We need access to your photo album to share picture with other users',
);
export default {
  checkMicrophonePermission,
  checkCameraPermission,
  checkPhotoPermission,
};

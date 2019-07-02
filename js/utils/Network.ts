import { CameraRoll } from 'react-native';
import RNFS from 'react-native-fs';
import {
  darkSkyKey,
  imageUrlPrefix,
  IP_INFO_END_POINT,
  WEATHER_INFO_END_POINT,
} from '../constants';
import { apiClient, axios } from './httpClient';
async function getIpInfo() {
  return axios.get(IP_INFO_END_POINT);
}

async function getWeatherInfoToday(
  latitude: number | string,
  longitude: number | string,
) {
  return axios.get(WEATHER_INFO_END_POINT, {
    params: {
      latitude: latitude,
      longitude: longitude,
      sign: 'zUFJoAR2ZVrDy1vF3D07',
      isGlobal: true,
      locale: 'zh_cn',
      appKey: 'weather20151024',
    },
  });
}

async function getWeatherInfoBefore(
  latitude: number | string,
  longitude: number | string,
  timestamp: number,
) {
  let darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyKey}/${latitude},${longitude},${timestamp}`;
  return axios.get(darkSkyUrl, {
    params: {
      exclude: ['hourly', 'minutely'],
      units: 'si',
    },
  });
}

async function saveImageToAlbum(imageUrl: string) {
  const cachedFilepath =
    RNFS.CachesDirectoryPath + '/' + Date.now().toString() + '.jpg';
  try {
    const DownloadFileOptions = {
      fromUrl: imageUrl, // URL to download file from
      toFile: cachedFilepath, // Local filesystem path to save the file to
      // headers?: Headers;        // An object of headers to be passed to the server
      // background?: boolean;     // Continue the download in the background after the app terminates (iOS only)
      // discretionary?: boolean;  // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
      // cacheable?: boolean;      // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)
      // progressDivider?: number;
      // begin?: (res: DownloadBeginCallbackResult) => void;
      // progress?: (res: DownloadProgressCallbackResult) => void;
      // resumable?: () => void;    // only supported on iOS yet
      // connectionTimeout?: number // only supported on Android yet
      // readTimeout?: number       // supported on Android and iOS
    };
    const result = RNFS.downloadFile(DownloadFileOptions);
    await result.promise;
    await CameraRoll.saveToCameraRoll('file://' + cachedFilepath);
    console.warn('saved success');
  } catch (error) {
    console.warn(error.message);
    throw error;
  } finally {
    RNFS.unlink(cachedFilepath)
      .then(() => {})
      .catch(err => {
        console.warn('unlinke image err', err);
      });
  }
}
const getUserInfo = (user_id: string) => {
  return apiClient.get(`/user/${user_id}`);
};

function report(
  child_id: number,
  type: string,
  reason: string,
  user_id: string,
) {
  apiClient
    .post('/report', {
      child_id,
      type,
      reason,
      user_id,
    })
    .then(() => {})
    .catch(err => {
      console.warn(err);
    });
}
export {
  getIpInfo,
  getWeatherInfoBefore,
  getWeatherInfoToday,
  saveImageToAlbum,
  getUserInfo,
  report,
};

import Axios from 'axios';
import { CameraRoll } from 'react-native';
import * as Constants from '../constants';
import RNFS from 'react-native-fs';
import Card from '../../re-kits/components/ActionButton/Item';
const imageUrlPrefix = 'https://timvel-1.oss-cn-hangzhou.aliyuncs.com/images/';
const axios = Axios.create({
  timeout: 20000,
});
export async function getIpInfo() {
  return axios.get('http://ip-api.com/json');
}

export async function getWeatherInfoToday(latitude, longitude) {
  return axios.get('https://weatherapi.market.xiaomi.com/wtr-v3/weather/all', {
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

export async function getWeatherInfoBefore(latitude, longitude, timestamp) {
  let darkSkyUrl = `https://api.darksky.net/forecast/${
    Constants.darkSkyKey
  }/${latitude},${longitude},${timestamp}`;
  return axios.get(darkSkyUrl, {
    params: {
      exclude: ['hourly', 'minutely'],
      units: 'si',
    },
  });
}

export async function saveImageToAlbum(imageUrl) {
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
    // try {
    //   await RNFS.unlink(cachedFilepath);
    // } catch (err) {
    //   console.warn(err.message);
    //   console.warn('failed to unlink');
    // }
    console.warn('saved success');
  } catch (error) {
    await RNFS.unlink(cachedFilepath);
    console.warn(error.message);
    throw error;
  }
}

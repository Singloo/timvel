import Axios from 'axios';
import * as Constants from '../constants';
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

/*
 * File: /Users/origami/Desktop/timvel/js/utils/httpClient.ts
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday April 27th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday April 27th 2019 5:49:40 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { API_V1 } from '../constants';
import Axios from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const headers = {
  app: 'timvel-mobile',
  platform: Platform.OS,
  'build-number': DeviceInfo.getBuildNumber(),
  'readable-version': DeviceInfo.getReadableVersion(),
  buildNumber: DeviceInfo.getBuildNumber(),
  readableVersion: DeviceInfo.getReadableVersion(),
  build_number: DeviceInfo.getBuildNumber(),
  readable_version: DeviceInfo.getReadableVersion(),
};
const apiClient = Axios.create({
  timeout: 20000,
  baseURL: API_V1,
  headers,
});
const axios = Axios.create({
  timeout: 10000,
});
export { apiClient, axios };

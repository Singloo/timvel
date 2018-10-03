import AliyunOSS from 'aliyun-oss-react-native';
import Axios from 'axios';
import { API_V1 } from '../constants';
import * as User from './User';
// AliyunOSS.enableDevMode();

const configuration = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60,
};

const END_POINT_HUADONG_1 = 'https://oss-cn-hangzhou.aliyuncs.com';
const BUCKET_TIMVEL_1 = 'timvel-1';
const imageUrlPrefix = 'https://timvel-1.oss-cn-hangzhou.aliyuncs.com/images/';
export async function initAliyunOSS() {
  try {
    const { data } = await Axios.get(API_V1 + '/get_aliyun_access_key', {
      params: {
        user_id: 1,
      },
    });
    AliyunOSS.initWithSecurityToken(
      data.securityToken,
      data.accessKeyId,
      data.accessKeySecret,
      END_POINT_HUADONG_1,
      configuration,
    );
    console.warn('aliyun oss initialized');
  } catch (error) {
    throw error;
  }
}

export const upLoadImage = async image => {
  try {
    await initAliyunOSS();
    const filepath = image.path;
    const imageType = image.mime.replace('image/', '');
    let filename = User.username() + Date.now() + '.' + imageType;
    filename = filename.trim().toLowerCase();
    await AliyunOSS.asyncUpload(
      BUCKET_TIMVEL_1,
      `images/${filename}`,
      filepath,
    );
    return imageUrlPrefix + filename;
  } catch (error) {
    throw error;
  }
};

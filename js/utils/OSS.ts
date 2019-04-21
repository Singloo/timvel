//@ts-ignore
import AliyunOSS from 'aliyun-oss-react-native';
import Axios from 'axios';
import { API_V1 } from '../constants';
import User from './User';
// AliyunOSS.enableDevMode()
const configuration = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60,
};

const END_POINT_HUADONG_1 = 'oss-cn-hangzhou.aliyuncs.com';
// 'https://oss-cn-hangzhou.aliyuncs.com';
const BUCKET_TIMVEL_1 = 'timvel-1';
const imageUrlPrefix = 'https://timvel-1.oss-cn-hangzhou.aliyuncs.com';
export async function initAliyunOSS() {
  try {
    const { data } = await Axios.get(API_V1 + '/user/authorize', {
      params: {
        user_id: 1,
      },
    });
    // AliyunOSS.initWithPlainTextAccessKey(
    //   'LTAIqxYu6RVsr6g8',
    //   'SzuIV5P7h9R3suM9ITpCtBXdaD2u0X',
    //   END_POINT_HUADONG_1,
    // );
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

// creationDate: "1255122560"
// cropRect: null
// data: null
// exif: null
// filename: "IMG_0002.JPG"
// height: 2848
// localIdentifier: "B84E8479-475C-4727-A4A4-B77AA9980897/L0/001"
// mime: "image/jpeg"
// modificationDate: "1441224147"
// path: "/Users/origami/Library/Developer/CoreSimulator/Devices/1575DB38-2B32-4A34-A30A-A42FCFEFDC25/data/Containers/Data/Application/5D8ABDD0-B9E0-4631-9946-759469DA5230/tmp/react-native-image-crop-picker/8DA46C5B-7B23-4F25-85A8-116A4B957531.jpg"
// size: 2604768
// sourceURL: "file:///Users/origami/Library/Developer/CoreSimulator/Devices/1575DB38-2B32-4A34-A30A-A42FCFEFDC25/data/Media/DCIM/100APPLE/IMG_0002.JPG"
// width: 4288
//path, mime necessary
const getFilename = (path: string) => {
  const arr = path.split('/');
  return arr[arr.length - 1] || `${Date.now()}.jpg`;
};
export const upLoadImage = async (
  path: string,
  { ossPath }: { ossPath?: string } = {},
) => {
  try {
    await initAliyunOSS();
    let filename = User.objectId + '_' + getFilename(path);
    const OSS_PATH =
      typeof ossPath === 'string' ? 'images/' + ossPath.trim() : 'images';
    const imageUrl = imageUrlPrefix + '/' + OSS_PATH + '/' + filename;
    const exists = await AliyunOSS.doesObjectExist(
      BUCKET_TIMVEL_1,
      `${OSS_PATH}/${filename}`,
    );
    console.warn(exists);
    // return;
    if (exists == 'object exist') {
      return imageUrl;
    }
    await AliyunOSS.asyncUpload(
      BUCKET_TIMVEL_1,
      `${OSS_PATH}/${filename}`,
      path,
    );
    console.warn('upload finish', filename);
    return imageUrl;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

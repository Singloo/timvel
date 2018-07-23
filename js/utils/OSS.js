// import AliyunOSS from 'aliyun-oss-react-native-sdk';

// const configuration = {
//   maxRetryCount: 3,
//   timeoutIntervalForRequest: 30,
//   timeoutIntervalForResource: 24 * 60 * 60,
// };

// const END_POINT_HUADONG_1 = 'https://oss-cn-hangzhou.aliyuncs.com';
// const BUCKET_TIMVEL_1 = 'timvel-1';
// export function initOSS() {
//   AliyunOSS.initWithPlainTextAccessKey(
//     'LTAIlCcEgUoAWXKf',
//     'XlYqoHRV51moNELY21onkL3ttrHI8f',
//     END_POINT_HUADONG_1,
//     configuration,
//   );
// }

// export const upLoadImage = async (filename, filepath) => {
//   try {
//     AliyunOSS.asyncUpload(BUCKET_TIMVEL_1, `images/${filename}`, filepath);
//   } catch (error) {
//     throw error;
//   } finally {
//   }
// };

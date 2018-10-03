import { createLogic } from 'redux-logic';
import Moment from 'moment';
import { xiaomiWeatherinfo, darkSkyWeatherType } from './untils/weatherData';
// let xiaomiWeatherinfo = [
//   {
//     code: 0,
//     wea: '晴',
//     icon: 'sunny',
//   },
//   {
//     code: 1,
//     wea: '多云',
//     icon: 'cloudy',
//   },
//   {
//     code: 2,
//     wea: '阴',
//     icon: 'cloudySky',
//   },
//   {
//     code: 3,
//     wea: '阵雨',
//     icon: 'shower',
//   },
//   {
//     code: 4,
//     wea: '雷阵雨',
//     icon: 'thunderstorm',
//   },
//   {
//     code: 5,
//     wea: '雷阵雨并伴有冰雹',
//     icon: 'sleet',
//   },
//   {
//     code: 6,
//     wea: '雨夹雪',
//     icon: 'sleet',
//   },
//   {
//     code: 7,
//     wea: '小雨',
//     icon: 'smallRain',
//   },
//   {
//     code: 8,
//     wea: '中雨',
//     icon: 'shower',
//   },
//   {
//     code: 9,
//     wea: '大雨',
//     icon: 'rainstorm',
//   },
//   {
//     code: 10,
//     wea: '暴雨',
//     icon: 'rainstorm',
//   },
//   {
//     code: 11,
//     wea: '大暴雨',
//     icon: 'rainstorm',
//   },
//   {
//     code: 12,
//     wea: '特大暴雨',
//     icon: 'rainstorm',
//   },
//   {
//     code: 13,
//     wea: '阵雪',
//     icon: 'snowBig',
//   },
//   {
//     code: 14,
//     wea: '小雪',
//     icon: 'snowMid',
//   },
//   {
//     code: 15,
//     wea: '中雪',
//     icon: 'snowMid',
//   },
//   {
//     code: 16,
//     wea: '大雪',
//     icon: 'snowMid',
//   },
//   {
//     code: 17,
//     wea: '暴雪',
//     icon: 'snowMid',
//   },
//   {
//     code: 18,
//     wea: '雾',
//     icon: 'fog',
//   },
//   {
//     code: 19,
//     wea: '冻雨',
//     icon: 'sleet',
//   },
//   {
//     code: 20,
//     wea: '沙尘暴',
//     icon: 'sandstorm',
//   },
//   {
//     code: 21,
//     wea: '小雨-中雨',
//     icon: 'smallRain',
//   },
//   {
//     code: 22,
//     wea: '中雨-大雨',
//     icon: 'rainstorm',
//   },
//   {
//     code: 23,
//     wea: '大雨-暴雨',
//     icon: 'rainstorm',
//   },
//   {
//     code: 24,
//     wea: '暴雨-大暴雨',
//     icon: 'rainstorm',
//   },
//   {
//     code: 25,
//     wea: '大暴雨-特大暴雨',
//     icon: 'rainstorm',
//   },
//   {
//     code: 26,
//     wea: '小雪-中雪',
//     icon: 'snowMid',
//   },
//   {
//     code: 27,
//     wea: '中雪-大雪',
//     icon: 'snowBig',
//   },
//   {
//     code: 28,
//     wea: '大雪-暴雪',
//     icon: 'snowBig',
//   },
//   {
//     code: 29,
//     wea: '浮沉',
//     icon: 'dust',
//   },
//   {
//     code: 30,
//     wea: '扬沙',
//     icon: 'sandstorm',
//   },
//   {
//     code: 31,
//     wea: '强沙尘暴',
//     icon: 'sandstorm',
//   },

//   {
//     code: 32,
//     wea: '飑',
//     icon: 'sandstorm',
//   },
//   {
//     code: 33,
//     wea: '龙卷风',
//     icon: 'sand',
//   },
//   {
//     code: 34,
//     wea: '若高吹雪',
//     icon: 'snowBig',
//   },
//   {
//     code: 35,
//     wea: '轻雾',
//     icon: 'fog',
//   },
//   {
//     code: 53,
//     wea: '霾',
//     icon: 'fog',
//   },
//   {
//     code: 99,
//     wea: '未知',
//     icon: 'sunny',
//   },
// ];

// let darkSkyWeatherType = {
//   'clear-day': 'sunny',
//   'clear-night': 'clearNight',
//   rain: 'smallRain',
//   snow: 'snowMid',
//   sleet: 'sleet',
//   wind: 'sand',
//   fog: 'fog',
//   cloudy: 'cloudy',
//   'partly-cloudy-day': 'lessCloudy',
//   'partly-cloudy-night': 'lessCloudyNight',
//   hail: 'snowBig',
//   thunderstorm: 'thunderstorm',
//   tornado: 'sand',
// };
const post = createLogic({
  type: 'CREATE_NEW_SEND_POST',
  latest: true,
  async process({ action, logic, httpClient, OSS, User }, dispatch, done) {
    try {
      const { images, content, weatherInfo, tag, date } = action.payload;
      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: true,
        }),
      );
      let imageUrls = [];

      for (let image of images) {
        // const filepath = image.path;
        // const imageType = image.mime.replace('image/', '');
        // let filename = User.username() + Date.now() + '.' + imageType;
        // filename = filename.trim().toLowerCase();
        const imageUrl = await OSS.upLoadImage(image);
        console.warn(imageUrl);
        imageUrls.push(imageUrl);
      }

      await httpClient.post('/create_post', {
        content: content,
        image_urls: imageUrls,
        user_id: 1,
        weather_info: JSON.stringify(weatherInfo),
        post_type: 'normal',
        tag: tag,
        happened_at: date,
      });
      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: false,
        }),
      );
      dispatch(logic('NAVIGATION_BACK'));
      dispatch(
        logic('SHOW_SNAKE_BAR', {
          content: '发布成功!',
          type: 'SUCCESS',
        }),
      );
    } catch (error) {
      console.warn(error);
      dispatch(
        logic('GLOBAL_SET_STATE', {
          isLoading: false,
        }),
      );
      dispatch(
        logic('SHOW_SNAKE_BAR', {
          content: '网络错误..!',
          type: 'ERROR',
        }),
      );
    } finally {
      done();
    }
  },
});

const getWeather = createLogic({
  type: 'CREATE_NEW_GET_WEATHER',
  latest: true,
  process: async ({ action, logic, Network }, dispatch, done) => {
    const { date } = action.payload;
    const isToady = Moment(date).isSame(Moment().format('YYYY-MM-DD'));
    const isFuture = Moment(date).isAfter(Moment().format('YYYY-MM-DD'));
    const isBefore1970 = Moment(date).isBefore('1970-01-01');
    const timestamp = Moment(date + 'T12:00:00+08:00').unix();
    if (isBefore1970) {
      dispatch(
        logic('SHOW_SNAKE_BAR', {
          type: 'ERROR',
          content: `It's tooooo old !!!`,
        }),
      );
      done();
      return;
    }
    if (isFuture) {
      dispatch(
        logic('SHOW_SNAKE_BAR', {
          type: 'ERROR',
          content: `Hmmmm.... it's impossible`,
        }),
      );
      done();
      return;
    }
    try {
      dispatch(
        logic('CREATE_NEW_SET_STATE', {
          isFetchingWeather: true,
        }),
      );
      const { data: ipInfo } = await Network.getIpInfo();
      let weatherInfo = {};

      if (isToady) {
        let { data: xiaomiWeather } = await Network.getWeatherInfoToday(
          ipInfo.lat,
          ipInfo.lon,
        );
        weatherInfo = {
          temperature: xiaomiWeather.current.temperature.value,
          weather: xiaomiWeatherinfo[xiaomiWeather.current.weather].icon,
          weatherCode: xiaomiWeather.current.weather,
        };
      } else {
        let { data: darkSkyWeather } = await Network.getWeatherInfoBefore(
          ipInfo.lat,
          ipInfo.lon,
          timestamp,
        );
        weatherInfo = {
          temperature: darkSkyWeather.currently.temperature.toFixed(0),
          weather: darkSkyWeatherType[darkSkyWeather.currently.icon],
          weatherCode: darkSkyWeather.currently.icon,
        };
      }

      dispatch(
        logic('CREATE_NEW_SET_STATE', {
          weatherInfo,
          isFetchingWeather: false,
        }),
      );
    } catch (error) {
      dispatch(
        logic('CREATE_NEW_SET_STATE', {
          isFetchingWeather: false,
        }),
      );
      console.warn(error);
    } finally {
      done();
    }
  },
});
export default [post, getWeather];

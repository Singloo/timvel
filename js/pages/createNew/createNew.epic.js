import { from, Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { exhaustMap, switchMap } from 'rxjs/operators';
import Moment from 'moment';
import { xiaomiWeatherinfo, darkSkyWeatherType } from './untils/weatherData';
const createPost = (action$, _, { dispatch, httpClient, OSS, User, navigation }) =>
  action$.pipe(
    ofType('CREATE_NEW_SEND_POST'),
    exhaustMap(({ payload }) =>
      Observable.create(async observer => {
        try {
          const { images, content, weatherInfo, tag, date } = payload;
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: true,
            }),
          );
          let imageUrls = [];
          for (let image of images) {
            if (image.type === 'unsplash') {
              imageUrls.push({ ...image });
            } else {
              const imageUrl = await OSS.upLoadImage(image);
              imageUrls.push({
                imageUrl,
                type: 'local',
                width: image.width,
                height: image.height,
                mime: image.mime,
                size: image.size,
                exif: image.exif,
              });
            }
          }
          await httpClient.post('/create_post', {
            content: content,
            image_urls: imageUrls,
            user_id: User.id(),
            weather_info: weatherInfo,
            post_type: 'normal',
            tag: tag,
            happened_at: date,
          });
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          navigation.back();
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              content: '发布成功!',
              type: 'SUCCESS',
            }),
          );
        } catch (error) {
          console.warn(error);
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              content: '网络错误..!',
              type: 'ERROR',
            }),
          );
        } finally {
          observer.complete();
        }
      }),
    ),
  );
const getWeather = (action$, _, { dispatch, Network }) =>
  action$.pipe(
    ofType('CREATE_NEW_GET_WEATHER'),
    switchMap(action =>
      Observable.create(async observer => {
        const { date } = action.payload;
        const isToady = Moment(date).isSame(Moment().format('YYYY-MM-DD'));
        const isFuture = Moment(date).isAfter(Moment().format('YYYY-MM-DD'));
        const isBefore1970 = Moment(date).isBefore('1970-01-01');
        const timestamp = Moment(date + 'T12:00:00+08:00').unix();
        if (isBefore1970) {
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              type: 'ERROR',
              content: `It's tooooo old !!!`,
            }),
          );
          observer.complete();
          return;
        }
        if (isFuture) {
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              type: 'ERROR',
              content: `Hmmmm.... it's impossible`,
            }),
          );
          observer.complete();
          return;
        }
        try {
          observer.next(
            dispatch('CREATE_NEW_SET_STATE', {
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

          observer.next(
            dispatch('CREATE_NEW_SET_STATE', {
              weatherInfo,
              isFetchingWeather: false,
            }),
          );
          observer.complete();
        } catch (error) {
          observer.next(
            dispatch('CREATE_NEW_SET_STATE', {
              isFetchingWeather: false,
            }),
          );
          console.warn(error);
          observer.complete();
        }
      }),
    ),
  );
export default [createPost, getWeather];

import { createLogic } from 'redux-logic';
import Moment from 'moment';
import { xiaomiWeatherinfo, darkSkyWeatherType } from './untils/weatherData';

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
export default [getWeather];

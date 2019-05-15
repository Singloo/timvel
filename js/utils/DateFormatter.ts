/*
 * File: /Users/origami/Desktop/timvel/js/utils/DateFormatter.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday March 23rd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Wednesday May 15th 2019 9:04:54 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import Moment from 'moment';
import 'moment/locale/zh-cn';
import * as RNLocalize from 'react-native-localize';
import { get } from 'lodash';
import I18n from './i18n/i18n';
const firstLocale = RNLocalize.getLocales()[0];
const languageCode =
  get(firstLocale, 'languageCode', 'en') === 'zh' ? 'zh' : 'en';
Moment.locale(languageCode);
const MONTH = 2628000;
const DAY = 86400;
const YEAR = 31536000;
export class DateFormatter {
  date: Moment.Moment;
  constructor(date: string) {
    if (!date) {
      throw 'Init failed, date needed';
    }
    this.date = Moment(date);
  }
  get isToday() {
    return Moment().format('YYYY-MM-DD') === this.date.format('YYYY-MM-DD');
  }
  get year() {
    return this.date.format('YYYY');
  }
  get mon() {
    return this.date.format('MMM');
  }
  get yearMonDay() {
    return this.date.format('YYYY MMM DD');
  }
  get month() {
    return this.date.format('MMMM');
  }

  get day() {
    return this.date.format('DD');
  }

  get hourMinSecond() {
    return this.date.format('hh:mm:ss');
  }

  get yearMonthDayTime() {
    if (this.isToday) {
      return 'Today ' + this.hourMinSecond;
    }
    return this.date.format('YYYY MMM DD h:mm:ss a');
  }

  fromNow(datePrecision: 'year' | 'month' | 'day' | string) {
    switch (datePrecision) {
      case 'year': {
        const now = Moment().year();
        const p = this.date.year();
        if (now === p) {
          return I18n.t('thisYear');
        }
        if (p < now) {
          return now - p + ' ' + I18n.t('yearAgo');
        }
        return p - now + ' ' + I18n.t('yearLater');
      }
      case 'month': {
        if (this.date.format('YYYY-MM') === Moment().format('YYYY-MM'))
          return I18n.t('thisMonth');
        const nowUnix = Moment().unix();
        const pUnix = this.date.unix();
        const diff = nowUnix - pUnix;
        if (diff > 0)
          return Math.round(diff / MONTH) + ' ' + I18n.t('monthAgo');
        if (diff < 0)
          return (
            Math.round(Math.abs(diff) / MONTH) + ' ' + I18n.t('monthLater')
          );
      }
      default: {
        if (this.isToday) return I18n.t('thisDay');
        const nowUnix = Moment().unix();
        const pUnix = this.date.unix();
        const diff = nowUnix - pUnix;
        if (diff > 0) {
          return Math.round(diff / DAY) + ' ' + I18n.t('dayAgo');
        }
        if (diff < 0) {
          return Math.round(Math.abs(diff) / DAY) + ' ' + I18n.t('dayLater');
        }
      }
    }
  }

  getHappenedAt = (datePrecision: 'year' | 'month' | 'day' | string) => {
    let str;
    switch (datePrecision) {
      case 'year':
        str = this.year;
        break;
      case 'month':
        str = this.year + ' ' + this.month;
        break;
      default:
        str = this.yearMonDay;
        break;
    }
    return str;
  };
}

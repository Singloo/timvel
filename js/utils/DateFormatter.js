/*
 * File: /Users/origami/Desktop/timvel/js/utils/DateFormatter.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday March 23rd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday March 23rd 2019 4:11:46 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import Moment from 'moment';
Moment.locale();
export class DateFormatter {
  constructor(date) {
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
    if (this.isToday()) {
      return 'Today ' + this.hourMinSecond();
    }
    return this.date.format('YYYY MMM DD h:mm:ss a');
  }

  get fromNow() {
    return Moment(this.date).fromNow();
  }

  getHappenedAt = datePrecision => {
    let str;
    switch (datePrecision) {
      case 'year':
        str = this.year;
        break;
      case 'month':
        str = this.month;
        break;
      default:
        str = this.yearMonDay;
        break;
    }
    return str;
  };
}

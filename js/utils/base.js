import * as React from 'react';
import { Platform, Dimensions, StyleSheet, Text } from 'react-native';
import _ from 'lodash';
import Moment from 'moment';
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  'window',
);
const getItemPosition = (n, r) => {
  let f = {
    x: -sinR(15, r),
    y: cosR(15, r),
  };
  let l = {
    x: cosR(15, r),
    y: -sinR(15, r),
  };
  const wide = 120;
  switch (n) {
    case 1:
      return [f];
    case 2:
      return [f, l];
    case 3: {
      let s = {
        x: sinR(60 - 15, r),
        y: cosR(60 - 15, r),
      };
      return [f, s, l];
    }
    case 4: {
      let ss = {
        x: sinR(40 - 15, r),
        y: cosR(40 - 15, r),
      };
      let tt = {
        x: sinR(40 * 2 - 15, r),
        y: cosR(40 * 2 - 15, r),
      };
      return [f, ss, tt, l];
    }
    default:
      break;
  }
};

const days31 = [1, 3, 5, 7, 8, 10, 12];
const days30 = [4, 6, 9, 11];

export const randomNumber = (n, m) => {
  const c = m - n + 1;
  return parseInt(Math.random() * c + n, 10);
};

export const getRandomDate = () => {
  let date = Moment();
  let year = 2018;
  if (Math.random() > 0.1) {
    year = randomNumber(1990, 2030);
  } else {
    year = randomNumber(1000, 2077);
  }
  let leepYear = false;
  if (year % 4 === 0) {
    leepYear = true;
  }

  const month = randomNumber(1, 12);
  date.year(year);
  date.month(month);
  if (days31.includes(month)) {
    const day = randomNumber(1, 31);
    date.date(day);

    return date.format('YYYY-MM-DD');
  } else if (days30.includes(month)) {
    const day = randomNumber(1, 30);
    date.date(day);
    return date.format('YYYY-MM-DD');
  }
  if (leepYear && month === 2) {
    const day = randomNumber(1, 29);
    date.date(day);
    return date.format('YYYY-MM-DD');
  } else if (month === 2) {
    const day = randomNumber(1, 28);
    date.date(day);
    return date.format('YYYY-MM-DD');
  } else {
    return getRandomDate();
  }
};

export class DateFormatter {
  constructor(date) {
    if (!date) {
      throw 'Init failed, date needed';
    }
    this.date = Moment(date);
  }
  isToday = () => {
    return Moment().format('YYYY-MM-DD') === this.date.format('YYYY-MM-DD');
  };
  year = () => {
    return this.date.format('YYYY');
  };
  mon = () => {
    return this.date.format('MMM');
  };
  month = () => {
    return this.date.format('MMMM');
  };

  day = () => {
    return this.date.format('DD');
  };

  hourMinSecond = () => {
    return this.date.format('hh:mm:ss');
  };

  yearMonthDayTime = () => {
    if (this.isToday()) {
      return 'Today ' + this.hourMinSecond();
    }
    return this.date.format('YYYY MMM DD h:mm:ss a');
  };

  fromNow = () => {
    return Moment(this.date).fromNow();
  };
}

export const filterPostsByTag = posts => {
  let returnObj = {};

  posts.forEach(item => {
    if (typeof returnObj[item.tag] === 'undefined') {
      returnObj[item.tag] = [];
    }
    returnObj[item.tag].push(item);
  });
  return returnObj;
};

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
const toDegrees = angle => {
  return angle * (Math.PI / 180);
};
export function cosR(degree, r) {
  let de = toDegrees(degree);
  return Math.cos(de) * r;
}
export function sinR(degree, r) {
  let de = toDegrees(degree);
  return Math.sin(de) * r;
}
export function realSize(px) {
  return (px * SCREEN_WIDTH) / 375;
}

export const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

//if arr is object, just support return 1 item
export function randomItem(arr = [], returnLength = 1, returnArray = []) {
  let returnNum = returnLength || 1;
  let returnArr = returnArray || [];
  let i = Math.floor(Math.random() * arr.length);
  // let item;
  // if (Array.isArray(arr)) {
  let item = arr[i];
  // }
  // if (typeof arr === 'object') {
  //   const keys = Object.keys(arr);
  //   item = item[keys[i]];
  // }
  if (typeof item === 'undefined') {
    return returnArr;
  } else {
    returnArr.push(item);
  }
  if (returnArr.length === returnNum) {
    if (returnNum === 1) {
      return returnArr[0];
    } else {
      return returnArr;
    }
  } else {
    // if (Array.isArray(arr)) {
    let newArr = _.difference(arr, returnArr);
    return randomItem(newArr, returnNum, returnArr);
    // }
    // if (Object.isObject(arr)) {
    //   const keys = Object.keys(arr);
    //   item = item[keys[i]];
    // }
  }
}

export function lenOfText(text) {
  let len = 0;
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 127 || text.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}

export const Styles = {
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: isIOS
    ? {
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
          height: 4,
          width: 3,
        },
        backgroundColor: 'white',
      }
    : { elevation: 1, backgroundColor: 'white' },
  textShadow: {
    textShadowColor: '#f5f5f5',
    textShadowOffset: {
      width: 1.5,
      height: 0,
    },
    textShadowRadius: 5,
  },
};

export const isIphoneX =
  isIOS &&
  ((SCREEN_HEIGHT === 812 && SCREEN_WIDTH === 375) ||
    (SCREEN_HEIGHT === 375 && SCREEN_WIDTH === 812));

export const colors = {
  main: '#1de9b6',
  mainLight: '#a7ffeb',
  mainDep: '#004d40',
  red: '#ff8a80',
  redDep: '#b71c1c',
  redLight: '#ffcdd2',
  green: '#8bc34a',
  greenDep: '#558b2f',
  greenLight: '#dcedc8',
  amber: '#ffc107',
  white: '#fafafa',
  pureWhite: 'white',
  pureBlack: '#212121',
  backgroundGrey: '#f7f7f7',
  lightGrey: '#f5f5f5',
  midGrey: '#9e9e9e',
  depGrey: '#616161',
  transparent: 'transparent',
  pink: '#ec407a',
  purple: '#ab47bc',
  lightBlue: '#29b6f6',
  cyan: '#26c6da',
  teal: '#26a69a',
  lightGreen: '#9ccc65',
  lime: '#d4e157',
  yellow: '#ffee58',
  orange: '#ffa726',
  deepOrange: '#ff7043',
  blueGrey: '#78909c',
  grey: '#bdbdbd',
};
export const colorSets = [
  colors.pink,
  colors.purple,
  colors.lightBlue,
  colors.cyan,
  colors.teal,
  colors.lightGreen,
  colors.lime,
  colors.yellow,
  colors.orange,
  colors.deepOrange,
  colors.blueGrey,
  colors.amber,
  colors.grey,
];

export const PADDING_TOP = isIOS ? (isIphoneX ? 44 : 20) : 0;
export const PADDING_BOTTOM = isIphoneX ? 34 : 0;
export const NAV_BAR_HEIGHT = isIOS ? (isIphoneX ? 44 + 44 : 20 + 44) : 44;
export const TAB_BAR_HEIGHT = isIphoneX ? 34 + 48 : 48;
export function renderTitle(title, customStyle) {
  const renderText = style => {
    return <Text style={[styles.qing, style]}>{title}</Text>;
  };

  var style = {};
  switch (title) {
    case '青': {
      style = {
        color: '#00ffff',
        borderColor: '#00ffff',
      };
      break;
    }

    case '神': {
      style = {
        borderColor: '#ffc400',
        color: '#ffc400',
      };
      break;
    }

    case '侠': {
      style = {
        color: '#00b0ff',
        borderColor: '#00b0ff',
      };
      break;
    }

    case '魅': {
      style = {
        color: '#ec407a',
        borderColor: '#ec407a',
      };
      break;
    }

    case '萌': {
      style = {
        color: '#f484b1',
        borderColor: '#f484b1',
      };
      break;
    }

    case '邪': {
      style = {
        color: '#d500f9',
        borderColor: '#d500f9',
      };
      break;
    }

    case '魔': {
      style = {
        color: '#311b92',
        borderColor: '#311b92',
      };
      break;
    }

    case '妖': {
      style = {
        color: '#7cb342',
        borderColor: '#7cb342',
      };
      break;
    }

    case '绫': {
      style = {
        color: '#4dd0e1',
        borderColor: '#4dd0e1',
      };
      break;
    }

    case '鱼唇': {
      style = {
        color: '#ff7043',
        borderColor: '#ffc400',
      };
      break;
    }

    default:
      if (customStyle) {
        return renderText(customStyle);
      } else {
        return null;
      }
  }

  return renderText(style);
}

const styles = StyleSheet.create({
  qing: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: realSize(2),
    fontSize: realSize(12),
    borderWidth: realSize(1),
    marginHorizontal: realSize(4),
  },
});

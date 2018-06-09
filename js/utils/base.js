import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text } from 'react-native';
import _ from 'lodash';
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
    case 3:
      let s = {
        x: sinR(60 - 15, r),
        y: cosR(60 - 15, r),
      };
      return [f, s, l];
    case 4:
      let ss = {
        x: sinR(40 - 15, r),
        y: cosR(40 - 15, r),
      };
      let tt = {
        x: sinR(40 * 2 - 15, r),
        y: cosR(40 * 2 - 15, r),
      };
      return [f, ss, tt, l];
    default:
      break;
  }
};

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
const toDegrees = angle => {
  return angle * (Math.PI / 180);
};
export function cosR(degree, r) {
  let de = toDegrees(degree);
  return Math.cos(de);
}
export function sinR(degree, r) {
  let de = toDegrees(degree);
  return Math.sin(de);
}
export function realSize(px) {
  return px * SCREEN_WIDTH / 375;
}

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function randomItem(arr, returnLength, returnArray) {
  let returnNum = returnLength || 1;
  let returnArr = returnArray || [];
  let i = Math.floor(Math.random() * arr.length);
  let item = arr[i];
  if (typeof item === 'undefined') {
    return returnArr;
  } else {
    returnArr.push(arr[i]);
  }
  if (returnArr.length === returnNum) {
    if (returnNum === 1) {
      return returnArr[0];
    } else {
      return returnArr;
    }
  } else {
    let newArr = _.difference(arr, returnArr);
    randomItem(newArr, returnNum, returnArr);
  }
}

export const Styles = {
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  transparent: {
    backgroundColor: 'transparent',
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
      }
    : { elevation: 1 },
};

export const isIphoneX =
  isIOS &&
  ((SCREEN_HEIGHT === 812 && SCREEN_WIDTH === 375) ||
    (SCREEN_HEIGHT === 375 && SCREEN_WIDTH === 812));

export const colors = {
  main: '#00e5ff',
  red: '#ff8a80',
  white: '#fafafa',
  lightGrey: '#f5f5f5',
  midGrey: '#9e9e9e',
  depGrey: '#616161',
};

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

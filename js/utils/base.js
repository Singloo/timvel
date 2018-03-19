import React, { Component } from 'react';
import { Platform, Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  'window',
);

export const isIOS = Platform.OS === 'ios';

export function realSize(px) {
  return px * SCREEN_WIDTH / 375;
}

export function randomItem(arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

export const shadow = isIOS
  ? {
      shadowOpacity: 0.4,
      shadowRadius: 4,
      shadowOffset: {
        height: 3,
        width: 2,
      },
    }
  : { elevation: 4 };

export const colors = {
  main: '#00e5ff',
  red: '#ff8a80',
  white: '#fafafa',
  lightGrey: '#f5f5f5',
  midGrey: '#9e9e9e',
  depGrey: '#616161',
};

import { Platform, Dimensions, LayoutChangeEvent } from 'react-native';
import Moment from 'moment';
import { get, difference } from 'lodash';
import { IPost, TDict, ILocalImage } from '../models';
Moment.locale();
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  'window',
);

const days31 = [1, 3, 5, 7, 8, 10, 12];
const days30 = [4, 6, 9, 11];

export const randomNumber = (n: number, m: number) => {
  const c = m - n + 1;
  return Math.round(Math.random() * c + n);
};

export const getRandomDate = (): string => {
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
export const getLayoutAttributes = (event: LayoutChangeEvent) => {
  const { nativeEvent } = event;
  const { layout } = nativeEvent;
  return {
    width: layout.width,
    height: layout.height,
    x: layout.x,
    y: layout.y,
  };
};
export const filterPostsByTag = (posts: IPost[]) => {
  let returnObj: { [tag: string]: IPost[] } = {};

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
const toDegree = (angle: number) => {
  return angle * (Math.PI / 180);
};
export function cosR(degree: number, r: number) {
  let de = toDegree(degree);
  return Math.cos(de) * r;
}
export function sinR(degree: number, r: number) {
  let de = toDegree(degree);
  return Math.sin(de) * r;
}
export function realSize(px: number) {
  return (px * SCREEN_WIDTH) / 375;
}

export const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

export function randomItem(
  arr = [],
  returnLength = 1,
  returnArray = [],
): any | any[] {
  let returnNum = returnLength || 1;
  let returnArr = returnArray || [];
  let i = Math.floor(Math.random() * arr.length);
  let item = arr[i];
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
    let newArr = difference(arr, returnArr);
    return randomItem(newArr, returnNum, returnArr);
  }
}

export function lenOfText(text: string) {
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
export const extractUserFromPost = (post: IPost) => ({
  userId: post.userId,
  avatar: post.avatar,
  username: post.username,
});

export const generateUnsplashImageObj = (data: any) => ({
  imageUrl: get(data, 'urls.regular', ''),
  rawUrl: get(data, 'urls.raw', ''),
  description: get(data, 'description', ''),
  color: get(data, 'color'),
  // exif: get(data, 'exif'),
  width: get(data, 'width', 0),
  height: get(data, 'height', 0),
  likes: get(data, 'likes', 0),
  user: get(data, 'user', null),
  id: get(data, 'id', null),
  type: 'unsplash',
});
export const generateLocalImageObj = (
  image: ILocalImage,
  imageUrl: string,
): ILocalImage => ({
  imageUrl,
  type: 'local',
  width: image.width,
  height: image.height,
  mime: image.mime,
  size: image.size,
  // exif: image.exif,
});

const postPrecisionPriority = (post: IPost) => {
  switch (get(post, 'precision', 'day')) {
    case 'day':
      return 2;
    case 'month':
      return 1;
    case 'year':
      return 0;
    default:
      return 0;
  }
};
export const sortPosts = (posts: IPost[]) => {
  return posts.sort((a, b) => {
    return (
      Moment(b.happenedAt).unix() +
      postPrecisionPriority(b) -
      (Moment(a.happenedAt).unix() + postPrecisionPriority(a))
    );
  });
};

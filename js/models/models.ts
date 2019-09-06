/*
 * File: /Users/origami/Desktop/timvel/js/models/models.ts
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Sunday March 24th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday April 11th 2019 8:58:16 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
export interface IAction {
  type: string;
  payload: object;
}

export type TDict = { [key: string]: any };
export type TNotificationType = 'comment' | string;
export interface INotification {
  senderUserId: string;
  receiverUserId: string;
  postId: number;
  commentId: number;
  content: string;
  associatedCommentId: number | null;
  type: TNotificationType;
}
export interface ILocalImage {
  type: 'local';
  size: number;
  mime: string;
  width: number;
  imageUrl: string;
  height: number;
}
export interface IUnsplashImage {
  id: string;
  type: 'unsplash';
  color: 'string';
  width: number;
  height: number;
  rawUrl: string;
  imageUrl: string;
}
export interface IWeatherInfo {
  weather: string;
  temperature: number | string;
  weatherCode: number | string;
}
export type TPostPrecision = 'year' | 'month' | 'day';

interface IPostPropsInClient {
  cardType: CardType;
  tintColor: string;
}
export interface IPost extends IPostPropsInClient {
  postId: number;
  content: string;
  imageUrls: (ILocalImage | IUnsplashImage)[];
  tag: string;
  createdAt: string;
  happenedAt: string;
  weatherInfo: IWeatherInfo;
  postType: string;
  tagId: number;
  userId: string;
  username: string;
  avatar: string;
  angry: number;
  laugh: number;
  nofeeling: number;
  shock: number;
  vomit: number;
  popularity: number;
  numOfComments: number;
  precision: TPostPrecision;
}

export enum CardType {
  MULTIPLE_IMAGES_LESS_TEXT = 1,
  MORE_TEXT_WITHOUT_IMAGE = 2,
  IMAGE_WIDTH_MEDIUM_TEXT = 3,
}

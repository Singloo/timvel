/*
 * File: /Users/origami/Desktop/timvel/js/models/models.ts
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Sunday March 24th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Wednesday April 10th 2019 10:40:25 am
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

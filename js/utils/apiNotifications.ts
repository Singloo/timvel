/*
 * File: /Users/origami/Desktop/timvel/js/utils/InsertNotifications.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Wednesday March 6th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Wednesday April 10th 2019 10:40:33 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { apiClient } from './Network';
import { retry3, HANDLE } from './$helper';
import { clearTimers } from './helper';
import { INotification } from '../models';
class ApiNotifications {
  notificationIdsToRead: number[] = [];
  readNotificationTimer?: NodeJS.Timeout;
  insertCommentNotification = ({
    senderUserId,
    receiverUserId,
    postId,
    commentId,
    content,
    type = 'comment',
    associatedCommentId = null,
  }: INotification) => {
    return apiClient.post('/notification', {
      sender_user_id: senderUserId,
      receiver_user_id: receiverUserId,
      post_id: postId,
      comment_id: commentId,
      content,
      type,
      associated_comment_id: associatedCommentId,
    });
  };
  readNotification = (...notificationIds: number[]) => {
    this.notificationIdsToRead.push(...notificationIds);
    this._schedule();
  };

  _schedule = () => {
    this._clearTimer();
    this.readNotificationTimer = setTimeout(this._readNotifications, 3000);
  };

  _readNotifications = () => {
    retry3(
      apiClient.put('/notification/read', {
        notification_ids: this.notificationIdsToRead,
      }),
    ).subscribe(
      HANDLE(() => {
        this.notificationIdsToRead = [];
        this._clearTimer();
      }),
    );
  };

  _clearTimer = () => {
    if (typeof this.readNotificationTimer === 'number') {
      clearTimers(this.readNotificationTimer);
      this.readNotificationTimer = undefined;
    }
  };
  getNotification = (user_id: number, type: string) => {
    return apiClient.get('/notification', {
      params: {
        user_id,
        type,
      },
    });
  };
}

export default new ApiNotifications();

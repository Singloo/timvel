/*
 * File: /Users/origami/Desktop/timvel/js/utils/InsertNotifications.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Wednesday March 6th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday March 12th 2019 7:30:54 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { apiClient } from './Network';
import { retry3, HANDLE } from './$helper';
import { clearTimers } from './helper';
class ApiNotifications {
  notificationIdsToRead = [];
  readNotificationTimer;
  insertCommentNotification = ({
    sender_user_id,
    receiver_user_id,
    post_id,
    comment_id,
    content,
    associated_comment_id = null,
  }) => {
    return apiClient.post('/notification', {
      sender_user_id,
      receiver_user_id,
      post_id,
      comment_id,
      content,
      type: 'comment',
      associated_comment_id,
    });
  };
  readNotification = (...notificationIds) => {
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
        this._readNotifications = [];
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
  getNotification = (user_id, type) => {
    return apiClient.get('/notification', {
      params: {
        user_id,
        type,
      },
    });
  };
}

export default new ApiNotifications();

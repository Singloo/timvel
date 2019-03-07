/*
 * File: /Users/origami/Desktop/timvel/js/utils/InsertNotifications.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Wednesday March 6th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday March 7th 2019 10:26:13 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { apiClient } from './Network';
import {} from './$helper';

class ApiNotifications {
  insertCommentNotification = ({
    sender_user_id,
    user_id,
    post_id,
    comment_id = null,
    content,
  }) => {
    return apiClient.post('/notification', {
      sender_user_id,
      user_id,
      post_id,
      comment_id,
      content,
      type:'comment'
    });
  };

  _readNotifications = notification_ids => {
    return apiClient.put('/notification/read', {
      notification_ids,
    });
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

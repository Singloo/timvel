/*
 * File: /Users/origami/Desktop/timvel/js/utils/InsertNotifications.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Wednesday March 6th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday March 11th 2019 9:40:13 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { apiClient } from './Network';
import {} from './$helper';

class ApiNotifications {
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

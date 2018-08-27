import { createLogic } from 'redux-logic';
import _ from 'lodash';
const pressEmoji = createLogic({
  type: 'HOME_PAGE_PRESS_EMOJI',
  latest: false,
  async process({ httpClient, action, logic, getState }, dispatch, done) {
    try {
      const { emoji, postId, enablePostEmoji } = action.payload;
      let { posts } = getState().homePage;
      posts.forEach(item => {
        if (item.postId === postId) {
          item[emoji] = item[emoji] + 1;
        }
      });
      if (enablePostEmoji === false) {
        done();
        return;
      }
      dispatch(
        logic('HOME_PAGE_SET_STATE', {
          enablePostEmoji: false,
        }),
      );
      const data = await httpClient.post('/post_emojis', {
        emoji,
        post_id: postId,
      });
      // await new Promise((resolve, reject) => {
      //   setTimeout(resolve, 500);
      // });
      dispatch(
        logic('HOME_PAGE_SET_STATE', {
          enablePostEmoji: true,
        }),
      );
      console.warn('success');
    } catch (error) {
      console.warn(error);
      dispatch(
        logic('HOME_PAGE_SET_STATE', {
          enablePostEmoji: true,
        }),
      );
    } finally {
      done();
    }
  },
});

const fetchPosts = createLogic({
  type: 'HOME_PAGE_FETCH_POSTS',
  latest: true,
  process: async ({ httpClient, logic, action }, dispatch, done) => {
    try {
      const { happenedAt, offset } = action.payload;
      const { data } = await httpClient.get('/fetch_posts', {
        happened_at: happenedAt,
        offset,
      });
      dispatch(
        logic('HOME_PAGE_SET_STATE', {
          posts: data,
        }),
      );
    } catch (error) {
      console.warn(error);
    } finally {
      done();
    }
  },
});

export default [pressEmoji, fetchPosts];

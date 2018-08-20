import { createLogic } from 'redux-logic';

const pressEmoji = createLogic({
  type: 'HOME_PAGE_PRESS_EMOJI',
  latest: false,
  async process({ httpClient, action, logic, getState }, dispatch, done) {
    try {
      const { emoji, postId, enablePostEmoji } = action.payload;

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

export default [pressEmoji];

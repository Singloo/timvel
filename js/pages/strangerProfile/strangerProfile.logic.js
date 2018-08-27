import { createLogic } from 'redux-logic';
import { base } from '../../utils';
const { filterPostsByTag } = base;
const fetchUserPosts = createLogic({
  type: 'STRANGER_PROFILE_FETCH_POSTS',
  latest: true,
  process: async ({ httpClient, action, logic, User }, dispatch, done) => {
    try {
      const { userId } = action.payload;
      const { data } = await httpClient.get('/fetch_post_with_condition', {
        params: { user_id: userId },
      });
      const postsByTag = filterPostsByTag(data);
      const user = await User.getUserByObjectId('5a005c211579a3004584970b');
      let userInfo = {
        username: user.get('username'),
        avatar: user.get('avatar'),
        userCoin: user.get('userCoin'),
      };
      dispatch(
        logic('STRANGER_PROFILE_SET_STATE', {
          postsByTag,
          userInfo,
        }),
      );
    } catch (error) {
      console.warn(error);
    } finally {
      done();
    }
  },
});
export default [fetchUserPosts];

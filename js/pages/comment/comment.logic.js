// import { createLogic } from 'redux-logic';
// import Moment from 'moment';
// const sendComment = createLogic({
//   type: 'COMMENT_COMMENT_POST',
//   latest: true,
//   process: async (
//     { action, logic, httpClient, User, getState },
//     dispatch,
//     done,
//   ) => {
//     try {
//       const { postId, content, callback } = action.payload;
//       const { comments } = getState().comment;
//       await httpClient.post('/post_comment', {
//         post_id: postId,
//         user_id: User.id(),
//         content,
//       });
//       let comment = {
//         userId: User.id(),
//         username: User.username(),
//         avatar: User.avatar(),
//         content: content,
//         createdAt: Moment().format(),
//       };
//       callback && callback();
//       dispatch(
//         logic('COMMENT_SET_STATE', {
//           comments: [].concat(comments, comment),
//         }),
//       );
//       dispatch(
//         logic('SHOW_SNAKE_BAR', {
//           type: 'SUCCESS',
//           content: 'Comment successful',
//         }),
//       );
//     } catch (error) {
//       console.warn(error);
//       dispatch(
//         logic('SHOW_SNAKE_BAR', {
//           type: 'ERROR',
//           content: 'Network error, try again',
//         }),
//       );
//     } finally {
//       done();
//     }
//   },
// });

// const fetchComments = createLogic({
//   type: 'COMMENT_FETCH_COMMENTS',
//   latest: true,
//   process: async ({ getState, logic, httpClient, action }, dispatch, done) => {
//     try {
//       const { postId, offset } = action.payload;
//       const { data } = await httpClient.get('/fetch_post_comments', {
//         params: {
//           post_id: postId,
//           offset: offset,
//         },
//       });
//       dispatch(
//         logic('COMMENT_SET_STATE', {
//           comments: data,
//         }),
//       );
//     } catch (error) {
//       console.warn(error);
//     } finally {
//       done();
//     }
//   },
// });

// export default [sendComment, fetchComments];

import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { base } from '../../utils';
const { filterPostsByTag } = base;
const fetchUserPosts = (action$, state$, { User, httpClient, logic }) =>
  action$.pipe(
    ofType('USER_PAGE_FETCH_USER_POSTS'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          const userId = User.id();
          if (userId === null) {
            observer.complete();
            return;
          }
          const { data } = await httpClient.get('/fetch_post_with_condition', {
            params: { user_id: userId },
          });
          const postsByTag = filterPostsByTag(data);
          observer.next(
            logic('USER_SET_STATE', {
              userPosts: postsByTag,
            }),
          );
        } catch (error) {
          console.warn(error.message);
        } finally {
          observer.complete();
        }
      }),
    ),
  );

// const getUserInfo = (action$, state$, { User, logic }) =>
//   action$.pipe(
//     ofType('USER_PAGE_GET_USER_INFO'),
//     mergeMap(action =>
//       Observable.create(async observer => {
//         try {
//           if (!User.isLoggedIn()) {
//             observer.complete();
//             return;
//           }
//           const userInfo = User.getUserInfo();
//           observer.next(
//             logic('USER_SET_STATE', {
//               userInfo,
//               isLoggedIn: true,
//             }),
//           );
//         } catch (error) {
//           console.warn(error.message);
//         } finally {
//           observer.complete();
//         }
//       }),
//     ),
//   );

export default [fetchUserPosts];

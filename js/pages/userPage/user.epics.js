import { ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import { mergeMap, switchMap, tap, map, catchError } from 'rxjs/operators';
import { filterPostsByTag, Cache } from '../../utils';
const fetchUserPosts = (action$, state$, { User, httpClient, dispatch }) =>
  action$.pipe(
    ofType('USER_PAGE_FETCH_USER_POSTS'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          const userId = User.objectId;
          if (userId === null) {
            observer.complete();
            return;
          }
          const cahced = await Cache.get(
            Cache.USER_POSTS_CACHE_KEYS(User.objectId),
          );
          if (cahced) {
            const postsByTag = filterPostsByTag(cahced);
            observer.next(
              dispatch('USER_SET_STATE', {
                userPosts: postsByTag,
              }),
            );
          }
          const { data } = await httpClient.get('/post/condition', {
            params: { user_id: userId },
          });
          const postsByTag = filterPostsByTag(data);
          observer.next(
            dispatch('USER_SET_STATE', {
              userPosts: postsByTag,
            }),
          );
          Cache.set(Cache.USER_POSTS_CACHE_KEYS(User.objectId), data)
            .then(() => {})
            .catch(() => {});
        } catch (error) {
          console.warn(error.message);
        } finally {
          observer.complete();
        }
      }),
    ),
  );
const fetchUserTitles = (action$, state$, { httpClient, User, dispatch }) =>
  action$.pipe(
    ofType('USER_PAGE_FETCH_USER_TITLES'),
    switchMap(({ payload }) =>
      from(
        httpClient.get('/title', {
          params: {
            user_id: User.objectId,
            just_wearing: true,
          },
        }),
      ).pipe(
        map(({ data }) => data),
        map(userTitles =>
          dispatch('USER_SET_STATE', {
            userTitles,
          }),
        ),
        catchError(err => {
          console.warn(err.message);
          return of({ type: null });
        }),
      ),
    ),
  );
// const getUserInfo = (action$, state$, { User, dispatch }) =>
//   action$.pipe(
//     ofType('USER_PAGE_GET_USER_INFO'),
//     mergeMap(action =>
//       Observable.create(async observer => {
//         try {
//           if (!User.isLoggedIn) {
//             observer.complete();
//             return;
//           }
//           const userInfo = User.getUserInfo();
//           observer.next(
//             dispatch('USER_SET_STATE', {
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

export default [fetchUserPosts, fetchUserTitles];

import { ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import { mergeMap, switchMap, tap, map, catchError } from 'rxjs/operators';
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
const fetchUserTitles = (action$, state$, { httpClient, User }) =>
  action$.pipe(
    ofType('USER_PAGE_FETCH_USER_TITLES'),
    switchMap(({ payload }) =>
      from(
        httpClient.get('/get_user_titles', {
          params: {
            user_id: User.id(),
            just_wearing: true,
          },
        }),
      ).pipe(
        map(({ data }) => data),
        tap(data => {
          console.warn(data);
        }),
        map(_ => ({ type: null })),
        catchError(err => {
          console.warn(err.message);
          return of({ type: null });
        }),
      ),
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

export default [fetchUserPosts, fetchUserTitles];

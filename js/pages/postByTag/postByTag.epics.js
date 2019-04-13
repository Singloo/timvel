/*
 * File: /Users/origami/Desktop/timvel/js/pages/postsByTag/template.epics.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Monday April 8th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday April 13th 2019 11:34:19 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { ofType } from 'redux-observable';
import { Observable, pipe, from, of, merge } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';
import { retry3, $retryDelay, sortPosts, Cache } from '../../utils';
const fetchPostsByTag = (action$, state$, { httpClient, dispatch }) =>
  action$.pipe(
    ofType('POST_BY_TAG_FETCH_POSTS_BY_TAG'),
    switchMap(({ payload }) => {
      const arr = [];
      arr.push(
        from(Cache.get(Cache.POSTS_BY_TAG_KEYS(payload.tagId))).pipe(
          map(data =>
            !!data
              ? dispatch('POST_BY_TAG_SET_STATE', { data })
              : dispatch('POST_BY_TAG_SET_STATE', { isLoading: true }),
          ),
        ),
      );
      arr.push(
        from(
          httpClient.get('/post/condition', {
            params: {
              tag_id: payload.tagId,
            },
          }),
        ).pipe(
          map(({ data }) => sortPosts(data)),
          tap(data =>
            Cache.set(Cache.POSTS_BY_TAG_KEYS(payload.tagId), data)
              .then(() => {})
              .catch(() => {}),
          ),
          map(data =>
            dispatch('POST_BY_TAG_SET_STATE', { data, isLoading: false }),
          ),
          $retryDelay(300, 3),
          catchError(err => {
            console.warn(err.message);
            return of(
              dispatch('SHOW_SNAKE_BAR', {
                type: 'ERROR',
                content: 'Encountered some problems... check your network',
              }),
            );
          }),
        ),
      );
      return merge(...arr);
    }),
  );
export default [fetchPostsByTag];

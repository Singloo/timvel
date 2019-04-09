/*
 * File: /Users/origami/Desktop/timvel/js/pages/postsByTag/template.epics.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Monday April 8th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday April 9th 2019 8:44:21 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { ofType } from 'redux-observable';
import { Observable, pipe, from, of } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';
import { retry3, $retryDelay, sortPosts } from '../../utils';
const fetchPostsByTag = (action$, state$, { httpClient, dispatch }) =>
  action$.pipe(
    ofType('POST_BY_TAG_FETCH_POSTS_BY_TAG'),
    switchMap(({ payload }) => {
      return from(
        httpClient.get('/post/condition', {
          params: {
            tag_id: payload.tagId,
          },
        }),
      ).pipe(
        map(({ data }) => sortPosts(data)),
        map(data => dispatch('POST_BY_TAG_SET_STATE', { data })),
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
      );
    }),
  );
export default [fetchPostsByTag];

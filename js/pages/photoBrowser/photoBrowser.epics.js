/*
 * File: /Users/origami/Desktop/timvel/js/pages/photoBrowser/template.epics.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday April 18th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday April 18th 2019 10:18:34 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { ofType } from 'redux-observable';
import { Observable, pipe, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
const show = (action$, _, { dispatch }) =>
  action$.pipe(
    ofType('PHOTO_BROWSER_SHOW'),
    switchMap(action => {
      const { images, onCancel, index = 0 } = action.payload;
      const imageUrls = images.map(source => {
        if (typeof source === 'string') {
          return {
            url: source,
            props: {
              uri: source,
              url: source,
            },
          };
        }
        return {
          props: {
            source,
          },
        };
      });

      return of(
        dispatch('PHOTO_BROWSER_SET_STATE', {
          imageUrls,
          onCancel,
          index,
          show: true,
        }),
      );
    }),
  );
export default [show];

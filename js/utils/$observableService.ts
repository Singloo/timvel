/*
 * File: /Users/origami/Desktop/timvel/js/utils/$observableService.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Sunday March 24th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday April 11th 2019 8:32:59 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { $UPLOAD_IMAGES } from './$observable';
import { filter, concatMap, map, mergeMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { upLoadImage } from './OSS';
import { get } from 'lodash';
import { $retryDelay } from './$helper';
const subscribeUploadImages = () =>
  $UPLOAD_IMAGES.pipe(
    filter(image => !!get(image, 'path', null) && !!get(image, 'mime', null)),
    mergeMap(image =>
      from(upLoadImage(image.path)).pipe(
        map(imageUrl => ({ image, imageUrl })),
      ),
    ),
    $retryDelay(100, 5),
    catchError(err => {
      console.warn('auto upload err', err);
      return of(null);
    }),
    filter(x => x !== null),
  );
export { subscribeUploadImages };

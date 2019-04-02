import { ofType } from 'redux-observable';
import { Observable, from, of, merge, throwError } from 'rxjs';
import {
  mergeMap,
  map,
  switchMap,
  exhaustMap,
  startWith,
  retryWhen,
  concatMap,
  delay,
  catchError,
  tap,
  mergeAll,
  mapTo,
} from 'rxjs/operators';
import { Cache } from '../../utils';
const changeAvatar = (action$, state$, { User, dispatch }) =>
  action$.pipe(
    ofType('SHOP_PAGE_CHANGE_AVATAR'),
    exhaustMap(action =>
      Observable.create(async observer => {
        try {
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: true,
            }),
          );
          const { imageUrl } = action.payload;
          await User.updateAvatar(imageUrl);
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              content: 'Avatar updated!',
              type: 'SUCCESS',
            }),
          );
        } catch (error) {
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              content: 'Network error',
              type: 'ERROR',
            }),
          );
          console.warn(error);
        } finally {
          observer.complete();
        }
      }),
    ),
  );

const saveImageToAlbum = (action$, state$, { Network, dispatch }) =>
  action$.pipe(
    ofType('SHOP_PAGE_SAVE_IMAGE_TO_ALBUM'),
    switchMap(action =>
      from(Network.saveImageToAlbum(action.payload.imageUrl)).pipe(
        map(_ =>
          dispatch('SHOW_SNAKE_BAR', {
            content: 'Avatar updated!',
            type: 'SUCCESS',
          }),
        ),
        catchError(error =>
          of(
            dispatch('SHOW_SNAKE_BAR', {
              content: 'Avatar updated!',
              type: 'ERROR',
            }),
          ),
        ),
      ),
    ),
  );

const fetchProducts = (
  action$,
  state$,
  { httpClient, dispatch, $retryDelay },
) =>
  action$.pipe(
    ofType('SHOP_PAGE_FETCH_PRODUCTS'),
    switchMap(_ =>
      from(Cache.get(Cache.CACHE_KEYS.PRODUCTS)).pipe(
        switchMap(cached => {
          const next = [];
          if (cached) {
            next.push(
              of(
                dispatch('SHOP_PAGE_SET_STATE', {
                  products: cached,
                  isError: false,
                }),
              ),
            );
          } else {
            next.push(
              of(
                dispatch('SHOP_PAGE_SET_STATE', {
                  isLoading: true,
                  isError: false,
                }),
              ),
            );
          }
          next.push(
            from(httpClient.get('/product')).pipe(
              tap(({ data }) => {
                Cache.set(Cache.CACHE_KEYS.PRODUCTS, data)
                  .then(() => {})
                  .catch(() => {});
              }),
              map(({ data }) =>
                dispatch('SHOP_PAGE_SET_STATE', {
                  products: data,
                  isLoading: false,
                }),
              ),
              $retryDelay(500, 3),
            ),
          );
          return next;
        }),
        mergeAll(),
        catchError(error => {
          console.warn(error);
          return of(
            dispatch('SHOP_PAGE_SET_STATE', {
              isError: true,
              isLoading: false,
            }),
          );
        }),
      ),
    ),
  );
export default [changeAvatar, saveImageToAlbum, fetchProducts];

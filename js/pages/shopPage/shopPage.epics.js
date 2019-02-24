import { ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
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
} from 'rxjs/operators';
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

const saveImageToAlbum = (action$, state$, { Network }) =>
  action$.pipe(
    ofType('SHOP_PAGE_SAVE_IMAGE_TO_ALBUM'),
    switchMap(action =>
      Observable.create(async observer => {
        try {
          const { imageUrl } = action.payload;
          await Network.saveImageToAlbum(imageUrl);
        } catch (error) {
          console.warn(error.message);
        } finally {
          observer.complete();
        }
      }),
    ),
  );

const fetchProducts = (
  action$,
  state$,
  { httpClient, dispatch, $retryWhenDelay },
) =>
  action$.pipe(
    ofType('SHOP_PAGE_FETCH_PRODUCTS'),
    switchMap(action =>
      from(httpClient.get('/fetch_products')).pipe(
        tap(({ data }) => {
          console.warn('products data: ', data.length);
        }),
        map(({ data }) => ({
          type: 'SHOP_PAGE_SET_STATE',
          payload: {
            products: data,
            isLoading: false,
          },
        })),
        startWith({
          type: 'SHOP_PAGE_SET_STATE',
          payload: {
            isLoading: true,
            isError: false,
          },
        }),
        $retryWhenDelay(1000, 3),
        catchError(error =>
          of({
            type: 'SHOP_PAGE_SET_STATE',
            payload: { isError: true, isLoading: false },
          }),
        ),
      ),
    ),
  );
export default [changeAvatar, saveImageToAlbum, fetchProducts];

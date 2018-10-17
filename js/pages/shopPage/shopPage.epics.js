import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
const changeAvatar = (action$, state$, { User, logic }) =>
  action$.pipe(
    ofType('SHOP_PAGE_CHANGE_AVATAR'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          observer.next(
            logic('GLOBAL_SET_STATE', {
              isLoading: true,
            }),
          );
          const { imageUrl } = action.payload;
          await User.updateAvatar(imageUrl);
          observer.next(
            logic('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(
            logic('SHOW_SNAKE_BAR', {
              content: 'Avatar updated!',
              type: 'SUCCESS',
            }),
          );
        } catch (error) {
          observer.next(
            logic('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(
            logic('SHOW_SNAKE_BAR', {
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
    mergeMap(action =>
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

const fetchProducts = (action$, state$, { httpClient, logic }) =>
  action$.pipe(
    ofType('SHOP_PAGE_FETCH_PRODUCTS'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          const { data } = await httpClient.get('/fetch_products');
          observer.next(
            logic('SHOP_PAGE_SET_STATE', {
              products: data,
            }),
          );
        } catch (error) {
          console.warn(error);
        } finally {
          observer.complete();
        }
      }),
    ),
  );
export default [changeAvatar, saveImageToAlbum, fetchProducts];

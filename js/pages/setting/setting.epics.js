/*
 * File: /Users/origami/Desktop/timvel/js/pages/setting/template.epics.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday April 27th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday April 28th 2019 6:58:00 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { retry3, I18n } from '../../utils';
const checkNewVersion = (action$, _, { httpClient, dispatch }) =>
  action$.pipe(
    ofType('SETTING_CHECK_NEW_VERSION'),
    switchMap(({ payload }) =>
      retry3(httpClient.get('/universal/check_new_version')).pipe(
        map(({ data }) => data),
        switchMap(data => {
          const { hasNew, link, message } = data;
          const { onConfirmDownload, onNoNewVersion, onCancel } = payload;
          if (!hasNew) {
            onNoNewVersion && onNoNewVersion();
            return of(dispatch(null));
          }
          return of(
            dispatch('SHOW_SNAKE_BAR', {
              content: I18n.t('foundNewVersion'),
              type: 'SUCCESS',
            }),
            dispatch('SHOW_ALERT', {
              title: I18n.t('foundNewVersion'),
              content: message,
              choices: [
                {
                  title: I18n.t('download'),
                  onPress: () => onConfirmDownload && onConfirmDownload(link),
                },
              ],
              onCancel,
            }),
          );
        }),
        catchError(err => of(dispatch(null))),
      ),
    ),
  );
export default [checkNewVersion];

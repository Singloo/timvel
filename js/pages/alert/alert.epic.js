import { ofType } from 'redux-observable';
import {} from 'rxjs';
import { map } from 'rxjs/operators';
import { I18n, User, Network } from '../../utils';
const showAlert = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofType('SHOW_ALERT'),
    map(action => {
      const { show } = state$.value.alert;

      if (show) {
        return dispatch(null);
      }
      const {
        choices,
        cancelTitle,
        type,
        onCancel,
        content,
        vertical = false,
      } = action.payload;
      return dispatch('ALERT_SET_STATE', {
        show: true,
        choices,
        cancelTitle: cancelTitle || I18n.t('cancel'),
        content,
        type: type || 'NORMAL',
        onCancel,
        vertical,
      });
    }),
  );

const report = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofType('ALERT_REPORT'),
    map(action => {
      const { childId, type, callback } = action.payload;
      let choices = [
        {
          title: I18n.t('reportPornographic'),
          onPress: () => {
            Network.report(
              childId,
              type,
              I18n.t('reportPornographic'),
              User.objectId,
            );
            callback && callback();
          },
        },
        {
          title: I18n.t('reportPersonalAbuse'),
          onPress: () => {
            Network.report(
              childId,
              type,
              I18n.t('reportPersonalAbuse'),
              User.objectId,
            );
            callback && callback();
          },
        },
        {
          title: I18n.t('reportAds'),
          onPress: () => {
            Network.report(childId, type, I18n.t('reportAds'), User.objectId);
            callback && callback();
          },
        },
        {
          title: I18n.t('reportBlockUser'),
          onPress: () => {
            Network.report(
              childId,
              type,
              I18n.t('reportBlockUser'),
              User.objectId,
            );
            callback && callback();
          },
        },
        {
          title: I18n.t('reportOthers'),
          onPress: () => {
            Network.report(
              childId,
              type,
              I18n.t('reportOthers'),
              User.objectId,
            );
            callback && callback();
          },
        },
      ];
      if (type === 'user')
        choices = [
          {
            title: I18n.t('reportBlockUser'),
            onPress: () => {
              Network.report(
                childId,
                type,
                I18n.t('reportBlockUser'),
                User.objectId,
              );
              callback && callback();
            },
          },
        ];
      return dispatch('ALERT_SET_STATE', {
        show: true,
        choices,
        cancelTitle: I18n.t('cancel'),
        content: I18n.t('reportTitle'),
        type: 'NORMAL',
        vertical: true,
      });
    }),
  );
export default [showAlert, report];

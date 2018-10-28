import { createLogic } from 'redux-logic';

const showAlert = createLogic({
  type: 'SHOW_ALERT',
  latest: true,
  process: ({ getState, logic, action }, dispatch, done) => {
    const { show } = getState().alert;
    const { choices, cancelTitle, type, onCancel, content } = action.payload;
    if (show) {
      done();
      return;
    }
    //choices [{title,onPress,color}]
    dispatch(
      logic('ALERT_SET_STATE', {
        show: true,
        choices,
        cancelTitle,
        content,
        type: type || 'NORMAL',
        onCancel,
      }),
    );
    done();
  },
});
export default [showAlert];

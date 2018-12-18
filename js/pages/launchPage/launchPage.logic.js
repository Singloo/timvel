import { createLogic } from 'redux-logic';

const waitTime = 300 * 1.5;
const initApp = createLogic({
  type: 'INIT_APP',
  latest: true,
  async process({ logic, navigation }, dispatch, done) {
    try {
      dispatch(logic('UPDATE_USERINFO'));
      await new Promise((resolve, reject) => {
        setTimeout(resolve, waitTime);
      });
      dispatch(
        logic('NAVIGATION_RESET', {
          routeName: 'Main',
        }),
      );
    } catch (error) {
      console.warn(error);
    } finally {
      done();
    }
  },
});
export default [initApp];

import { createLogic } from 'redux-logic';

const waitTime = 3000 * 1.5;
const initApp = createLogic({
  type: 'INIT_APP',
  latest: true,
  async process({ logic, navigation }, dispatch, done) {
    try {
      dispatch(logic('USER_GET_USER_STATUS'));
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
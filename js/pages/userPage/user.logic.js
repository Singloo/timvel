import { createLogic } from 'redux-logic';

const getUserStatus = createLogic({
  type: 'USER_GET_USER_STATUS',
  latest: true,
  async process({ action, logic, User }, dispatch, done) {
    try {
      if (!User.isLoggedIn()) {
        return;
      }

      const userInfo = User.getUserInfo();
      dispatch(
        logic('USER_SET_STATE', {
          userInfo,
        }),
      );
    } catch (error) {
      console.warn(error);
    } finally {
      done();
    }
  },
});
export default [getUserStatus];

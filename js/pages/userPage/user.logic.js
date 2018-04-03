import { createLogic } from 'redux-logic';

const getUserStatus = createLogic({
  type: 'USER_GET_USER_STATUS',
  latest: true,
  async process({ action, logic, User }, dispatch, done) {
    try {
      const isLoggedIn = await User.isLoggedIn();
      if (isLoggedIn) {
        dispatch(
          logic('USER_SET_STATE', {
            isLoggedIn: true,
          }),
        );
      } else {
        return;
      }

      const userInfo = await User.getUserInfo();
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

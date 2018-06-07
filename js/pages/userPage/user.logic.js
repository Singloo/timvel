import { createLogic } from 'redux-logic';

const getUserStatus = createLogic({
  type: 'USER_GET_USER_STATUS',
  latest: true,
  async process({ action, logic, User }, dispatch, done) {
    try {
      const user = await User.currentAsync();
      if (user == null) {
        done();
        return;
      }
      const userInfo = User.getUserInfo();
      dispatch(
        logic('USER_SET_STATE', {
          userInfo,
          isLoggedIn: true,
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

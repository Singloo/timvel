import { createLogic } from 'redux-logic';

const initApp = createLogic({
  type: 'INIT_APP',
  latest: true,
  async process({ action, logic, User }, dispatch, done) {
    try {
      User.init();
      const user = await User.logIn({
        username: '绫波丽',
        password: 'q1w2e3r4',
      });
    } catch (error) {
      console.warn(error);
    } finally {
      done();
    }
  },
});

export default [initApp];

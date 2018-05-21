import { createLogic } from 'redux-logic';

const initApp = createLogic({
  type: 'INIT_APP',
  latest: true,
  async process({ action, logic, User, httpClient }, dispatch, done) {
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

const testAPi = createLogic({
  type: 'TEST',
  latest: true,
  async process({ httpClient }, dispatch, done) {
    try {
      const data = await httpClient('/get_info', {
        params: {
          a: 'a',
        },
      });
      console.warn(data);
    } catch (error) {
      console.warn(error);
    } finally {
      done();
    }
  },
});

export default [initApp,testAPi];

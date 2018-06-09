import { createLogic } from 'redux-logic';


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

export default [testAPi];

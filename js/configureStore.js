import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logics from './logics';
import { createLogicMiddleware } from 'redux-logic';
import { User } from './utils';
const deps = {
  logic: function(type, payload) {
    return {
      type,
      payload: payload || {},
    };
  },
  User,
};

export default function configureStore() {
  const logicMiddleware = createLogicMiddleware(logics, deps);
  const middleware = applyMiddleware(logicMiddleware);
  const store = createStore(reducers, middleware);
  return store;
}

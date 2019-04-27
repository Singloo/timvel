import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import epics from './epics';
import {
  User,
  I18n,
  Network,
  OSS,
  Navigation,
  apiClient as httpClient,
} from './utils';
import { createEpicMiddleware } from 'redux-observable';
// import logger from 'redux-logger';
import { $retryDelay } from './utils/$helper';
const dispatch = (type, payload) => ({
  type,
  payload: payload || {},
});
const snakeBar = (content, type = 'NORMAL') =>
  dispatch('SHOW_SNAKE_BAR', { content, type });
const loading = (isLoading = true) =>
  dispatch('GLOBAL_SET_STATE', {
    isLoading: isLoading,
  });
const deps = {
  dispatch,
  snakeBar,
  loading,
  User,
  httpClient,
  I18n,
  Network,
  OSS,
  $retryDelay,
  navigation: Navigation,
};
const configureStore = () => {
  // const logicMiddleware = createLogicMiddleware(logics, deps);
  const expicMiddleware = createEpicMiddleware({
    dependencies: deps,
  });
  const middleware = applyMiddleware(expicMiddleware);
  const store = createStore(reducers, middleware);
  expicMiddleware.run(epics);
  return store;
};
export default configureStore;

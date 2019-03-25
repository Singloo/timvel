import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import epics from './epics';
import { User, I18n, Network, OSS, Navigation } from './utils';
import { createEpicMiddleware } from 'redux-observable';
// import logger from 'redux-logger';
import { $retryDelay, $checkIfLoggedIn } from './utils/$helper';
const httpClient = Network.apiClient;
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
  $checkIfLoggedIn,
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

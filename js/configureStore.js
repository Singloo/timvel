import { createStore, applyMiddleware } from 'redux';
import { Platform } from 'react-native';
import reducers from './reducers';
import epics from './epics';
import { User, I18n, Network, OSS, Navigation } from './utils';
import Axios from 'axios';
import { API_V1 } from './constants';
import { createEpicMiddleware } from 'redux-observable';
// import logger from 'redux-logger';
import { $retryWhenDelay } from './utils/$helper';
const httpClient = Axios.create({
  baseURL: API_V1,
  timeout: 20000,
  headers: {
    platfrom: Platform.OS,
  },
});
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
  $retryWhenDelay,
  navigation: Navigation,
};

export default function configureStore() {
  // const logicMiddleware = createLogicMiddleware(logics, deps);
  const expicMiddleware = createEpicMiddleware({
    dependencies: deps,
  });
  const middleware = applyMiddleware(expicMiddleware);
  const store = createStore(reducers, middleware);
  expicMiddleware.run(epics);
  return store;
}

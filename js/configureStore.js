import { createStore, applyMiddleware } from 'redux';
import { Platform } from 'react-native';
import reducers from './reducers';
import logics from './logics';
import epics from './epics';
import { createLogicMiddleware } from 'redux-logic';
import { User, I18n, Network, OSS } from './utils';
import Axios from 'axios';
import { API_V1 } from './constants';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { of, throwError } from 'rxjs';
const httpClient = Axios.create({
  baseURL: API_V1,
  timeout: 20000,
  headers: {
    platfrom: Platform.OS,
  },
});
const logic = (type, payload) => ({
  type,
  payload: payload || {},
});
const dispatch = (type, payload) => ({
  type,
  payload: payload || {},
});
const snakeBar = (content, type = 'NORMAL') =>
  logic('SHOW_SNAKE_BAR', { content, type });
const loading = (isLoading = true) =>
  logic('GLOBAL_SET_STATE', {
    isLoading: isLoading,
  });
const retryTimes = (times = 3) => (error, index) =>
  index === times ? throwError(error) : of(null);
const deps = {
  dispatch,
  logic,
  snakeBar,
  loading,
  User,
  httpClient,
  I18n,
  Network,
  OSS,
  retryTimes,
  navigation: null,
};
export const setNavigation = navigation => {
  deps.navigation = navigation;
};

export default function configureStore() {
  const logicMiddleware = createLogicMiddleware(logics, deps);
  const expicMiddleware = createEpicMiddleware({
    dependencies: deps,
  });
  const middleware = applyMiddleware(expicMiddleware, logicMiddleware, logger);
  const store = createStore(reducers, middleware);
  expicMiddleware.run(epics);
  return store;
}

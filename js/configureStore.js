import { createStore, applyMiddleware } from 'redux';
import { Platform } from 'react-native';
import reducers from './reducers';
import logics from './logics';
import epics from './epics';
import { createLogicMiddleware } from 'redux-logic';
import { User, I18n, Actions, Network, OSS } from './utils';
import Axios from 'axios';
import { API_V1 } from './constants';
import { createEpicMiddleware } from 'redux-observable';
const httpClient = Axios.create({
  baseURL: API_V1,
  timeout: 20000,
  headers: {
    platfrom: Platform.OS,
  },
});
const deps = {
  logic: function(type, payload) {
    return {
      type,
      payload: payload || {},
    };
  },
  User,
  httpClient,
  I18n,
  Actions,
  Network,
  OSS,
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
  const middleware = applyMiddleware(expicMiddleware, logicMiddleware);
  const store = createStore(reducers, middleware);
  expicMiddleware.run(epics);
  return store;
}

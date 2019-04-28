import * as ReactRedux from 'react-redux';
import { BackHandler, ToastAndroid } from 'react-native';
import Navigation from './Navigation';
import { NavigationContainer } from 'react-navigation';
import { get } from 'lodash';
import { isIOS } from './base';
const dispatch = (type: string, payload: any) => ({
  type,
  payload,
});
const snakeBar = (content: string, type = 'NORMAL') =>
  dispatch('SHOW_SNAKE_BAR', { content, type });
const loading = (isLoading = true) =>
  dispatch('GLOBAL_SET_STATE', {
    isLoading: isLoading,
  });
export const connect = function({
  name,
  stateMapper,
  actions = {},
  container,
  withRef = false,
}: {
  name: string;
  stateMapper: any;
  actions: any;
  container: any;
  withRef: boolean;
}) {
  if (!name) {
    throw new Error('connect name is required');
  }
  if (!stateMapper) {
    stateMapper = function(state: any) {
      return {
        state: state[name],
        global: state.global,
      };
    };
  }
  const allActions = {
    ...actions,
    dispatch,
    snakeBar,
    loading,
  };
  return ReactRedux.connect(stateMapper, allActions, null, {
    withRef: withRef,
  })(container);
};

export const connect2 = (
  name: string,
  {
    stateMapper,
    actions = {},
    withRef = false,
  }: { stateMapper?: any; actions?: any; withRef?: boolean } = {},
) => {
  if (!name) {
    throw new Error('connect name is required');
  }
  if (!stateMapper) {
    stateMapper = (state: any) => ({
      state: state[name],
      global: state.global,
    });
  }
  const allActions = {
    ...actions,
    dispatch,
    snakeBar,
    loading,
  };
  return (container: any) =>
    ReactRedux.connect(stateMapper, allActions, null, { withRef: withRef })(
      container,
    );
};
const getProp = (store: any, path: string) => {
  if (!store) {
    return null;
  }
  if (typeof store.getState !== 'function') {
    return null;
  }
  return get(store.getState(), path, null);
};
class handleBack {
  navigation?: NavigationContainer;
  handlers: { [routeName: string]: () => void } = {};
  lastPressTime: number = Date.now();
  preventDoublePress: number = Date.now();
  init = (navigation: NavigationContainer, store: any) => {
    this.navigation = navigation;
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress(store));
  };
  addHandler = (routeName: string, handler: () => void) => {
    if (isIOS) {
      return;
    }
    Object.assign(this.handlers, { [routeName]: handler });
  };
  _getRoutes = () => {
    if (!this.navigation) {
      return null;
    }
    if (!this.navigation!.state) {
      return null;
    }
    if (!this.navigation!.state.nav) {
      return null;
    }
    return this.navigation.state.nav.routes;
  };
  _onBackPress = (store: any) => () => {
    if (Date.now() - this.preventDoublePress < 400) {
      this.preventDoublePress = Date.now();
      return true;
    }
    this.preventDoublePress = Date.now();
    const routes = this._getRoutes();
    if (!routes) {
      return false;
    }
    if (getProp(store, 'photoBrowser.show')) {
      store.dispatch({
        type: 'PHOTO_BROWSER_SET_STATE',
        payload: {
          show: false,
        },
      });
      return true;
    }
    if (routes.length === 1) {
      const route = routes[0];
      const currentRouteName = get(
        route.routes,
        `[${route.index}].routeName`,
        null,
      );
      const handler = this.handlers[currentRouteName];
      if (typeof handler === 'function') {
        handler();
        return true;
      }
      if (Date.now() - this.lastPressTime < 1000) {
        BackHandler.exitApp();
        return true;
      }
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      this.lastPressTime = Date.now();
      return true;
    }
    if (routes.length > 1) {
      const currentRouteName = get(
        routes,
        `[${routes.length - 1}].routeName`,
        null,
      );
      const handler = this.handlers[currentRouteName];
      if (typeof handler === 'function') {
        handler();
        return true;
      }
      Navigation.back();
      return true;
    }
    if (Date.now() - this.lastPressTime < 1000) {
      BackHandler.exitApp();
      return true;
    }
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
    this.lastPressTime = Date.now();
    return true;
  };
}

export const HandleBack = new handleBack();

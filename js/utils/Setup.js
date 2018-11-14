import * as ReactRedux from 'react-redux';
import { BackHandler, ToastAndroid } from 'react-native';
const logic = (type, payload) => ({
  type,
  payload,
});
const snakeBar = (content, type = 'NORMAL') =>
  logic('SHOW_SNAKE_BAR', { content, type });
const loading = (isLoading = true) =>
  logic('GLOBAL_SET_STATE', {
    isLoading: isLoading,
  });
export const connect = function({
  name,
  stateMapper,
  actions = {},
  container,
  withRef = false,
}) {
  if (!name) {
    throw new Error('connect name is required');
  }
  if (!stateMapper) {
    stateMapper = function(state) {
      return {
        state: state[name],
        global: state.global,
      };
    };
  }
  const allActions = {
    ...actions,
    logic,
    snakeBar,
    loading,
  };
  return ReactRedux.connect(stateMapper, allActions, null, {
    withRef: withRef,
  })(container);
};

export const connect2 = (
  name,
  { stateMapper, actions = {}, withRef = false },
) => {
  if (!name) {
    throw new Error('connect name is required');
  }
  if (!stateMapper) {
    stateMapper = state => ({
      state: state[name],
      global: state.global,
    });
  }
  const allActions = {
    ...actions,
    logic,
    snakeBar,
    loading,
  };
  return container =>
    ReactRedux.connect(stateMapper, allActions, null, { withRef: withRef })(
      container,
    );
};
// other setup

/**
 *  Handle android back button press.
 *  Close the app if the the user taps back button two times.
 */
let justClickBackButton = false;
export const androidBackButton = function(navigation, store) {
  BackHandler.addEventListener('hardwareBackPress', () => {
    // sometimes crashes
    // null is not an object (evaluating 'n._navigation.state')
    // solution: add a 500ms sleep
    const navState = navigation.state.nav;
    const { isLoading } = store.getState().global;
    if (isLoading) {
      return true;
    }
    if (navState.index !== 0) {
      const currentRouteName =
        navState.routes[navState.routes.length - 1].routeName;
      // if (
      //   currentRouteName === 'editSubtitles' ||
      //   currentRouteName === 'recorderPreview'
      // ) {
      //   return true;
      // }

      store.dispatch({
        type: 'NAVIGATION_BACK',
        payload: {
          navigation,
        },
      });
      return true;
    }
    if (justClickBackButton) {
      BackHandler.exitApp();
      return true;
    }
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
    justClickBackButton = true;
    setTimeout(() => {
      justClickBackButton = false;
    }, 1000);

    return true;
  });
};

/**
 *  If the user taps a button very quickly, sometimes it can open two of the same route.
 *  This function prvents two pages to be opened.
 */
let justNavigated = false;
let timeout;
export const preventDoublePress = function(Navigator) {
  const prevGetStateForActionHomeStack = Navigator.router.getStateForAction;
  Navigator.router.getStateForAction = (action, state) => {
    if (
      state &&
      (action.type === 'ReplaceCurrentScreen' || action.type === 'Replace')
    ) {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }

    // if (state && action.type === 'PopTwice') {
    //   const routes = state.routes.slice(0, state.routes.length - 2);
    //   return {
    //     ...state,
    //     routes,
    //     index: routes.length - 1,
    //   };
    // }

    if (
      action.routeName &&
      ['Search', 'Welcome', 'Main'].indexOf(action.routeName) === -1
    ) {
      // if (action.routeName !== 'Search' && action.routeName !== 'Study' && action.routeName !== 'Welcome'){
      if (justNavigated) {
        return state;
      }

      justNavigated = true;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        justNavigated = false;
      }, 700);
    }

    return prevGetStateForActionHomeStack(action, state);
  };
};

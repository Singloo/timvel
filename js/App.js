import * as React from 'react';
import { Text, View, StyleSheet, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import configureStore, { setNavigation } from './configureStore';
import SimpleApp from './Navigators';
import { Setup, base } from './utils';
import * as Connectors from './connectors';
const store = configureStore();
Setup.preventDoublePress(SimpleApp);
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class App extends React.Component {
  async componentDidMount() {
    // try to prevent crash n._navigation.state
    if (base.isIOS) {
      return;
    }
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 500);
    });
    Setup.androidBackButton(this._navigation, store);
  }
  async componentWillUnmount() {
    await store.dispatch('UPDATE_USERINFO');
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <SimpleApp
            ref={navigation => {
              this._navigation = navigation;
              setNavigation(navigation);
            }}
          />
          <Connectors.global />
          <Connectors.alert />
          <Connectors.snakeBar />
        </View>
      </Provider>
    );
  }
}

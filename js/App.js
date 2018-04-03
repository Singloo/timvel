import React, { Component } from 'react';
import { Text, View, StyleSheet, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import SimpleApp from './Navigators';
import { Setup, base } from './utils';
import { SafeAreaView } from 'react-navigation';
const store = configureStore();

Setup.preventDoublePress(SimpleApp);
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class App extends Component {
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

  render() {
    return (
      <Provider store={store}>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <SimpleApp
          ref={navigation => {
            this._navigation = navigation;
          }}
        />
        {/* </SafeAreaView> */}
      </Provider>
    );
  }
}

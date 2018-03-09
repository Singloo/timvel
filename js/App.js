import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import SimpleApp from './Navigators'
const store = configureStore()

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <SimpleApp
          ref={navigation => {
            this._navigation = navigation;
          }}
        />
      </Provider>
    );
  }
}


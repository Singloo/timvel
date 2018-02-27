/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux'

import { Button}  from './components'

import HomePage from './pages/homePage/homePage.container'
import store from './pages/homePage/homePage.reducer'
 
export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <HomePage/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

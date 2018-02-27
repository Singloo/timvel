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
import { Button}  from '../../components'
import {base} from '../../utils'
import store from './homePage.reducer'


class HomePage extends Component {

  componentWillMount(){
    store.subscribe(()=>{
      this.forceUpdate()
    })
    console.warn(store.getState())
  }

  _add = ()=>{
    store.dispatch({
      type:'ADD',
    })
    console.warn(store.getState())
  }

  _minus = ()=>{
    store.dispatch({
      type:'MINUS'
    })
    console.warn(store.getState())
  }

  _addCustom = ()=>{
    store.dispatch({
      type:'ADD_CUSTOM',
      num:10
    })
    console.warn(store.getState())
  }

  render() {
    const {count}=store.getState().counter
    return (
      <View style={styles.container}>
        <Text>{count}</Text>
        <Button
          onPress={this._add}
          title={'touch'}
        />
      </View>
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

export default HomePage
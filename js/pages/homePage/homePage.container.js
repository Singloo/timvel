import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button } from '../../components'
import { base } from '../../utils'
// import store from './homePage.reducer'


class HomePage extends Component {

  componentWillMount() {
    // store.subscribe(()=>{
    //   this.forceUpdate()
    // })
  }

  _add = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      count: 1
    })
  }

  _minus = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      count: 1
    })
  }

  _addCustom = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      count: 1
    })
  }

  render() {
    const { count } = this.props.state

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
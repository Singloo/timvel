import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, NavBar, Image, InfiniteText } from '../../../re-kits'
import { base } from '../../utils'

class ShopPage extends Component {
  static navigationOptions = {
    drawerLockMode:'locked-closed'
  }

  componentWillMount() {
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{'welcome'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default ShopPage
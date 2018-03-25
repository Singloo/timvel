import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  Button,
  NavBar,
  Icon,
  InfiniteText,
  Text,
} from '../../../re-kits/components';
import { base } from '../../utils';

class Remember extends Component {
  componentWillMount() {}

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
    justifyContent: 'center',
  },
});

export default Remember;

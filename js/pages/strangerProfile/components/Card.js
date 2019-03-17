import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '../../../../re-kits';
import { base,I18n } from '../../../utils';

class Card extends Component {
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
  },
});

export default Card;

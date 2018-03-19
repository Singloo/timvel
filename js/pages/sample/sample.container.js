import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { base } from '../../utils';

class Sample extends Component {
  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>{'welcome'}</Text>
      </View>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;

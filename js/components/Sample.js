import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../utils';
class Sample extends Component {
  render() {
    const {} = this.props;
    return (
      <View>
        <Text style={styles.wrapper}>{'This is a sample component'}</Text>
      </View>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;

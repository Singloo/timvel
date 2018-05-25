import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';

class CardWithoutImg extends Component {
  componentWillMount() {}

  render() {
    return <View style={styles.container} />;
  }
}
CardWithoutImg.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CardWithoutImg;

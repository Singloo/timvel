/*
 * File: /Users/origami/Desktop/timvel/js/pages/createNew/components/DatePrecision.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday March 21st 2019 10:50:12 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '../../../../re-kits';
import { I18n } from '../../../utils';
import PropTypes from 'prop-types';

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
Card.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Card;

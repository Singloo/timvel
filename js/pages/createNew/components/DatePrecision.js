/*
 * File: /Users/origami/Desktop/timvel/js/pages/createNew/components/DatePrecision.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Friday March 22nd 2019 10:21:01 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '../../../../re-kits';
import { I18n, DateFormatter, colors } from '../../../utils';
import PropTypes from 'prop-types';
const BORDER_RADIUS = 8;
class Card extends Component {
  componentWillMount() {}

  render() {
    const { datePrecision, date } = this.props;
    const formatter = new DateFormatter(date);
    return (
      <View style={styles.container}>
        <Button
          title={formatter.year()}
          size={'small'}
          buttonStyle={[
            styles.button,
            {
              borderTopLeftRadius: BORDER_RADIUS,
              borderBottomLeftRadius: BORDER_RADIUS,
            },
          ]}
        />
        <Button
          title={formatter.mon()}
          size={'small'}
          type={datePrecision !== 'year' ? 'main' : 'mainBlank'}
          buttonStyle={[
            styles.button,
            {
              borderLeftWidth: 0.5,
              borderRightWidth: 0.5,
              borderColor: colors.white,
            },
          ]}
        />
        <Button
          title={formatter.day()}
          size={'small'}
          type={datePrecision === 'day' ? 'main' : 'mainBlank'}
          buttonStyle={[
            styles.button,
            {
              borderTopRightRadius: BORDER_RADIUS,
              borderBottomRightRadius: BORDER_RADIUS,
            },
          ]}
        />
      </View>
    );
  }
}
Card.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 45,
    height: 30,
  },
});

export default Card;

/*
 * File: /Users/origami/Desktop/timvel/js/pages/createNew/components/DatePrecision.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday March 23rd 2019 10:40:37 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '../../../../re-kits';
import { I18n, DateFormatter, colors } from '../../../utils';
const BORDER_RADIUS = 8;
class Card extends Component {
  componentWillMount() {}

  render() {
    const { datePrecision, date, onPress } = this.props;
    const formatter = new DateFormatter(date);
    return (
      <View style={styles.container}>
        {this._renderButton({
          title: formatter.year(),
          onPress: onPress('year'),
          buttonStyle: {
            borderTopLeftRadius: BORDER_RADIUS,
            borderBottomLeftRadius: BORDER_RADIUS,
          },
        })}
        {this._renderButton({
          title: formatter.mon(),
          type: datePrecision !== 'year' ? 'main' : 'mainBlank',
          onPress: onPress('month'),
          buttonStyle: {
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            borderColor:
              datePrecision === 'year' ? colors.mainLight : colors.white,
          },
        })}
        {this._renderButton({
          title: formatter.day(),
          type: datePrecision === 'day' ? 'main' : 'mainBlank',
          onPress: onPress('day'),
          buttonStyle: {
            borderTopRightRadius: BORDER_RADIUS,
            borderBottomRightRadius: BORDER_RADIUS,
          },
        })}
      </View>
    );
  }

  _renderButton = ({ title, type, onPress, buttonStyle }) => {
    return (
      <Button
        title={title}
        size={'small'}
        onPress={onPress}
        type={type}
        textStyle={{ fontWeight: 'bold' }}
        buttonStyle={[styles.button, buttonStyle]}
        touchableProps={{ hitSlop: undefined }}
      />
    );
  };
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

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, createAnimatedModal } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { colors } = base;
class Card extends Component {
  componentWillMount() {}
  componentDidMount() {
  }
  render() {
    const { dismiss } = this.props;
    return (
      <View style={styles.giftContainer}>
        <Button title={'button1'} onPress={dismiss} />
        <Button title={'button2'} onPress={dismiss} />
      </View>
    );
  }
}
Card.propTypes = {};

const styles = StyleSheet.create({
  giftContainer: {
    flexDirection: 'row',
  },
});

export default createAnimatedModal(Card);

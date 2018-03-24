import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button ,Icon} from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';

class CardWithoutImg extends Component {
  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
       
      </View>
    );
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

import React, { Component } from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Image, Text } from '../../../../re-kits';
import {} from '../../../utils';
import PropTypes from 'prop-types';

class Tab extends Component {
  componentWillMount() {}

  render() {
    const { onPress, source, tintColor, title, size, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Image
          source={source}
          tintColor={tintColor}
          size={size}
          onPress={onPress}
          resizeMode={'contain'}
        />
        {title && (
          <Text style={[styles.title, { color: tintColor }]}>{title}</Text>
        )}
      </View>
    );
  }
}
Tab.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  title: {
    fontSize: 12,
    fontWeight: '100',
    letterSpacing: 1,
    marginTop: 2,
  },
});

export default Tab;

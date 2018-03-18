import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../utils';
class Button extends Component {
  render() {
    const { onPress, title } = this.props;
    return (
      <TouchableOpacity onPress={onPress && onPress}>
        <View style={[styles.wrapper]}>
          <Text style={{ color: base.colors.white }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
Button.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: base.realSize(20),
    paddingVertical: base.realSize(10),
    backgroundColor: base.colors.main,
    borderRadius: base.realSize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;

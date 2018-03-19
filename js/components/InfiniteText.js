import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../utils';
class Sample extends Component {
  render() {
    const { text, textStyle, children, style, containerStyle } = this.props;
    return (
      <ScrollView
        style={[styles.wrapper, style]}
        contentContainerStyle={[styles.container, containerStyle]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {children}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </ScrollView>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    paddingRight: 40,
  },
  text: {
    fontSize: 17,
    color: base.colors.depGrey,
  },
});

export default Sample;

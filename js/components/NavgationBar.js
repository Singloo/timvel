import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../utils';
import Icon from './Icon';
class NavigationBar extends Component {
  _renderLeft = () => {
    const { uriLeft, leftTint, onPressLeft } = this.props;
    if (uriLeft) {
      return (
        <Icon
          uri={uriLeft}
          tintColor={leftTint}
          onPress={() => {
            onPressLeft && onPressLeft();
          }}
        />
      );
    } else {
      return <View style={styles.blank} />;
    }
  };
  _renderRight = () => {
    const { uriRight, rightTint, onPressRight } = this.props;
    if (uriRight) {
      return (
        <Icon
          uri={uriRight}
          tintColor={rightTint}
          onPress={() => {
            onPressRight && onPressRight();
          }}
        />
      );
    } else {
      return <View style={styles.blank} />;
    }
  };

  _renderTitle = () => {
    const { title, titleStyle } = this.props;
    if (title) {
      return <Text style={[styles.title, titleStyle,]}>{title}</Text>;
    } else {
      return <View style={[styles.blank, { flex: 1 }]} />;
    }
  };
  render() {
    const {} = this.props;
    return (
      <View style={styles.wrapper}>
        {this._renderLeft.call(this)}
        {this._renderTitle.call(this)}
        {this._renderRight.call(this)}
      </View>
    );
  }
}
NavigationBar.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    height: base.isIOS ? 64 : 44,
    width: base.SCREEN_WIDTH,
    paddingTop: base.isIOS ? 20 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    // justifyContent: 'space-between',
    backgroundColor: base.colors.lightGrey,
  },
  blank: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
  },
  title: {
    flex: 1,
    fontSize: 17,
    textAlign: 'center',
    color: base.colors.depGrey,
    letterSpacing: 1,
    fontWeight: '100',
  },
});

export default NavigationBar;

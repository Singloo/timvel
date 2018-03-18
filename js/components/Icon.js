import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../utils';
class Icon extends Component {
  _iconSize = size => {
    switch (size) {
      case 'micro':
        return base.realSize(12);
      case 'verySmall':
        return base.realSize(16);
      case 'small':
        return base.realSize(24);
      case 'regular':
        return base.realSize(32);
      case 'large':
        return base.realSize(48);
      case 'veryLarge':
        return base.realSize(56);
      default:
        return base.realSize(size);
    }
  };
  render() {
    const {
      onPress,
      uri,
      size,
      resizeMode,
      tintColor,
      style,
      isRound,
    } = this.props;
    const iconSize = this._iconSize(size);
    return (
      <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
        <View
          style={[
            styles.wrapper,
            style,
            isRound && { borderRadius: iconSize / 2 },
          ]}
        >
          <Image
            source={{ uri: uri }}
            style={[
              { width: iconSize, height: iconSize },
              isRound && { borderRadius: iconSize / 2 },
            ]}
            resizeMode={resizeMode}
            tintColor={tintColor}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
Icon.propTypes = {};
Icon.defaultProps = {
  size: 'regular',
  resizeMode: 'contain',
  tintColor: base.colors.midGrey,
  isRound:false
};
const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    backgroundColor: 'transparent',
    padding: 0,
  },
});

export default Icon;

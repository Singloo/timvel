import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  findNodeHandle,
} from 'react-native';
import PropTypes from 'prop-types';
import { BlurView } from 'react-native-blur';
import { base } from '../utils';
import Icon from './Icon';
class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
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
      return <Text style={[styles.title, titleStyle]}>{title}</Text>;
    } else {
      return <View style={[styles.blank, { flex: 1 }]} />;
    }
  };
  render() {
    const { style } = this.props;
    return (
      <View style={[styles.wrapper, style]}>
        {!base.isIOS && (
          <View
            ref={r => {
              this.backgroundImage = r;
            }}
            onLayout={this.imageLoaded.bind(this)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        )}
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'xlight'}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        />
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
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
  },
});

export default NavigationBar;

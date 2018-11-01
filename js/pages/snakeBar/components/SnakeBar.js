import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Text, Touchable, Image, Assets } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { PADDING_TOP, isAndroid } = base;
const { Styles, colors } = base;
const typeStyles = {
  NORMAL: {
    source: Assets.smile.source,
    tintColor: colors.main,
    // bkColor: 'rgba(224,242,241,0.8)',
    bkColor: 'rgba(250,250,250,0.8)',
    textColor: colors.mainDep,
  },
  ERROR: {
    source: Assets.wrong.source,
    tintColor: colors.red,
    bkColor: 'rgba(255,235,238,0.8)',
    textColor: colors.redDep,
  },
  SUCCESS: {
    source: Assets.success.source,
    tintColor: colors.green,
    bkColor: 'rgba(241,248,233,0.8)',
    textColor: colors.greenDep,
  },
};
const snake_bar_height = 48 + PADDING_TOP + (isAndroid ? 20 : 0);
class SnakeBar extends Component {
  constructor(props) {
    super(props);

    this.animationState = new Animated.Value(0);
    this.animationShow = Animated.spring(this.animationState, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });
    this.animationEnd = Animated.spring(this.animationState, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });
  }
  componentWillMount() {}
  componentDidMount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
      this.animationState.setValue(0);
    }
    this.show();
  }
  componentDidUpdate() {}

  componentWillUnmount() {
    // this.timer2 && clearTimeout(this.timer2);
    this.timer1 && clearTimeout(this.timer1);
  }
  show() {
    const { duration } = this.props;
    this.animationShow.start();
    this.timer1 = setTimeout(() => {
      this.dismiss();
    }, duration);
  }
  dismiss() {
    const { callback, onPress } = this.props;
    this.animationEnd.start(() => {
      // callback && callback();
    });
    onPress && onPress();
  }

  render() {
    const { info, type } = this.props;
    const typeStyle = typeStyles[type];
    return (
      <Touchable
        withoutFeedback={true}
        onPress={() => {
          this.animationShow.stop();
          this.dismiss();
        }}
      >
        <Animated.View
          style={[
            styles.container,
            Styles.shadow,
            {
              backgroundColor: 'white',
              // backgroundColor: typeStyle.bkColor,
              shadowColor: typeStyle.textColor,
              transform: [
                {
                  translateY: this.animationState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-snake_bar_height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Image source={typeStyle.source} tintColor={typeStyle.tintColor} />
          <Text style={[styles.info, { color: typeStyle.textColor }]}>
            {info}
          </Text>
        </Animated.View>
      </Touchable>
    );
  }
}
SnakeBar.propTypes = {};
SnakeBar.defaultProps = {
  duration: 3000,
  info: '',
  type: 'NORMAL',
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: snake_bar_height,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: PADDING_TOP,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(250,250,250,1)',
  },
  info: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: '200',
  },
});

export default SnakeBar;

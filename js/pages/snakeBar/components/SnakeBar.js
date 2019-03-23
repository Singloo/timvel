import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
  Button,
  Text,
  Touchable,
  Image,
  Assets,
  NAV_BAR_HEIGHT_FULL,
  PADDING_TOP_FULL,
  Styles,
} from '../../../../re-kits';
import { colors, I18n, clearTimers, invoke } from '../../../utils';
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
const snake_bar_height = NAV_BAR_HEIGHT_FULL;
class SnakeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationState: new Animated.Value(0),
    };

    this.animationShow = Animated.spring(this.state.animationState, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });
    this.animationEnd = Animated.spring(this.state.animationState, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });
  }
  componentWillMount() {}
  componentDidMount() {
    if (this.timer1) {
      clearTimers(this.timer1);
      this.state.animationState.setValue(0);
    }
    this.show();
  }
  componentDidUpdate() {}

  componentWillUnmount() {
    // this.timer2 && clearTimeout(this.timer2);
    clearTimers(this.timer1);
  }
  show = () => {
    const { duration } = this.props;
    this.animationShow.start();
    this.timer1 = setTimeout(() => {
      this.dismiss();
    }, duration);
  };
  dismiss = () => {
    const { onPress } = this.props;
    this.animationEnd.start(() => {
      // callback && callback();
    });
    onPress && onPress();
  };

  render() {
    const { info, type } = this.props;
    const typeStyle = typeStyles[type];
    const translateY = this.state.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [-snake_bar_height, 0],
    });
    const transform = [{ translateY }];
    return (
      <Touchable
        withoutFeedback={true}
        onPress={invoke(this.animationShow.stop, this.dismiss)}
      >
        <Animated.View
          style={[
            styles.container,
            Styles.shadow,
            {
              backgroundColor: 'white',
              // backgroundColor: typeStyle.bkColor,
              shadowColor: typeStyle.textColor,
              transform,
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
    paddingTop: PADDING_TOP_FULL,
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

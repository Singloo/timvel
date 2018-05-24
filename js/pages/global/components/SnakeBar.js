import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Text, Icon, Touchable } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { Styles } = base;

class SnakeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationState: new Animated.Value(0),
    };
  }
  componentWillMount() {}
  componentDidMount() {
    this.show();
  }

  componentWillUnmount() {
    this.timer1 && clearTimeout(this.timer1);
    this.timer2 && clearTimeout(this.timer2);
  }
  show() {
    const { duration } = this.props;
    Animated.spring(this.state.animationState, {
      toValue: 1,
      duration: 500,
    }).start();
    this.timer2 = setTimeout(() => {
      this.dismiss();
    }, duration);
  }
  dismiss() {
    const { callback } = this.props;
    Animated.spring(this.state.animationState, {
      toValue: 0,
      duration: 400,
    }).start();
    this.timer1 = setTimeout(() => {
      callback && callback();
    }, 400);
  }

  render() {
    const { info } = this.props;
    return (
      <Touchable
        withoutFeedback={true}
        onPress={() => {
          this.dismiss();
        }}
      >
        <Animated.View
          style={[
            styles.container,
            Styles.shadow,
            {
              backgroundColor: 'white',
            },
            {
              top: this.state.animationState.interpolate({
                inputRange: [0, 1],
                outputRange: [-60, 0],
              }),
            },
            // {top:0}
          ]}
        >
          <Text style={styles.info}>{info}</Text>
        </Animated.View>
      </Touchable>
    );
  }
}
SnakeBar.propTypes = {};
SnakeBar.defaultProps = {
  duration: 3000,
  info: '',
  type: 'normal',
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    fontSize: 20,
  },
});

export default SnakeBar;

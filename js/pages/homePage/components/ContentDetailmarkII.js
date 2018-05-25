import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Image, Text } from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
const { SCREEN_WIDTH, SCREEN_HEIGHT } = base;
class ContentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationState: new Animated.Value(0),
    };
  }
  componentWillMount() {}

  componentDidMount() {
    Animated.spring(this.state.animationState, {
      toValue: 1,
      duration: 500,
    }).start();
  }
  componentWillUnmount() {}

  _closeModal = () => {
    Animated.spring(this.state.animationState, {
      toValue: 0,
      duration: 500,
    }).start();

    setTimeout(() => {
      this.props.closeModal();
    }, 500);
  };
  render() {
    const { frameTop, frameLeft, closeModal } = this.props;
    const { animationState } = this.state;
    return (
      <View>
      <Animated.View
        style={[
          styles.container,
          {
            borderRadius: animationState.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [50, SCREEN_WIDTH / 2, 0],
            }),
            width: animationState.interpolate({
              inputRange: [0, 1],
              outputRange: [100, SCREEN_WIDTH],
            }),
            height: animationState.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [100, SCREEN_WIDTH, SCREEN_HEIGHT],
            }),
            opacity: animationState.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1],
            }),
            left: animationState.interpolate({
              inputRange: [0, 1],
              outputRange: [frameLeft, 0],
            }),
            top: animationState.interpolate({
              inputRange: [0, 1],
              outputRange: [frameTop, 0],
            }),
          },
        ]}
      >
        <View style={{ alignSelf: 'center' }}>
          <Image uri={'arrow_left'} onPress={this._closeModal} />
          <Text>{'Hello there'}</Text>
        </View>
      </Animated.View>
      </View>
    );
  }
}
ContentDetail.propTypes = {};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'red',
  },
});

export default ContentDetail;

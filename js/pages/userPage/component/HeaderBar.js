import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Animated,
  LayoutAnimation,
  findNodeHandle,
} from 'react-native';
import { Button, Text, InfiniteText } from '../../../../re-kits';
import { base } from '../../../utils';
import { BlurView } from 'react-native-blur';
const { PADDING_TOP } = base;
const scroll_height = 200 - 44 - PADDING_TOP;
class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  componentWillMount() {}
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  render() {
    const { username, userCoin, userAvatar, userTitle, nScrollY } = this.props;
    let y = nScrollY.interpolate({
      inputRange: [scroll_height, 200],
      outputRange: [-44 - PADDING_TOP, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        ref={r => {
          this.backgroundImage = r;
        }}
        onLayout={this.imageLoaded.bind(this)}
        style={[
          { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 },
          styles.headerBar,
          {
            transform: [{ translateY: y }],
          },
        ]}
      >
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'xlight'}
          style={styles.absolute}
        />
      </Animated.View>
    );
  }
}
HeaderBar.propTypes = {};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  infoContainerAfter: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    height: 30,
    alignItems: 'center',
    // alignSelf:'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  avatarAfter: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerBar: {
    height: 44 + PADDING_TOP,
    paddingTop: PADDING_TOP,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33,33,33,0.8)',
  },
});

export default HeaderBar;

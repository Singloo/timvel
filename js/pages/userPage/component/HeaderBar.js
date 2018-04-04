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
import { Button, Text, InfiniteText } from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import { BlurView } from 'react-native-blur';
const { SCREEN_WIDTH, colors, renderTitle, PADDING_TOP } = base;
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
    const { username, userCoin, userAvatar, userTitle, shrink } = this.props;
    return (
      <Animated.View
        ref={r => {
          this.backgroundImage = r;
        }}
        onLayout={this.imageLoaded.bind(this)}
        style={[
          { position: 'absolute', top: 0, left: 0, right: 0 },
          styles.headerBar,
          { top: shrink ? 0 : -(44 + PADDING_TOP) },
          { opacity: shrink ? 1 : 0 },
        ]}
      >
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'xlight'}
          style={styles.absolute}
        />
        <View style={styles.infoContainerAfter}>
          <Image source={{ uri: userAvatar }} style={styles.avatarAfter} />
          <View style={styles.textContainer}>
            <InfiniteText
              text={username + userCoin}
              style={{}}
              textStyle={{ color: colors.white }}
            >
              {renderTitle(userTitle)}
              <View
                style={{
                  width: 1,
                  height: 18,
                  backgroundColor: colors.white,
                  marginRight: 4,
                  alignSelf: 'center',
                }}
              />
            </InfiniteText>
          </View>
        </View>
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

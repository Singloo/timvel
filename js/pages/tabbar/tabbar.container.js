import React, { Component } from 'react';
import { StyleSheet, View, findNodeHandle, Animated } from 'react-native';
import { Assets } from '../../../re-kits';
import { base, curried } from '../../utils';
import { BlurView } from 'react-native-blur';
// const BlurView = View;
import Tab from './components/Tab';
const { PADDING_BOTTOM, TAB_BAR_HEIGHT } = base;
const goingToHidden = (prev, curr) =>
  !prev.global.isTabBarHidden && curr.global.isTabBarHidden;
const goingToShow = (prev, curr) =>
  prev.global.isTabBarHidden && !curr.global.isTabBarHidden;
class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
      animationState: new Animated.Value(0),
    };
    this.animationStart = Animated.timing(this.state.animationState, {
      toValue: TAB_BAR_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    });
    this.animationClose = Animated.timing(this.state.animationState, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    });
  }
  componentWillMount() {}
  componentDidUpdate(prevProps) {
    if (goingToHidden(prevProps, this.props)) {
      this.animationStart.start();
    }
    if (goingToShow(prevProps, this.props)) {
      this.animationClose.start();
    }
  }
  _imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  };

  _onPressTab = key => {
    const { jumpTo } = this.props;
    jumpTo(key);
  };
  render() {
    const translateY = this.state.animationState;
    const transform = [{ translateY }];
    return (
      <Animated.View
        style={[
          styles.container,
          { height: TAB_BAR_HEIGHT, paddingBottom: PADDING_BOTTOM },
          {
            transform,
          },
        ]}
      >
        {!base.isIOS && (
          <View
            ref={r => {
              this.backgroundImage = r;
            }}
            // onLayout={this._imageLoaded}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: 'rgba(250,250,250,0.8)',
            }}
          />
        )}
        {this.state.viewRef && (
          <BlurView
            viewRef={this.state.viewRef}
            blurType={'light'}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            blurAmount={10}
          />
        )}
        <Tab
          source={Assets.eu_bird.source}
          onPress={curried(this._onPressTab)('Home')}
          // tintColor={index == 0 ? activeTintColor : inactiveTintColor}
          // title={'home'}
        />
        <Tab
          source={Assets.eu_bosk.source}
          onPress={curried(this._onPressTab)('ShopPage')}
          // tintColor={index == 1 ? activeTintColor : inactiveTintColor}
          // size={'large'}
          // title={'home'}
        />

        <Tab
          source={Assets.eu_cactus.source}
          onPress={curried(this._onPressTab)('NotifPage')}
          // tintColor={index == 2 ? activeTintColor : inactiveTintColor}
          // title={'home'}
        />
        <Tab
          source={Assets.eu_fox.source}
          onPress={curried(this._onPressTab)('UserPage')}
          // tintColor={index == 3 ? activeTintColor : inactiveTintColor}
          // title={'home'}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Tabbar;

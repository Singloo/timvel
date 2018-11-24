import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  findNodeHandle,
  Animated,
} from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
} from '../../../re-kits';
import { base } from '../../utils';
import { BlurView } from 'react-native-blur';
import Tab from './components/Tab';
const PADDING_BOTTOM = base.isIphoneX ? 34 : 0;
class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
    this.animationState = new Animated.Value(0);
    this.animationStart = Animated.timing(this.animationState, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });
    this.animationClose = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    });
  }
  componentWillMount() {}
  componentDidUpdate() {
    const { tabBarHidden, showTabbarAnimation } = this.props.global;
    if (tabBarHidden && showTabbarAnimation) {
      this.animationStart.start();
      return;
    }
    if (!tabBarHidden && showTabbarAnimation) {
      this.animationClose.start(() => {
        this.props.logic('GLOBAL_SET_STATE', {
          showTabbarAnimation: false,
        });
      });
      return;
    }
  }
  _imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  };

  _onPressTab = key => () => {
    const { jumpTo } = this.props;
    jumpTo(key);
  };
  render() {
    const { navigation } = this.props;
    // const { tabBarHidden } = this.props.global;
    // const index = navigation.state.index;
    // const activeTintColor = base.colors.main;
    // const inactiveTintColor = base.colors.midGrey;
    // if (tabBarHidden) {
    //   return null;
    // }
    let containerY = this.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 48 + PADDING_BOTTOM],
    });
    return (
      <Animated.View
        style={[
          styles.container,
          { height: 48 + PADDING_BOTTOM, paddingBottom: PADDING_BOTTOM },
          {
            transform: [
              {
                translateY: containerY,
              },
            ],
          },
        ]}
      >
        {!base.isIOS && (
          <View
            ref={r => {
              this.backgroundImage = r;
            }}
            onLayout={this._imageLoaded}
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
          blurType={'light'}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
          blurAmount={10}
        />
        <Tab
          source={Assets.eu_bird.source}
          onPress={this._onPressTab('Home')}
          // tintColor={index == 0 ? activeTintColor : inactiveTintColor}
          // title={'home'}
        />
        <Tab
          source={Assets.eu_bosk.source}
          onPress={this._onPressTab('ShopPage')}
          // tintColor={index == 1 ? activeTintColor : inactiveTintColor}
          // size={'large'}
          // title={'home'}
        />

        <Tab
          source={Assets.eu_cactus.source}
          onPress={this._onPressTab('NotifPage')}
          // tintColor={index == 2 ? activeTintColor : inactiveTintColor}
          // title={'home'}
        />
        <Tab
          source={Assets.eu_fox.source}
          onPress={this._onPressTab('UserPage')}
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
    height: 48,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Tabbar;

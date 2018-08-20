import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  ContentByTag,
} from '../../../re-kits';
import { base, I18n } from '../../utils';
const { SCREEN_WIDTH, NAV_BAR_HEIGHT } = base;
const image_width = SCREEN_WIDTH;
const image_height = SCREEN_WIDTH * 0.7;
const scroll_height = image_height - NAV_BAR_HEIGHT;
class StrangerProfile extends Component {
  constructor(props) {
    super(props);
    this._nScrollY = new Animated.Value(0);
  }
  componentWillMount() {}

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  render() {
    let image_translateY = this._nScrollY.interpolate({
      inputRange: [-25, 0, scroll_height * 1.6],
      outputRange: [-18, 0, -scroll_height],
      extrapolateRight: 'clamp',
    });
    let imgScale = this._nScrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._nScrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <Animated.View style={{}}>
            <Animated.Image
              source={Assets.bk2.source}
              style={{
                height: image_height,
                width: image_width,
                transform: [
                  {
                    translateY: image_translateY,
                  },
                  {
                    scale: imgScale,
                  },
                ],
              }}
            />
          </Animated.View>
          <ContentByTag />
          <ContentByTag />
          <ContentByTag />
          <ContentByTag />
        </Animated.ScrollView>
        <NavBar
          title={'welcome'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          style={{ position: 'absolute', top: 0 }}
        />
      </View>
    );
  }
}
StrangerProfile.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default StrangerProfile;

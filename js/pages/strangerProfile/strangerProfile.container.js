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
import { base, I18n ,User} from '../../utils';
import { connect2 } from '../../utils/Setup';
import { ableToBuy } from '../../utils/Network';
import { interval, Subject, of, from } from 'rxjs';
import {
  take,
  concatMap,
  map,
  tap,
  multicast,
  publish,
  debounceTime,
} from 'rxjs/operators';
import GiftsModal from './components/GiftsModal';
import { flowerPatterns, shitPatterns } from './data/gifts';
const {
  SCREEN_WIDTH,
  NAV_BAR_HEIGHT,
  randomItem,
  randomNumber,
  SCREEN_HEIGHT,
} = base;
const image_width = SCREEN_WIDTH;
const image_height = SCREEN_WIDTH * 0.7;
const scroll_height = image_height - NAV_BAR_HEIGHT;
const fs_size = 20;
const getRandomFS = (isF = true, giftType = null, size = fs_size) => {
  return isF
    ? {
        x: randomNumber(0, SCREEN_WIDTH - fs_size),
        y: randomNumber(NAV_BAR_HEIGHT, SCREEN_HEIGHT - fs_size),
        source:
          flowerPatterns[
            giftType ? giftType : randomItem(Object.keys(flowerPatterns))
          ],
        size: size,
      }
    : {
        x: randomNumber(0, SCREEN_WIDTH - fs_size),
        y: randomNumber(NAV_BAR_HEIGHT, SCREEN_HEIGHT - fs_size),
        source:
          shitPatterns[
            giftType ? giftType : Object.keys(randomItem(shitPatterns))
          ],
        size: size,
      };
};

@connect2('strangerProfile')
class StrangerProfile extends Component {
  constructor(props) {
    super(props);
    this._nScrollY = new Animated.Value(0);
    this.image_translateY = this._nScrollY.interpolate({
      inputRange: [-25, 0, scroll_height * 1.6],
      outputRange: [-18, 0, -scroll_height],
      extrapolateRight: 'clamp',
    });
    this.imgScale = this._nScrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
  }
  componentWillMount() {
    this.user = this.props.navigation.getParam('user', {});
    this.props.logic('STRANGER_PROFILE_FETCH_POSTS', {
      userId: this.user.userId,
    });
    this.props.logic('STRANGER_PROFILE_FETCH_USER_INFOS', {
      userId: this.user.userId,
      callback: this._connect,
    });
  }
  componentWillUnmount() {
    this.props.logic('STRANGER_PROFILE_RESET_STATE');
    this.addFS$ && this.addFS$.unsubscribe();
  }
  componentDidMount() {}

  _startRenderFS = (flowerAmount = 0, shitAmount = 0) => {
    let source$ = interval(300).pipe(
      take(Math.max(flowerAmount, shitAmount)),
      map(() => {
        const { flowers, shits } = this.props.state;
        let flower = flowers.length < flowerAmount ? getRandomFS(true) : null;
        let shit = shits.length < shitAmount ? getRandomFS(false) : null;
        return {
          flower,
          shit,
        };
      }),
    );
    this.giftSubject$ = new Subject();
    source$.subscribe(value => this.giftSubject$.next(value));
    return this.giftSubject$.subscribe({
      next: ({ flower, shit }) => {
        const { flowers, shits } = this.props.state;
        this.props.logic('STRANGER_PROFILE_SET_STATE', {
          flowers: flower ? flowers.concat([flower]) : flowers,
          shits: shit ? shits.concat([shit]) : shits,
        });
      },
      complete: () => {
        console.warn('complete');
      },
    });
  };
  _connect = (f, s) => {
    console.warn('connect');
    this.addFS$ = this._startRenderFS(f, s);
  };
  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  _modalController = bool => () => {
    this.props.logic('STRANGER_PROFILE_SET_STATE', {
      showModal: bool,
    });
  };

  _onConfirmSendGift = async giftType => {
    try {
      const bool = await User.ableToBuy(giftType > 100 ? 200 : 100);
      if (!bool) {
        this.props.snakeBar('No coins..', 'ERROR');
        return;
      }
      this.giftSubject$.next({
        flower: giftType < 100 ? getRandomFS(true, giftType, 40) : null,
        shit: giftType > 100 ? getRandomFS(false, giftType, 40) : null,
      });
      this.props.logic('STRANGER_PROFILE_SEND_GIFT', {
        receiver: this.user.userId,
        giftType: giftType,
      });
    } catch (error) {
      console.warn(error.message);
      this.props.snakeBar('Network error', 'ERROR');
    }
  };

  render() {
    const { postsByTag, userInfo, flowers, shits } = this.props.state;
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={8}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._nScrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {this.renderUserInfo()}
          {this.renderCards()}
        </Animated.ScrollView>
        <Button title={'show'} onPress={this._modalController(true)} />
        <NavBar
          title={'f' + `${flowers.length}`}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          style={{ position: 'absolute', top: 0 }}
        />
        {this.renderFS(flowers)}
        {this.renderFS(shits)}
        {this.renderGiftsModal()}
      </View>
    );
  }

  renderGiftsModal = () => {
    const { showModal } = this.props.state;
    return (
      <GiftsModal
        show={showModal}
        modalController={this._modalController}
        onPressConfirm={this._onConfirmSendGift}
      />
    );
  };
  renderUserInfo = () => {
    return (
      <Animated.View>
        <Animated.Image
          source={Assets.bk2.source}
          style={{
            height: image_height,
            width: image_width,
            transform: [
              {
                translateY: this.image_translateY,
              },
              {
                scale: this.imgScale,
              },
            ],
          }}
        />
      </Animated.View>
    );
  };
  renderCards = (key, index) => {
    const { postsByTag } = this.props.state;
    return Object.keys(postsByTag).map((key, index) => {
      return (
        <ContentByTag key={'sp' + index} tag={key} posts={postsByTag[key]} />
      );
    });
  };
  renderFS = (data = []) => {
    const { hide } = this.props.state;
    if (data.length === 0) {
      return null;
    }
    if (hide) {
      return null;
    }
    return data.map((item, index) => (
      <Image
        key={'f' + index}
        source={item.source}
        style={{
          width: item.size,
          height: item.size,
          position: 'absolute',
          left: item.x,
          top: item.y,
        }}
        resizeMode={'contain'}
      />
    ));
  };
}
StrangerProfile.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default StrangerProfile;

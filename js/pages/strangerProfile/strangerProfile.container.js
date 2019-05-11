import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  Assets,
  ContentByTag,
  NAV_BAR_HEIGHT_FULL,
  Text,
  colors,
  Touchable,
} from '../../../re-kits';
import {
  SCREEN_WIDTH,
  randomItem,
  randomNumber,
  SCREEN_HEIGHT,
  User,
  curried,
  I18n,
} from '../../utils';
import { connect2 } from '../../utils/Setup';
import { interval, Subject } from 'rxjs';
import { take, map, delay } from 'rxjs/operators';
import GiftsModal from './components/GiftsModal';
import { flowerPatterns, shitPatterns } from './data/gifts';
import { CoinTransactionRecords } from '../../services';
const IMAGE_WIDTH = SCREEN_WIDTH;
const IMAGE_HEIGHT = SCREEN_WIDTH * 0.7;
const scroll_height = IMAGE_HEIGHT - NAV_BAR_HEIGHT_FULL;
const fs_size = 20;
const getRandomFS = (isF = true, giftType = null, size = fs_size) => {
  return isF
    ? {
        x: randomNumber(0, SCREEN_WIDTH - fs_size),
        y: randomNumber(NAV_BAR_HEIGHT_FULL, SCREEN_HEIGHT - fs_size),
        source:
          flowerPatterns[
            giftType ? giftType : randomItem(Object.keys(flowerPatterns))
          ],
        size: size,
      }
    : {
        x: randomNumber(0, SCREEN_WIDTH - fs_size),
        y: randomNumber(NAV_BAR_HEIGHT_FULL, SCREEN_HEIGHT - fs_size),
        source:
          shitPatterns[
            giftType ? giftType : randomItem(Object.keys(shitPatterns))
          ],
        size: size,
      };
};

@connect2('strangerProfile')
class StrangerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nScrollY: new Animated.Value(0),
    };
    this.giftSubject$ = new Subject();
  }
  componentWillMount() {
    this.user = this.props.navigation.getParam('user', {});
    this.props.dispatch('STRANGER_PROFILE_FETCH_POSTS', {
      userId: this.user.userId,
    });
    this.props.dispatch('STRANGER_PROFILE_FETCH_USER_INFOS', {
      userId: this.user.userId,
      callback: this._connect,
    });
  }
  componentWillUnmount() {
    this.props.dispatch('STRANGER_PROFILE_RESET_STATE');
    this.addFS$ && this.addFS$.unsubscribe();
    this.sourceSubscriber && this.sourceSubscriber.unsubscribe();
  }
  componentDidMount() {
    this.addFS$ = this.giftSubject$.subscribe({
      next: ({ flower, shit }) => {
        const { flowers, shits } = this.props.state;
        this.props.dispatch('STRANGER_PROFILE_SET_STATE', {
          flowers: flower ? flowers.concat(flower) : flowers,
          shits: shit ? shits.concat(shit) : shits,
        });
      },
      complete: () => {
        console.warn('complete');
      },
    });
  }

  _startRenderFS = (flowerAmount = 0, shitAmount = 0) => {
    const source$ = interval(300).pipe(
      delay(1500),
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
    this.sourceSubscriber = source$.subscribe(value =>
      this.giftSubject$.next(value),
    );
  };
  _connect = (f, s) => {
    console.warn('connect');
    this._startRenderFS(f, s);
  };
  _goBack = () => {
    this.props.navigation.goBack();
  };

  _modalController = bool => {
    this.props.dispatch('STRANGER_PROFILE_SET_STATE', {
      showModal: bool,
    });
  };
  _report = () => {
    // const { posts } = this.props.state;
    const callback = () => {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        content: I18n.t('reportSuccess'),
      });
      // this.props.dispatch('HOME_PAGE_SET_STATE', {
      //   posts: posts.filter(o => o.postId !== postId),
      // });
    };
    this.props.dispatch('ALERT_REPORT', {
      childId: this.user.userId,
      type: 'user',
      callback,
    });
  };
  _onConfirmSendGift = async giftType => {
    try {
      const price = giftType > 100 ? 200 : 100;
      const bool = await User.ableToBuy(price);
      if (!bool) {
        this.props.snakeBar(I18n.t('noEnoughCoin'), 'ERROR');
        return;
      }
      this.giftSubject$.next({
        flower: giftType < 100 ? getRandomFS(true, giftType, 40) : null,
        shit: giftType > 100 ? getRandomFS(false, giftType, 40) : null,
      });
      this.props.dispatch('STRANGER_PROFILE_SEND_GIFT', {
        receiver: this.user.userId,
        giftType: giftType,
      });
      CoinTransactionRecords.showAnimation(-price);
    } catch (error) {
      console.warn(error.message);
      this.props.snakeBar(I18n.t('networkError'), 'ERROR');
    }
  };
  _goToPostDetail = post => {
    this.props.navigation.navigate({
      routeName: 'postDetail',
      params: {
        post,
      },
    });
  };
  render() {
    const { flowers, shits } = this.props.state;
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={8}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.nScrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {this.renderUserInfo()}
          {this.renderCards()}
        </Animated.ScrollView>
        <NavBar
          title={this.user.username}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          style={{
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(250,250,250,0.5)',
          }}
          renderRight={this._renderNavBarRight}
          renderCenter={this._renderNavBarCenter}
        />
        {this.renderFS(flowers)}
        {this.renderFS(shits)}
        {this.renderGiftsModal()}
      </View>
    );
  }
  _renderNavBarCenter = () => {
    return (
      <View style={[styles.rowCenter, { flex: 1, justifyContent: 'center' }]}>
        <Image uri={this.user.avatar} size={'small'} isRound={true} />
        <Text style={{ fontSize: 16, marginLeft: 10 }}>
          {this.user.username}
        </Text>
      </View>
    );
  };
  _renderNavBarRight = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={Assets.report.source}
          tintColor={colors.depGrey}
          onPress={this._report}
          size={'small'}
        />
        <Image
          source={Assets.gift.source}
          tintColor={colors.main}
          onPress={curried(this._modalController)(true)}
          style={{ marginLeft: 15 }}
        />
      </View>
    );
  };
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
    const translateY = this.state.nScrollY.interpolate({
      inputRange: [-25, 0, scroll_height * 1.6],
      outputRange: [-18, 0, -scroll_height],
      extrapolateRight: 'clamp',
    });
    const scale = this.state.nScrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
    const transform = [{ translateY }, { scale }];
    return (
      <Animated.View>
        <Touchable
          withoutFeedback={true}
          onLongPress={curried(this._report)(this.user.userId)}
        >
          <Animated.Image
            source={{ uri: this.user.avatar }}
            style={{
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
              transform,
            }}
          />
        </Touchable>
      </Animated.View>
    );
  };
  renderCards = () => {
    const { postsByTag } = this.props.state;
    return Object.keys(postsByTag).map((key, index) => {
      return (
        <ContentByTag
          key={'sp' + index}
          tag={key}
          posts={postsByTag[key]}
          onPressCard={this._goToPostDetail}
        />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StrangerProfile;

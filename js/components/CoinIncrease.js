import * as React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  Text,
  createMoveableComp,
  PriceTag,
  NAV_BAR_HEIGHT_FULL,
  Styles,
} from '../../re-kits';
import RootSiblings from 'react-native-root-siblings';
import { map, filter } from 'rxjs/operators';
import {
  User,
  runAfter,
  curried,
  colors,
  randomItem,
  randomNumber,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  apiClient,
} from '../utils';

import * as Animatable from 'react-native-animatable';
// import Moment from 'moment'
import { ITEM_SIZE, COIN, BUBBLE_SIZE } from './CoinIncreaseConstants';
import { CoinTransactionRecords } from '../services';
import {
  $sourceSecond,
  $sourceOneMinue,
  // $sourceTenSeconds,
  $CENTER,
  $TYPES,
  $sourceTenSeconds,
} from '../utils/$observable';
const deleteObject = (obj, key) => () => delete obj[key];
const MAXIMUM_BUBBLE = 3;
const TIME = 3;
const getRandomCoin = () => {
  const random = Math.random();
  if (random > 0.95) {
    return 10 * TIME;
  }
  if (random > 0.9) {
    return 8 * TIME;
  }
  if (random > 0.8) {
    return 4 * TIME;
  }
  if (random > 0.7) {
    return 3 * TIME;
  }
  if (random > 0.5) {
    return 2 * TIME;
  }
  return 1 * 2 * TIME;
};
class CoinIncrease extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
      show: false,
    };
    this.rootSibling;
    this.bubblePool = {};
    this.$timeSubscriber;
    this.$bubbleSubscriber;
  }
  componentDidMount() {
    this._userMountListener();
  }

  componentWillUnmount() {
    this._clearSubscription();
  }
  _userMountListener = () => {
    const listener = $CENTER
      .pipe(filter(({ type }) => type === $TYPES.userMount))
      .subscribe(() => {
        console.warn('timer init');
        setTimeout(async () => {
          try {
            const { data } = await apiClient.get('/user/show_timer', {
              params: {
                user_id: User.objectId,
              },
            });
            if (!data.show) return;
            this.setState({
              show: true,
            });
            this._init();
          } catch (err) {}
        }, 5000);
        listener.unsubscribe();
        this._userUnmountListener();
      });
  };
  _userUnmountListener = () => {
    const listener = $CENTER
      .pipe(filter(({ type }) => type === $TYPES.userUnmount))
      .subscribe(() => {
        this.setState({
          show: false,
        });
        listener.unsubscribe();
        this._clearSubscription();
        this._userMountListener();
      });
  };
  _init = () => {
    this.$timeSubscriber = $sourceSecond
      .pipe(map(_ => _ + 1))
      .subscribe(second =>
        this.setState({
          second,
        }),
      );
    if (__DEV__) {
      return;
    }
    this.$bubbleSubscriber = $sourceOneMinue.subscribe(
      runAfter(this._renderCoinBubble),
    );
  };
  _clearSubscription = () => {
    this.$timeSubscriber && this.$timeSubscriber.unsubscribe();
    this.$bubbleSubscriber && this.$bubbleSubscriber.unsubscribe();
  };
  _renderCoinBubble = () => {
    if (Object.keys(this.bubblePool).length >= MAXIMUM_BUBBLE) {
      this._destroyBubble();
    }
    this._createRootView();
  };

  _onPressBubble = (id, coin) => {
    this._destroyBubble(id);
    if (!User.isLoggedIn) {
      console.warn('not log in');
      return;
    }
    CoinTransactionRecords.consume(coin, 'keep_online');
  };

  _destroyBubble = (id = null) => {
    if (!id) {
      const keys = Object.keys(this.bubblePool);
      if (keys.length === 0) {
        return;
      }
      this._destroyBubble(keys[0]);
      return;
    }
    this.bubblePool[id].rootView.destroy(deleteObject(this.bubblePool, id));
  };

  _createRootView = () => {
    const top = randomNumber(
      0,
      SCREEN_HEIGHT - BUBBLE_SIZE - NAV_BAR_HEIGHT_FULL,
    );
    const left = randomNumber(0, SCREEN_WIDTH - BUBBLE_SIZE);
    const coin = getRandomCoin();
    const delay = randomItem([100, 200, 300, 400]);
    const id = Date.now();
    const style = {
      position: 'absolute',
      left,
      top,
      width: BUBBLE_SIZE + 10,
      height: BUBBLE_SIZE + 10,
      padding: 5,
    };
    const comp = (
      <View style={style}>
        <CoinBubble
          onPress={curried(this._onPressBubble)(id, coin)}
          price={coin}
          delay={delay}
        />
      </View>
    );
    const bubbleObj = {
      id,
      rootView: new RootSiblings(comp),
    };
    setTimeout(() => {
      this.bubblePool[id] = bubbleObj;
    }, 0);
  };
  render() {
    const { second, show } = this.state;
    if (!show) {
      return null;
    }
    const minute = Math.floor(second / 60);
    let seconds = second % 60;
    seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
    return (
      <View style={[styles.container, Styles.center]}>
        <Text>{`${minute}:${seconds}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function CoinBubble({ style, price, onPress, delay = 0 }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animatable.View
        style={[styles.bubble, style]}
        animation={'pulse'}
        easing={'ease-out'}
        iterationCount={'infinite'}
        delay={delay}
      >
        <PriceTag price={price} />
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
}

export default createMoveableComp(CoinIncrease);

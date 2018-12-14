import * as React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, createMoveableComp, PriceTag } from '../../re-kits';
import RootSiblings from 'react-native-root-siblings';
import { interval } from 'rxjs';
import { bufferCount, map } from 'rxjs/operators';
import { base } from '../utils';
const {
  colors,
  Styles,
  randomItem,
  randomNumber,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  NAV_BAR_HEIGHT,
} = base;
import * as Animatable from 'react-native-animatable';
// import Moment from 'moment'
const ITEM_SIZE = 80;
const BUBBLE_SIZE = 60;
const COIN = [
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  8,
  8,
  9,
  10,
  15,
];
class CoinIncrease extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
    };
    this.observable$;
    this.rootSibling;
    this.bubblePool = {};
  }
  componentDidMount() {
    this.observable$ = interval(1000).pipe(
      map(_ => {
        this.setState({
          second: _ + 1,
        });
        return _ + 1;
      }),
      bufferCount(10),
    );
    this.observable$.subscribe(this._renderCoinBubble);
  }
  _renderCoinBubble = () => {
    if (Object.keys(this.bubblePool).length > 4) {
      this._destroyBubble();
    }
    this._createRootView();
  };

  _onPressBubble = (id, coin) => () => {
    this._destroyBubble(id);
    // let index = null;
    // this.bubblePool.forEach((item, i) => {
    //   if (item.id === id) {
    //     index = i;
    //   }
    // });
    // console.warn(index);
    // if (index) {
    //   this._destroyBubble(index);
    // }
  };
  _createBubble = () => {};

  _destroyBubble = (id = null) => {
    if (!id) {
      const keys = Object.keys(this.bubblePool);
      if (keys.length === 0) {
        return;
      }
      this.bubblePool[keys[0]].rootView.destroy(() => {
        delete this.bubblePool[id];
      });
      return;
    }
    this.bubblePool[id].rootView.destroy(() => {
      delete this.bubblePool[id];
    });
  };

  _createRootView = callback => {
    const top = randomNumber(0, SCREEN_HEIGHT - BUBBLE_SIZE - NAV_BAR_HEIGHT);
    const left = randomNumber(0, SCREEN_WIDTH - BUBBLE_SIZE);
    const coin = randomItem(COIN);
    const delay = randomNumber(1, 100);
    const id = Date.now();
    const style = {
      position: 'absolute',
      left,
      top,
      width: BUBBLE_SIZE + 10,
      height: BUBBLE_SIZE + 10,
      padding: 5,
      // backgroundColor: 'red',
    };
    const comp = (
      <View style={style}>
        {
          <CoinBubble
            onPress={this._onPressBubble(id, coin)}
            price={coin}
            delay={delay}
          />
        }
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
    const { second } = this.state;
    // const {} = this.props;
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

function CoinBubble({ style, price, onPress, delay }) {
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

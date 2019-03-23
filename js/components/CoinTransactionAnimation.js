import * as React from 'react';
import { StyleSheet } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { $coinTransaction, $CENTER, $TYPES } from '../utils/$observable';
import { SCREEN_WIDTH, colors, User } from '../utils';
import {
  PriceTag,
  Touchable,
  NAV_BAR_HEIGHT_FULL,
  Styles,
} from '../../re-kits';
// const User = {}
import { timer } from 'rxjs';
import * as Animatable from 'react-native-animatable';
const ITEM_WIDTH = 150;
const ITEM_HEIGHT = 40;
class CoinTransactionAnimation {
  constructor() {
    this.transactionSequence = [];
    this.userCoin = null;
    this.rootView;
  }
  init = () => {
    const listener = $CENTER.subscribe({
      next: ({ type }) => {
        if (type === $TYPES.userMount) {
          this._initTransactionListener();
          listener.unsubscribe();
        }
      },
    });
  };
  _initTransactionListener = () => {
    $coinTransaction.subscribe(this._next);
  };
  _next = ({ transaction }) => {
    this.transactionSequence.push(parseInt(transaction, 10));
    if (this.userCoin === null) {
      this._getCurrentUserCoin();
      return;
    }
    this._renderComp();
  };
  _getCurrentUserCoin = async () => {
    const coin = User.userCoin();
    if (!coin) {
      return;
    }
    this.userCoin = coin;
    this._renderComp();
  };

  _renderComp = () => {
    if (this.rootView) {
      this._unsubsribeDestroy$();
      this._nextTransaction();
      return;
    }
    this.rootView = new RootSiblings(
      this._renderComponent(),
      this._fadeInAnimation(this._nextTransaction),
    );
  };
  _nextTransaction = () => {
    if (this.transactionSequence.length > 0) {
      this.userCoin = this.userCoin + this.transactionSequence[0];
      this._priceTag.toValue(this.userCoin, this._nextTransaction);
      this.transactionSequence.shift();
      return;
    }
    this.destroy$ = timer(1500).subscribe(this._fadeOutAnimation(this._detroy));
  };
  _unsubsribeDestroy$ = () => {
    if (!this.destroy$) {
      return;
    }
    this.destroy$.unsubscribe();
  };
  _detroy = () => {
    this.rootView && this.rootView.destroy();
    this.destroy$ = null;
    this.rootView = null;
  };
  _fadeOutAnimation = callback => () => {
    if (!this._view) {
      return;
    }
    this._view.animate('bounceOutLeft', 500, 0).then(callback);
  };
  _fadeInAnimation = callback => () => {
    if (!this._view) {
      return;
    }
    this._view.animate('bounceInLeft', 500, 0).then(callback);
  };
  _renderComponent = () => (
    <Touchable
      withoutFeedback={true}
      onPress={this._fadeOutAnimation(this._detroy)}
    >
      <Animatable.View
        ref={r => (this._view = r)}
        style={[styles.container, Styles.shadow]}
      >
        <PriceTag ref={r => (this._priceTag = r)} price={this.userCoin} />
      </Animatable.View>
    </Touchable>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: NAV_BAR_HEIGHT_FULL + 10,
    left: 20,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

const intance = new CoinTransactionAnimation();
export { intance as CoinTransactionAnimation };

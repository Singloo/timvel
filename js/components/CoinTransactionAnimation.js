import * as React from 'react';
import { StyleSheet } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { $coinTransaction } from '../utils/$observable';
import { base } from '../utils';
const { SCREEN_WIDTH, colors, Styles } = base;
import { PriceTag, Touchable } from '../../re-kits';
import { timer } from 'rxjs';
import * as Animatable from 'react-native-animatable';
const ITEM_WIDTH = 150;
const ITEM_HEIGHT = 40;
class CoinTransactionAnimation {
  constructor() {
    this.transactionSequence = [];
    this.userCoin = 0;
    this.rootView;
  }

  init = () => {
    $coinTransaction.subscribe({
      next: ({ transaction }) => {
        this.transactionSequence.push(parseInt(transaction, 10));
        this._renderComp();
      },
    });
  };
  _getCurrentUserCoin = () => {};

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
    this._view.animate('bounceOutUp', 500, 0).then(callback);
  };
  _fadeInAnimation = callback => () => {
    if (!this._view) {
      return;
    }
    this._view.animate('bounceInDown', 500, 0).then(callback);
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
    top: 20,
    left: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

export default new CoinTransactionAnimation();

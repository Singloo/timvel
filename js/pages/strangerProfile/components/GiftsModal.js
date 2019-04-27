import * as React from 'react';
import { StyleSheet, View, LayoutAnimation } from 'react-native';
import {
  Button,
  Text,
  createAnimatedModal,
  Image,
  createSelectableItem,
  Separator,
  PriceTag,
} from '../../../../re-kits';
import { colors, SCREEN_WIDTH, I18n, curried } from '../../../utils';
import { flowerPatterns, shitPatterns } from '../data/gifts';
const SelectableItem = createSelectableItem(Item);
const priceTag = {
  1: 100,
  2: 200,
};
class Card extends React.Component {
  state = {
    currentGift: null,
  };
  _onPressGift = key => {
    const { currentGift } = this.state;
    if (currentGift === key) {
      return;
    }
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity,
      ),
    );
    this.setState({
      currentGift: key,
    });
  };

  _onPressConfirm = () => {
    const { onPressConfirm, dismiss } = this.props;
    const { currentGift } = this.state;
    onPressConfirm(currentGift);
    dismiss();
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderTitle()}
        {this.renderGifts()}
        {this.renderButtons()}
      </View>
    );
  }
  renderTitle = () => {
    const { currentGift } = this.state;
    const isSelect = currentGift !== null;
    const price = parseInt(currentGift) > 100 ? 200 : 100;
    return (
      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <Text style={styles.mainText}>
          {!isSelect
            ? I18n.t('chooseGift') + ':'
            : I18n.t('giftWillCostsYou') + ':'}
        </Text>
        {isSelect && (
          <PriceTag price={price} style={{ marginLeft: 10, marginTop: 5 }} />
        )}
        <Separator style={{ marginTop: 10 }} />
      </View>
    );
  };
  renderGifts = () => {
    const { currentGift } = this.state;
    return (
      <View style={styles.giftContainer}>
        {Object.keys(flowerPatterns).map((key, index) => {
          const source = flowerPatterns[key];
          return (
            <SelectableItem
              key={'f' + index}
              source={source}
              style={{ margin: 5 }}
              onPress={curried(this._onPressGift)(key)}
              selected={currentGift === key}
            />
          );
        })}
        {Object.keys(shitPatterns).map((key, index) => {
          const source = shitPatterns[key];
          return (
            <SelectableItem
              key={'s' + index}
              source={source}
              style={{ margin: 5 }}
              onPress={curried(this._onPressGift)(key)}
              selected={currentGift === key}
            />
          );
        })}
      </View>
    );
  };
  renderButtons = () => {
    const { dismiss } = this.props;
    const { currentGift } = this.state;
    return (
      <View style={styles.buttonContainer}>
        <Button
          title={I18n.t('cancel')}
          onPress={dismiss}
          type={'mainBlank'}
          buttonStyle={{ width: (SCREEN_WIDTH - 60) / 2 }}
        />
        <Button
          title={I18n.t('confirm')}
          onPress={this._onPressConfirm}
          enable={currentGift !== null}
          buttonStyle={{ width: (SCREEN_WIDTH - 60) / 2 }}
        />
      </View>
    );
  };
}
Card.propTypes = {};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, width: SCREEN_WIDTH - 60 },
  giftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subText: { marginTop: 5, fontSize: 20, marginLeft: 20 },
});

function Item({ source }) {
  return (
    <Image
      source={source}
      style={{ width: 50, height: 50 }}
      resizeMode={'contain'}
    />
  );
}

export default createAnimatedModal(Card);

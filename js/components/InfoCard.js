/*
 * File: /Users/origami/Desktop/timvel/js/components/InfoCard.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday April 27th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday April 27th 2019 5:14:04 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image, Assets, Touchable } from '../../re-kits';
import { SCREEN_WIDTH, colors, colorSets, randomItem, I18n } from '../utils';
const item_height = 60;
const item_width = SCREEN_WIDTH;
const RED_DOT_SIZE = 24;
const mapDotContainerWidth = num => {
  const stringified = typeof num === 'number' ? num.toString() : num;
  return RED_DOT_SIZE + (stringified.length - 1) * 10;
};
class Card extends Component {
  constructor(props) {
    super(props);
    this.tintColor = randomItem(colorSets);
  }
  componentWillMount() {}

  render() {
    const { title, onPress, style, imgSource } = this.props;
    return (
      <Touchable style={[styles.container, style]} onPress={onPress}>
        {imgSource ? (
          <Image source={imgSource} size={'small'} />
        ) : (
          <View style={{ width: 24 }} />
        )}
        <Text style={styles.text}>{title}</Text>
        {this._renderRedDot()}
        <Image
          source={Assets.arrow_right.source}
          size={'verySmall'}
          tintColor={this.tintColor}
          resizeMode={'contain'}
        />
      </Touchable>
    );
  }
  _renderRedDot = () => {
    const { numOfMessage } = this.props;
    if (!numOfMessage || numOfMessage === 0) {
      return null;
    }
    return (
      <View
        style={[styles.redDot, { width: mapDotContainerWidth(numOfMessage) }]}
      >
        <Text style={styles.dotText}>{numOfMessage}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    height: item_height,
    width: item_width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 2,
    backgroundColor: colors.pureWhite,
  },
  text: {
    flex: 1,
    marginHorizontal: 20,
    fontSize: 14,
  },
  redDot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    borderRadius: RED_DOT_SIZE / 2,
    height: RED_DOT_SIZE,
    marginRight: 10,
  },
  dotText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Card;

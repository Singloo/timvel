import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image, Assets, Touchable } from '../../../../re-kits';
import {
  SCREEN_WIDTH,
  colors,
  colorSets,
  randomItem,
  I18n,
} from '../../../utils';
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
        <Image source={imgSource || Assets.bk3.source} size={'small'} />
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
Card.propTypes = {};

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

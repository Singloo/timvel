import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Image, Assets } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { SCREEN_WIDTH, colors } = base;

const item_width = SCREEN_WIDTH / 2;
const item_height = item_width * 1.2;
class ProductCard extends React.Component {
  componentWillMount() {}

  render() {
    const { product, onPressPurchase } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: product.imageUrl }}
          style={{ height: item_height, width: item_width }}
          resizeMode={'cover'}
        />
        <View style={styles.textContainer}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.depGrey }} numberOfLines={2}>
              {product.description}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={Assets.coin.source}
                size={'verySmall'}
                style={{ width: 18, height: 18 }}
              />
              <Text style={{ color: colors.redDep, marginLeft: 2 }}>
                {product.price}
              </Text>
            </View>
            <Text style={{ color: colors.mainDep }} onPress={onPressPurchase}>
              {'Purchase'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
ProductCard.propTypes = {};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'white',
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(250,250,250,0.8)',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default ProductCard;
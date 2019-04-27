import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Image, Assets, PriceTag } from '../../../../re-kits';
import { SCREEN_WIDTH, colors, I18n } from '../../../utils';
import ProductDetail from './RenderProduct';

const ITEM_WIDTH = SCREEN_WIDTH / 2;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;
class ProductCard extends React.Component {
  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        {this._renderProduct()}
        <View style={styles.textContainer}>
          {this._renderDescription()}
          {this._renderPurchase()}
        </View>
      </View>
    );
  }

  _renderProduct = () => {
    const { product } = this.props;
    return (
      <ProductDetail
        product={product}
        style={{ height: ITEM_HEIGHT, width: ITEM_WIDTH }}
      />
    );
  };
  _renderDescription = () => {
    const { product } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.depGrey, fontSize: 16 }}>
          {product.name}
        </Text>
        <Text style={{ color: colors.blueGrey, fontSize: 14 }}>
          {product.description}
        </Text>
      </View>
    );
  };
  _renderPurchase = () => {
    const { product, onPressPurchase } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}
      >
        <PriceTag
          price={product.price}
          imageStyle={{ width: 18, height: 18 }}
          textStyle={{ marginLeft: 5, fontSize: 16 }}
        />
        <Text style={{ color: colors.deepOrange }} onPress={onPressPurchase}>
          {'Purchase'}
        </Text>
      </View>
    );
  };
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

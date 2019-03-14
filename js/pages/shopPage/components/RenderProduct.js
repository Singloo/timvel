/*
 * File: /Users/origami/Desktop/timvel/js/pages/shopPage/components/RenderProduct.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday March 14th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday March 14th 2019 2:24:16 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Image, Assets, PriceTag } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
const { SCREEN_WIDTH, colors } = base;
import { Title } from '../../../components';
const ITEM_WIDTH = SCREEN_WIDTH / 2;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;
const RENDER_IMAGE = ['avatar', 'sticker', 'draw_lots'];
const RENDER_TITLE = ['draw_title', 'title'];
const RENDER_BLUR = ['one_time'];
class ProductCard extends React.Component {
  componentWillMount() {}

  render() {
    const { product } = this.props;
    if (RENDER_IMAGE.includes(product.productType)) {
      return this._renderImage();
    }
    if (RENDER_TITLE.includes(product.productType)) {
      return this._renderTitle();
    }
    if (RENDER_BLUR.includes(product.productType)) {
      return this._renderBlur();
    }
    return null;
  }
  _renderImage = () => {
    const { product, style } = this.props;
    return (
      <Image
        source={{ uri: product.imageUrl }}
        style={style}
        resizeMode={'cover'}
      />
    );
  };
  _renderTitle = () => {
    const { product, style } = this.props;
    return (
      <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
        <Title
          title={product.title}
          customStyle={{
            color: product.titleColor,
            borderColor: product.titleColor,
            fontSize: 25,
          }}
        />
      </View>
    );
  };
  _renderBlur = () => {
    const { style, product } = this.props;
    return (
      <View style={style}>
        <Image
          source={{ uri: product.imageUrl }}
          style={style}
          resizeMode={'cover'}
          blur={true}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export default ProductCard;

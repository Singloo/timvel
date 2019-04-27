/*
 * File: /Users/origami/Desktop/timvel/js/pages/shopPage/components/RenderProduct.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday March 14th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday April 27th 2019 6:31:05 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Image, Assets, PriceTag } from '../../../../re-kits';
import { SCREEN_WIDTH, colors, I18n } from '../../../utils';
import { Title } from '../../../components';
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
    return this._renderImage();
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
      <View style={[styles.titleContainer, style]}>
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
          blurAmount={20}
          blurType={'light'}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
});

export default ProductCard;

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Assets,
  BasicView,
} from '../../../re-kits';
import { base, User, curried } from '../../utils';
import ProductCard from './components/ProductCard';
import ConfirmPurchase from './pages/ConfirmPurchase';
const { PADDING_TOP, colors, PADDING_BOTTOM } = base;
const product_types = [
  'avatar',
  'draw_lots',
  'sticker',
  'one_time',
  'title',
  'draw_title',
];
class ShopPage extends Component {
  componentDidMount() {
    this._fetchProducts();
  }

  _fetchProducts = () => {
    this.props.dispatch('SHOP_PAGE_FETCH_PRODUCTS');
  };

  _openModal = () => {
    this.props.dispatch('SHOP_PAGE_SET_STATE', {
      showModal: true,
    });
  };

  _closeModal = () => {
    this.props.dispatch('SHOP_PAGE_SET_STATE', {
      showModal: false,
    });
  };

  _onPressRight = () => {
    this.props.navigation.navigate({
      routeName: 'publishProduct',
    });
  };

  _onPressPurchase = product => {
    if (!product_types.includes(product.productType)) {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        type: 'ERROR',
        content: 'Unknown product type.',
      });
      return;
    }
    this.props.dispatch('SHOP_PAGE_SET_STATE', {
      currentProduct: product,
    });
    this._confirmPurchaseModal.open();
  };
  _confirmPurchase = () => {
    const { currentProduct } = this.props.state;
    if (!product_types.includes(currentProduct.productType)) {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        type: 'ERROR',
        content: 'Unknown product type.',
      });
      return;
    }
    switch (currentProduct.productType) {
      case 'avatar':
        this._typeAvatar(currentProduct);
        break;
      case 'draw_lots':
        this._typeDrawLots(currentProduct);
        break;
      case 'sticker':
        this._typeSticker(currentProduct);
        break;
      case 'one_time':
        this._typeOnetime(currentProduct);
        break;
      case 'title':
        this._typeTitle(currentProduct);
        break;
      case 'draw_title':
        this._drawTitle(currentProduct);
        break;
      default:
        return;
    }
  };
  /**
   *
   *
   * @memberof ShopPage
   * change avatar
   */
  _typeAvatar = async product => {
    try {
      await User.updateAvatar(product.imageUrl);
      this.props.snakeBar('Avatar updated!');
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   *
   *
   * @memberof ShopPage
   * add data to database
   * then draw one manually
   */
  _typeDrawLots = product => {};

  /**
   *
   *
   * @memberof ShopPage
   * save to album
   */
  _typeSticker = product => {
    this.props.dispatch('SHOP_PAGE_SAVE_IMAGE_TO_ALBUM', {
      imageUrl: 'http://lc-uygandza.cn-n1.lcfile.com/00906d947703a0db1bcf.jpg',
    });
  };

  /**
   *
   *
   * @memberof ShopPage
   * show image one time
   */
  _typeOnetime = product => {};

  /**
   *
   *
   * @memberof ShopPage
   * buy a title
   */
  _typeTitle = product => {};

  /**
   *
   *
   * @memberof ShopPage
   * draw a title
   */
  _drawTitle = product => {};

  render() {
    const { products, isLoading, isError } = this.props.state;
    const renderProducts = products.map(this._renderItem);
    return (
      <View style={styles.container}>
        <BasicView
          isLoading={isLoading}
          isError={isError}
          onPressError={this._fetchProducts}
          style={styles.container}
        >
          <ScrollView
            style={{ flex: 1, backgroundColor: colors.lightGrey }}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: PADDING_TOP + 44,
              paddingBottom: PADDING_BOTTOM + 48,
              justifyContent: 'space-between',
            }}
          >
            {renderProducts}
          </ScrollView>
        </BasicView>
        <NavBar
          title={'Shop'}
          style={{ position: 'absolute', top: 0 }}
          sourceRight={Assets.add.source}
          onPressRight={this._onPressRight}
        />
        {this._renderConfrimPurchase()}
      </View>
    );
  }

  _renderItem = (item, index) => {
    return (
      <ProductCard
        key={index}
        product={item}
        onPressPurchase={curried(this._onPressPurchase)(item)}
      />
    );
  };
  _renderConfrimPurchase = () => {
    const { showModal, currentProduct } = this.props.state;
    return (
      <ConfirmPurchase
        ref={r => (this._confirmPurchaseModal = r)}
        show={showModal}
        openModal={this._openModal}
        closeModal={this._closeModal}
        currentProduct={currentProduct}
        onPressPurchase={this._confirmPurchase}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShopPage;

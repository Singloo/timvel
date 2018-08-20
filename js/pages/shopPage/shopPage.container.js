import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import { Button, NavBar, Image, InfiniteText, Assets } from '../../../re-kits';
import { base } from '../../utils';
import ProductCard from './components/ProductCard';
import ConfirmPurchase from './pages/ConfirmPurchase';
const { PADDING_TOP, colors, PADDING_BOTTOM } = base;
class ShopPage extends Component {
  static navigationOptions = {
    drawerLockMode: 'locked-closed',
  };

  componentWillMount() {}

  _openModal = () => {
    this.props.logic('SHOP_PAGE_SET_STATE', {
      showModal: true,
    });
  };

  _closeModal = () => {
    this.props.logic('SHOP_PAGE_SET_STATE', {
      showModal: false,
    });
  };

  _onPressRight = () => {
    this.props.logic('NAVIGATION_NAVIGATE', {
      routeName: 'chooseSex',
    });
  };

  render() {
    const { showModal } = this.props.state;
    const renderProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
      return (
        <ProductCard
          key={index}
          onPressPurchase={() => {
            this._confirmPurchase.open();
          }}
        />
      );
    });
    return (
      <View style={styles.container}>
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
          {renderProduct}
        </ScrollView>
        <NavBar
          title={'Shop'}
          style={{ position: 'absolute', top: 0 }}
          sourceRight={Assets.sunny.source}
          onPressRight={this._onPressRight}
        />
        <ConfirmPurchase
          ref={r => (this._confirmPurchase = r)}
          show={showModal}
          openModal={this._openModal}
          closeModal={this._closeModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default ShopPage;

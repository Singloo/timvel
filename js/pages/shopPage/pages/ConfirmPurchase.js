import * as React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Text, Image, Assets, PriceTag } from '../../../../re-kits';
import { base, I18n, invoke } from '../../../utils';
import ProductDetail from '../components/RenderProduct';
const { SCREEN_WIDTH, colors, Styles } = base;

const CONTAINER_WIDTH = SCREEN_WIDTH - 80;
const CONTAINER_BORDER_RADIUS = 12;
const getTypeDescription = type => {
  switch (type) {
    case 'avatar':
      return 'This product will replace your avatar';
    case 'draw_lots':
      return 'A random buyer will get this product';
    case 'sticker':
      return 'This sticker will save to you photo album';
    case 'one_time':
      return 'After pay, you will be enabled to see the image';
    case 'title':
      return 'Buy a title';
    case 'draw_title':
      return 'Get a random title';
    default:
      return '';
  }
};
class ConfirmPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.animationState = new Animated.Value(0);
    this.animationStart = Animated.spring(this.animationState, {
      toValue: 1,
      useNativeDriver: true,
      speed: 5,
    });
    this.animationStop = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  open = () => {
    const { openModal, show } = this.props;
    if (show) {
      return;
    }
    openModal();
    this.animationStart.start();
  };

  close = () => {
    const { closeModal, show } = this.props;
    if (!show) {
      return;
    }
    this.animationStart.stop();
    this.animationStop.start(() => {
      closeModal();
    });
  };

  render() {
    const { show, onPressPurchase, currentProduct } = this.props;
    if (!show) {
      return null;
    }
    const scale = this.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [0.02, 1],
    });
    const transform = [{ scale }];
    return (
      <View
        style={[
          Styles.absolute,
          Styles.center,
          { backgroundColor: 'rgba(33,33,33,0.3)' },
        ]}
      >
        <Animated.View
          style={[
            styles.container,
            Styles.shadow,
            {
              transform,
            },
          ]}
        >
          {this._renderTitle()}
          {this._renderProduct()}
          {this._renderBottomBar()}
        </Animated.View>
        <Image
          source={Assets.close.source}
          onPress={this.close}
          size={'regular'}
          tintColor={colors.white}
          style={{}}
        />
      </View>
    );
  }
  _renderTitle = () => {
    const { currentProduct } = this.props;
    return (
      <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
        <Text style={styles.title}>{'You are going to buy'}</Text>
        <Text style={{ fontSize: 14, marginTop: 5, marginLeft: 10 }}>
          {'*' + getTypeDescription(currentProduct.productType)}
        </Text>
      </View>
    );
  };
  _renderProduct = () => {
    const { currentProduct } = this.props;

    return (
      <ProductDetail
        product={currentProduct}
        style={{ width: CONTAINER_WIDTH, height: CONTAINER_WIDTH }}
      />
    );
  };
  _renderBottomBar = () => {
    const { currentProduct, onPressPurchase, closeModal } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <PriceTag
          price={currentProduct.price}
          textStyle={{ fontSize: 20 }}
          imageStyle={{ width: 25, height: 25 }}
        />
        <Button
          title={'Purchase'}
          onPress={invoke(closeModal, onPressPurchase)}
          size={'small'}
          textStyle={{ fontWeight: 'bold' }}
          buttonStyle={styles.purchaseButton}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    borderRadius: CONTAINER_BORDER_RADIUS,
    backgroundColor: colors.white,
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.pureBlack,
  },
  purchaseButton: {
    backgroundColor: colors.deepOrange,
    borderBottomRightRadius: CONTAINER_BORDER_RADIUS,
    borderTopLeftRadius: CONTAINER_BORDER_RADIUS,
    height: 40,
  },
});

export default ConfirmPurchase;

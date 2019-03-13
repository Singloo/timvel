import * as React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Text, Image, Assets, PriceTag } from '../../../../re-kits';
import { base, I18n, invoke } from '../../../utils';
const { SCREEN_WIDTH, colors, Styles } = base;

const CONTAINER_WIDTH = SCREEN_WIDTH - 80;
const CONTAINER_BORDER_RADIUS = 12;
class ConfirmPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.animationState = new Animated.Value(0);
    this.animationStart = Animated.spring(this.animationState, {
      toValue: 1,
      useNativeDriver: true,
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
          style={{ position: 'absolute', bottom: 120 }}
        />
      </View>
    );
  }
  _renderTitle = () => {
    return (
      <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
        <Text style={styles.title}>{'You are going to buy'}</Text>
      </View>
    );
  };
  _renderProduct = () => {
    const { renderProduct, currentProduct } = this.props;

    return (
      <Image
        uri={currentProduct.imageUrl}
        style={{ width: CONTAINER_WIDTH, height: CONTAINER_WIDTH }}
        resizeMode={'cover'}
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
    marginBottom: 80,
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

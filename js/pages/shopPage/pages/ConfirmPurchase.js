import * as React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Text, Image, Assets } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { SCREEN_WIDTH, colors, Styles } = base;

const container_width = SCREEN_WIDTH - 80;
const container_border_radius = 12;
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

  open() {
    const { openModal, show } = this.props;
    if (show) {
      return;
    }
    openModal();
    this.animationStart.start();
  }

  close() {
    const { closeModal, show } = this.props;
    if (!show) {
      return;
    }
    this.animationStart.stop();
    this.animationStop.start(() => {
      closeModal();
    });
  }

  render() {
    const { show } = this.props;
    if (!show) {
      return null;
    }
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
              transform: [
                {
                  scale: this.animationState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.02, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View>
            <Text>{'You are going to buy'}</Text>
          </View>

          <Image
            source={Assets.bk3.source}
            style={{ width: container_width, height: container_width }}
            resizeMode={'contain'}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={Assets.coin.source}
                size={'verySmall'}
                style={{ width: 18, height: 18 }}
              />
              <Text style={{ color: colors.redDep, marginLeft: 2 }}>
                {'10'}
              </Text>
            </View>
            <Button title={'Purchase'} onPress={() => {}} size={'small'} />
          </View>
        </Animated.View>
        <Image
          source={Assets.close.source}
          onPress={() => {
            this.close();
          }}
          size={'regular'}
          tintColor={colors.white}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: container_width,
    borderRadius: container_border_radius,
    backgroundColor: colors.white,
  },
});

export default ConfirmPurchase;

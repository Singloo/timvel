import * as React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
  Button,
  Text,
  NAV_BAR_HEIGHT_FULL,
  PADDING_TOP_FULL,
} from '../../../../re-kits';
import { colors, SCREEN_WIDTH, DateFormatter, I18n } from '../../../utils';
// const item_width = SCREEN_WIDTH - 40 - 0;
const item_height = SCREEN_WIDTH * 0.5;
const scroll_height = item_height + 35 + 20 - NAV_BAR_HEIGHT_FULL;
class HeaderBar extends React.PureComponent {
  render() {
    return (
      <View style={[styles.container, styles.alignRowCenter]}>
        {this._renderBK()}
        {this._renderTitle()}
      </View>
    );
  }

  _renderBK = () => {
    const translateY = this.props.scrollY.interpolate({
      inputRange: [0, scroll_height],
      outputRange: [-NAV_BAR_HEIGHT_FULL, 0],
      extrapolate: 'clamp',
    });
    const transform = [{ translateY }];
    return (
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: 'rgba(250,250,250,0.8)' },
          { transform },
        ]}
      />
    );
  };
  _renderTitle = () => {
    const { date } = this.props;
    const _date = new DateFormatter(date);
    const translateY = this.props.scrollY.interpolate({
      inputRange: [-150, 0],
      outputRange: [-NAV_BAR_HEIGHT_FULL, 0],
      extrapolate: 'clamp',
    });
    const transform = [{ translateY }];
    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          transform,
        }}
      >
        <Text style={[styles.text, { fontWeight: '300' }]}>{_date.year}</Text>
        <Text style={[styles.text, { fontSize: 20 }]}>{_date.mon}</Text>
        <Text style={[styles.text, { fontSize: 20 }]}>{_date.day}</Text>
      </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP_FULL,
    height: NAV_BAR_HEIGHT_FULL,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  alignRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '200',
    fontSize: 25,
    marginHorizontal: 2,
    alignSelf: 'flex-end',
    color: colors.midGrey,
  },
});

export default HeaderBar;

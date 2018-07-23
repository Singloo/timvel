import React, { Component } from 'react';
import { StyleSheet, View,Animated } from 'react-native';
import { Button, Text } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const {
  PADDING_TOP,
  NAV_BAR_HEIGHT,
  colors,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} = base;
import Moment from 'moment';
Moment.locale();
const item_width = SCREEN_WIDTH - 40 - 0;
const item_height = SCREEN_WIDTH * 0.5;
const scroll_height = item_height + 35 + 20 - NAV_BAR_HEIGHT;
class HeaderBar extends Component {
  componentWillMount() {}

  render() {
    const { date, scrollY } = this.props;
    let fixed = Moment(date);
    let color = scrollY.interpolate({
      inputRange: [scroll_height - 1, scroll_height],
      outputRange: [colors.depGrey, colors.white],
      extrapolate: 'clamp',
    });
    let backgroundColor = scrollY.interpolate({
      inputRange: [scroll_height, scroll_height + NAV_BAR_HEIGHT],
      outputRange: ['rgba(33,33,33,0)', 'rgba(33,33,33,0.5)'],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[styles.container, { backgroundColor: backgroundColor }]}
      >
        <View style={{ flexDirection: 'row' }}>
          <Animated.Text
            style={[styles.text, { fontWeight: '300', color: color }]}
          >
            {'Year ' + fixed.format('YYYY')}
          </Animated.Text>
          <Animated.Text style={[styles.text, { fontSize: 20, color: color }]}>
            {fixed.format('MMM')}
          </Animated.Text>
          <Animated.Text style={[styles.text, { fontSize: 20, color: color }]}>
            {fixed.format('DD')}
          </Animated.Text>
        </View>
      </Animated.View>
    );
  }
}
HeaderBar.propTypes = {};

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
    height: NAV_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(33,33,33,0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  text: {
    color: colors.white,
    fontWeight: '200',
    fontSize: 25,
    marginHorizontal: 2,
    alignSelf: 'flex-end',
  },
});

export default HeaderBar;

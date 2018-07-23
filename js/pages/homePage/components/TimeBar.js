import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
const { colors } = base;
class TimeBar extends Component {
  componentWillMount() {}

  render() {
    const { style, showNext } = this.props;
    let gradientColors = [colors.main, 'rgba(229,115,115,0.3)'];
    return (
      <View style={[styles.bottomBar, style]}>
        <View style={styles.container}>
          {showNext && <View style={{ width: 55 }} />}
          <LinearGradient
            style={{ width: 2, height: 80, borderRadius: 2 }}
            colors={gradientColors}
          />
          {showNext && (
            <Text style={{ marginLeft: 10, width: 55 }}>{'Next ...'}</Text>
          )}
        </View>
        <View
          style={[
            styles.container,
            { alignItems: 'flex-end', marginBottom: 5 },
          ]}
        >
          <Text style={{ fontSize: 25, fontWeight: '200' }}>
            {I18n.t('happenedAt')}
          </Text>
          <Text style={[styles.timeLabel, { marginBottom: 2 }]}>
            {'2018-3-16 17:12:2'}
          </Text>
        </View>
      </View>
    );
  }
}
TimeBar.propTypes = {};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 16,
    color: colors.depGrey,
    fontWeight: '100',
    letterSpacing: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimeBar;

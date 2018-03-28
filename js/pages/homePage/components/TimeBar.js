import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
class TimeBar extends Component {
  componentWillMount() {}

  render() {
    const { style } = this.props;
    return (
      <View style={[styles.bottomBar, style]}>
        <LinearGradient
          colors={['rgba(33,33,33,0)', 'rgba(33,33,33,0.6)']}
          locations={[0.2, 1]}
          style={styles.absoluteBK}
        />
        <Text
          style={[
            styles.timeLabel,
            { fontSize: 25, marginRight: 5, fontWeight: '300' },
          ]}
        >
          {'From:'}
        </Text>
        <Text style={[styles.timeLabel, { marginBottom: 2 }]}>
          {'2018-3-16 17:12:2'}
        </Text>
      </View>
    );
  }
}
TimeBar.propTypes = {};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 16,
    color: base.colors.white,
    fontWeight: '100',
    letterSpacing: 1,
  },
});

export default TimeBar;

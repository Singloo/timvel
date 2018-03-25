import React, { Component } from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
// import { Button, Icon } from '../../../components';
import { Button, Icon, Text } from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';

class Tab extends Component {
  componentWillMount() {}

  render() {
    const { onPress, uri, tintColor, title, size, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Icon uri={uri} tintColor={tintColor} size={size} onPress={onPress} />
        {title && (
          <Text style={[styles.title, { color: tintColor }]}>{title}</Text>
        )}
      </View>
    );
  }
}
Tab.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  title: {
    fontSize: 12,
    fontWeight: '100',
    // color: base.colors.midGrey,
    letterSpacing: 1,
    marginTop: 2,
  },
});

export default Tab;

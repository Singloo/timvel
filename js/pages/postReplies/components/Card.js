import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
const { colors } = base;
class Card extends Component {
  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        {this._renderInfo()}
        {this._renderContent()}
      </View>
    );
  }

  _renderInfo = () => {
    return (
      <View style={[styles.rowCenter, { paddingLeft: 15 }]}>
        <Image
          uri={'http://ac-uygandza.clouddn.com/a4684c0517db67db0d59.jpg'}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.lightGrey,
          }}
        />
        <Text style={{ fontSize: 14, color: colors.midGrey, marginLeft: 15 }}>
          {'aaaa'}
        </Text>
        <Text>

        </Text>
      </View>
    );
  };
  _renderContent = () => {
    return (
      <View
        style={{
          paddingLeft: 15 + 40 + 15,
          marginTop: 10,
          paddingRight: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>{'a'}</Text>
      </View>
    );
  };
}
Card.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 2,
    paddingVertical: 5,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Card;

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Image, InfiniteText, Assets } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { colors } = base;
class Card extends Component {
  componentWillMount() {}

  render() {
    const { index } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Image source={Assets.bk2.source} size={'regular'} isRound={true} />
          <InfiniteText text={'origami'} style={{ marginHorizontal: 10 }} />
          <Text style={styles.subText}>{index}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>
            {'do not go gentle into that good night'}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.subText}>{'2018-20-12'}</Text>
        </View>
      </View>
    );
  }
}
Card.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    marginVertical: 5,
    paddingVertical: 5,
  },
  headContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  content: {
    color: colors.pureBlack,
    fontWeight: '200',
  },
  contentContainer: {
    paddingLeft: 10 + 40,
  },
  bottomContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  subText: {
    fontSize: 14,
  },
});

export default Card;

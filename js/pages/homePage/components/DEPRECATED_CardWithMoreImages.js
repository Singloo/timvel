import React, { Component } from 'react';
import { StyleSheet, View, Image as Image2 } from 'react-native';
import { Button, Text, Assets, Image } from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper';
const { Styles, SCREEN_WIDTH } = base;
const cardWidth = SCREEN_WIDTH - 20 - 20;
class CardWithoutImg extends Component {
  componentWillMount() {}

  _renderItem = ({item, index}) => {
    return (
      <View key={index} style={{ flex: 1, overflow: 'hidden' }}>
        <Image2
          source={item}
          style={{ width: SCREEN_WIDTH }}
          resizeMode={'contain'}
        />
      </View>
    );
  };
  render() {
    const { post } = this.props;
    const data = [Assets.bk1.source, Assets.bk2.source, Assets.bk3.source];
    return (
      <View style={styles.container}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={cardWidth}
          itemWidth={cardWidth}
        />
        {/* <Swiper style={{ flex: 1 }} showsPagination={false} autoplay={false}>
          {data.map(this._renderItem)}
        </Swiper> */}
      </View>
    );
  }
}
CardWithoutImg.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CardWithoutImg;

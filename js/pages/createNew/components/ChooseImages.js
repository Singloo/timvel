import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Image, Assets } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
const { realSize, colors, Styles } = base;
class ChooseImages extends Component {
  componentWillMount() {}

  render() {
    const { pickedImages } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ paddingLeft: 10 }}
        >
          {this._renderAddImage()}
          {pickedImages.map(this._renderSelectedImage)}
          <View style={{ width: 20, backgroundColor: 'transparent' }} />
        </ScrollView>
      </View>
    );
  }
  _renderAddImage = () => {
    const { onPressChooseImages } = this.props;
    return (
      <View style={[styles.image, Styles.center]}>
        <Image
          source={Assets.add.source}
          style={{ width: realSize(100), height: realSize(100) }}
          tintColor={colors.midGrey}
          onPress={onPressChooseImages}
        />
        {this._renderChooseRandomImage()}
      </View>
    );
  };

  _renderChooseRandomImage = () => {
    const { onPressGetRandomImage } = this.props;
    return (
      <Image
        source={Assets.touzi.source}
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
          width: 25,
          height: 25,
        }}
        tintColor={colors.main}
        onPress={onPressGetRandomImage}
        resizeMode={'contain'}
      />
    );
  };

  _renderSelectedImage = (item, index) => {
    const { onPressDeleteImage } = this.props;
    const isUnsplash = item.type === 'unsplash';
    return (
      <View style={styles.image} key={index}>
        <Image
          uri={isUnsplash ? item.imageUrl : item.path}
          style={{ width: realSize(120), height: realSize(120) }}
        />
        <View style={{ position: 'absolute', right: 5, top: 5 }}>
          <Image
            source={Assets.close.source}
            size={'verySmall'}
            onPress={onPressDeleteImage(item)}
          />
        </View>
      </View>
    );
  };
}
ChooseImages.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  image: {
    width: realSize(120),
    height: realSize(120),
    marginLeft: 5,
    borderWidth: 1,
    borderColor: colors.midGrey,
    marginVertical: 10,
  },
});

export default ChooseImages;

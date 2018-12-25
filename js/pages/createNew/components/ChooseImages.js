import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Touchable, Image, Assets } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
const { realSize, colors, Styles } = base;
const TOUZI_SIZE = 50;
class ChooseImages extends React.PureComponent {
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
          style={{ width: 40, height: 40 }}
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
      <Touchable onPress={onPressGetRandomImage} style={styles.touziContainer}>
        <Image
          source={Assets.touzi.source}
          style={{
            width: 25,
            height: 25,
          }}
          tintColor={colors.white}
          resizeMode={'contain'}
        />
      </Touchable>
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
            onPress={onPressDeleteImage(index)}
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
    overflow: 'hidden',
  },
  touziContainer: {
    position: 'absolute',
    right: -TOUZI_SIZE / 3,
    top: -TOUZI_SIZE / 3,
    width: TOUZI_SIZE,
    height: TOUZI_SIZE,
    borderRadius: TOUZI_SIZE,
    paddingTop: TOUZI_SIZE / 4,
    paddingRight: TOUZI_SIZE / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main,
  },
});

export default ChooseImages;

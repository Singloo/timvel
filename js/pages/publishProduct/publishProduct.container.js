import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import {
  NavBar,
  Image,
  Text,
  Assets,
  Tag,
  MultiLinesTextInput,
  withKeyboardListener,
} from '../../../re-kits';
import ImagePicker from 'react-native-image-crop-picker';
import InputWithTitle from './components/InputWithTitle';
import CustomTitle from './components/CustomTitle';
import { colors, isAndroid, lenOfText, curried, I18n } from '../../utils';
const product_types = [
  'avatar',
  'draw_lots',
  'sticker',
  'one_time',
  'title',
  'draw_title',
];
const available_product_types = ['avatar', 'sticker', 'title', 'one_time'];
const mapTypeToTitle = type => {
  switch (type) {
    case 'avatar':
      return I18n.t('productAvatar');
    case 'sticker':
      return I18n.t('productSticker');
    case 'title':
      return I18n.t('productTitle');
    case 'one_time':
      return I18n.t('productOneTime');
    default:
      return '';
  }
};
class Sample extends Component {
  constructor(props) {
    super(props);
    this._scrollView;
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {
    this.props.dispatch('PUBLISH_PRODUCT_RESET_STATE');
  }
  _onPressKey = ({ nativeEvent }) => {
    if (nativeEvent.key == 'Enter') {
      this._scrollToEnd();
    }
  };
  _scrollToEnd = () => {
    this._scrollView && this._scrollView.getNode().scrollToEnd();
  };
  _goBack = () => {
    this.props.navigation.goBack();
  };

  _onChangeText = (type, limit = null) => value => {
    let _value = value;
    if (limit) {
      if (lenOfText(_value) > parseInt(limit, 10)) {
        return;
      }
    }
    if (type === 'customTitle') {
      _value = _value.trim();
    }
    this.props.dispatch('PUBLISH_PRODUCT_SET_STATE', {
      [type]: _value,
    });
  };
  _checkPrice = price => {
    if (isNaN(parseInt(price, 10))) {
      return true;
    }
    return false;
  };
  _onPressTag = type => {
    const { productType } = this.props.state;
    if (type === 'title' || productType === 'title') {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          300,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity,
        ),
      );
    }
    if (type !== 'title' && productType === 'title') {
      this.props.dispatch('PUBLISH_PRODUCT_SET_STATE', {
        customTitle: '',
      });
    }
    this.props.dispatch('PUBLISH_PRODUCT_SET_STATE', {
      productType: type,
    });
  };

  _onPressCoverImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
      });
      this.props.dispatch('PUBLISH_PRODUCT_SET_STATE', {
        coverImage: image,
      });
    } catch (error) {
      console.warn(error.message);
    }
  };
  _onPressSend = () => {
    const {
      title,
      price,
      description,
      productType,
      coverImage,
      confirmedCustomTitle,
    } = this.props.state;
    this.props.dispatch('PUBLISH_PRODUCT_PUBLISH_PRODUCT', {
      title: title.trim(),
      price: price.trim(),
      description: description.trim(),
      productType,
      imagePath: coverImage.path,
      confirmedCustomTitle,
    });
  };
  _onPressConfirmTitle = ({ title, color }) => {
    this.props.dispatch('PUBLISH_PRODUCT_SET_STATE', {
      confirmedCustomTitle: {
        title,
        color,
      },
    });
  };
  render() {
    const {
      title,
      price,
      description,
      productType,
      coverImage,
      confirmedCustomTitle,
    } = this.props.state;
    // const { keyboardHeight } = this.props;
    let ableToSend =
      title.length > 0 &&
      price.length > 0 &&
      !!coverImage &&
      productType.length > 0;
    const chooseTitle = productType === 'title';
    if (chooseTitle) {
      ableToSend =
        ableToSend && !!confirmedCustomTitle.color && description.length > 0;
    }
    return (
      <View style={styles.container}>
        <NavBar
          title={I18n.t('publishProduct')}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          sourceRight={Assets.send.source}
          rightIconStyle={{}}
          rightTint={ableToSend ? colors.main : colors.depGrey}
          onPressRight={ableToSend ? this._onPressSend : undefined}
        />
        <Animated.ScrollView
          ref={r => (this._scrollView = r)}
          style={{
            flex: 1,
            backgroundColor: colors.pureWhite,
            // paddingBottom: keyboardHeight,
          }}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          <InputWithTitle
            title={I18n.t('title')}
            onChangeText={this._onChangeText('title')}
            value={title}
          />
          <InputWithTitle
            title={I18n.t('price')}
            onChangeText={this._onChangeText('price')}
            value={price}
            errorHandler={this._checkPrice}
            textInputProps={{
              keyboardType: 'number-pad',
            }}
            errorMessage={I18n.t('priceFormatWrong')}
          />
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.text}>{I18n.t('productType')}</Text>
            <View style={styles.tagContainer}>
              {available_product_types.map(this._renderProductType)}
            </View>
          </View>
          {this._renderCustomTitle(chooseTitle)}
          {this._renderChooseCover()}
          {this._renderDescription(chooseTitle)}
        </Animated.ScrollView>
      </View>
    );
  }

  _renderProductType = (item, index) => {
    const { productType } = this.props.state;
    return (
      <Tag
        key={index}
        title={mapTypeToTitle(item)}
        selectedStyle={{ borderColor: colors.main }}
        selectedTextStyle={{ color: colors.main }}
        style={{ marginHorizontal: 4, marginVertical: 4 }}
        isSelected={item === productType}
        onPress={curried(this._onPressTag)(item)}
      />
    );
  };
  _renderCustomTitle = chooseTitle => {
    if (!chooseTitle) {
      return null;
    }
    const { customTitle } = this.props.state;
    return (
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.text}>{I18n.t('customizeTitle')}</Text>
        <CustomTitle
          onChangeText={this._onChangeText('customTitle', 8)}
          value={customTitle}
          onPressConfirm={this._onPressConfirmTitle}
        />
      </View>
    );
  };

  _renderChooseCover = () => {
    const { coverImage } = this.props.state;
    return (
      <View style={{ marginVertical: 5, alignItems: 'flex-start' }}>
        <Text style={styles.text}>{I18n.t('cover')}</Text>
        <Image
          source={coverImage ? { uri: coverImage.path } : Assets.add.source}
          onPress={this._onPressCoverImage}
          style={coverImage ? { width: 150, height: 150 } : styles.coverImage}
          containerStyle={styles.coverImageContainer}
        />
      </View>
    );
  };

  _renderDescription = chooseTitle => {
    const { description } = this.props.state;
    return (
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.text}>
          {`${I18n.t('description')} ` +
            (chooseTitle
              ? `(${I18n.t('mandatory')})`
              : `(${I18n.t('optional')})`)}
        </Text>
        <MultiLinesTextInput
          value={description}
          onChangeText={this._onChangeText('description')}
          onFocus={() => {
            setTimeout(this._scrollToEnd, 400);
          }}
          onKeyPress={this._onPressKey}
          style={styles.description}
        />
      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pureWhite,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  text: {
    color: colors.depGrey,
    fontSize: 18,
    fontWeight: '200',
    marginLeft: 15,
  },
  coverImage: {
    // backgroundColor: 'red',
  },
  description: {
    backgroundColor: colors.lightGrey,
    marginTop: 5,
    padding: 15,
    fontSize: 16,
  },
  coverImageContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: colors.midGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 5,
  },
});
export default Sample;
// export default withKeyboardListener(Sample);

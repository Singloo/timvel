import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  BaseTextInput,
  Tag,
  MultiLinesTextInput,
} from '../../../re-kits';
import ImagePicker from 'react-native-image-crop-picker';
import InputWithTitle from './components/InputWithTitle';
import CustomTitle from './components/CustomTitle';
import { base, I18n } from '../../utils';
const { colors, isAndroid, lenOfText } = base;
const product_types = [
  'avatar',
  'draw_lots',
  'sticker',
  'one_time',
  'title',
  'draw_title',
];
class Sample extends Component {
  constructor(props) {
    super(props);
    this._scrollView;
    this.keyboardHeight = new Animated.Value(0);
  }
  componentWillMount() {}
  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
    if (isAndroid) {
      this.keyboardDidShowSub = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardDidShow,
      );
      this.keyboardDidHideSub = Keyboard.addListener(
        'keyboardDidHid',
        this.keyboardDidHide,
      );
    }
  }
  keyboardWillShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: event.endCoordinates.height,
    }).start();
  };
  keyboardDidShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 200,
      toValue: event.endCoordinates.height,
    }).start();
  };
  keyboardWillHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: 0,
    }).start(this._scrollToEnd);
  };
  keyboardDidHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 200,
      toValue: 0,
    }).start(this._scrollToEnd);
  };
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

  _onChangeText = (type, value, limit = null) => {
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
      coverImage,
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
      keyboardDidShow,
      customTitle,
      confirmedCustomTitle,
    } = this.props.state;
    let ableToSend =
      title.length > 0 &&
      price.length > 0 &&
      !!coverImage.path &&
      productType.length > 0;
    let chooseTitle = productType === 'title';
    if (chooseTitle) {
      ableToSend =
        ableToSend && !!confirmedCustomTitle.color && description.length > 0;
    }
    const renderTypes = product_types.map((item, index) => {
      return (
        <Tag
          key={index}
          title={item}
          selectedStyle={{ borderColor: colors.main }}
          selectedTextStyle={{ color: colors.main }}
          style={{ marginHorizontal: 4, marginVertical: 4 }}
          isSelected={item === productType}
          onPress={() => {
            this._onPressTag(item);
          }}
        />
      );
    });
    return (
      <View style={styles.container}>
        <NavBar
          title={'Publish Product'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          sourceRight={Assets.send.source}
          rightIconStyle={{}}
          rightTint={ableToSend ? colors.main : colors.depGrey}
          onPressRight={ableToSend ? this._onPressSend : () => {}}
        />
        <Animated.ScrollView
          ref={r => (this._scrollView = r)}
          style={{
            flex: 1,
            backgroundColor: colors.pureWhite,
            marginBottom: this.keyboardHeight,
          }}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          <InputWithTitle
            title={'title'}
            onChangeText={this._onChangeText}
            value={title}
          />
          <InputWithTitle
            title={'price'}
            onChangeText={this._onChangeText}
            value={price}
            errorHandler={this._checkPrice}
            textInputProps={{
              keyboardType: 'number-pad',
            }}
            errorMessage={'Price format is wrong'}
          />
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.text}>{'Product type'}</Text>
            <View style={styles.tagContainer}>{renderTypes}</View>
          </View>
          {chooseTitle && (
            <View style={{ marginVertical: 5 }}>
              <Text style={styles.text}>{'Custom your title'}</Text>
              <CustomTitle
                onChangeText={this._onChangeText}
                value={customTitle}
                onPressConfirm={this._onPressConfirmTitle}
              />
            </View>
          )}
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.text}>{'Cover'}</Text>
            <Image
              source={
                coverImage.path ? { uri: coverImage.path } : Assets.add.source
              }
              onPress={this._onPressCoverImage}
              style={styles.coverImage}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.text}>
              {'Description ' + (chooseTitle ? '(needed)' : '(optional)')}
            </Text>
            <MultiLinesTextInput
              value={description}
              onChangeText={value => {
                this._onChangeText('description', value);
              }}
              onFocus={() => {
                setTimeout(this._scrollToEnd, 400);
              }}
              onKeyPress={this._onPressKey}
              style={styles.description}
            />
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}
Sample.propTypes = {};
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
    borderWidth: 1,
    borderColor: colors.midGrey,
    width: 150,
    height: 150,
    marginLeft: 15,
    marginTop: 5,
  },
  description: {
    backgroundColor: colors.lightGrey,
    marginTop: 5,
    padding: 15,
    fontSize: 16,
  },
});

export default Sample;

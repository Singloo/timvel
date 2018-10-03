import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Animated, Keyboard } from 'react-native';
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
import { base, I18n } from '../../utils';
const { colors, isAndroid } = base;
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
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  _onChangeText = (type, value) => {
    this.props.logic('PUBLISH_PRODUCT_SET_STATE', {
      [type]: value,
    });
  };
  _checkPrice = price => {
    if (isNaN(parseInt(price, 10))) {
      return true;
    }
    return false;
  };
  _onPressTag = type => {
    this.props.logic('PUBLISH_PRODUCT_SET_STATE', {
      productType: type,
    });
  };

  _onPressCoverImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
      });
      this.props.logic('PUBLISH_PRODUCT_SET_STATE', {
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
    } = this.props.state;
    this.props.logic('PUBLISH_PRODUCT_PUBLISH_PRODUCT', {
      title,
      price,
      description,
      productType,
      coverImage,
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
    } = this.props.state;
    let ableToSend =
      title.length > 0 &&
      price.length > 0 &&
      coverImage.path &&
      productType.length > 0;
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
            errorMessage={'Price format is wrong'}
          />
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.text}>{'Product type'}</Text>
            <View style={styles.tagContainer}>{renderTypes}</View>
          </View>
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
            <Text style={styles.text}>{'Description (optional)'}</Text>
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

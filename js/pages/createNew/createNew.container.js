import React, { Component } from 'react';
import { StyleSheet, View, Animated, Keyboard, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  MultiLinesTextInput,
} from '../../../re-kits';
import ImagePicker from 'react-native-image-crop-picker';
import Moment from 'moment';
import _ from 'lodash';
import ChooseDate from './components/ChooseDate';
import ChooseImages from './components/ChooseImages';
import ChooseTags from './components/ChooseTags';
import ChooseWeather from './components/ChooseWeather';
// import AddTag from './components/AddTag';
import AddTag from '../addTag/addTag.connect';
import { base, I18n, User } from '../../utils';
const { colors, Styles, isIOS } = base;

class CreateNew extends Component {
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
  }
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  componentDidMount() {
    this._getWeather();
  }
  componentWillUnmount() {
    this.props.logic('CREATE_NEW_RESET_STATE');
  }
  keyboardWillShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: event.endCoordinates.height,
    }).start(() => {
      this._scrollView && this._scrollView.getNode().scrollToEnd();
    });
  };

  keyboardWillHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: 0,
    }).start(() => {
      this._scrollView && this._scrollView.getNode().scrollToEnd();
    });
  };

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  _onChangeDate = date => {
    this._chooseDate.onChangeAnimation();
    this.props.logic('CREATE_NEW_SET_STATE', {
      date: date,
    });
  };

  _onPressChooseImages = () => {
    const { images } = this.props.state;
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: Math.min(8 - images.length, 5),
    }).then(imgs => {
      if (images.length + imgs.length > 8) {
        this.props.logic('SHOW_SNAKE_BAR', {
          type: 'ERROR',
          content: 'Number of images at most 8',
        });
        return;
      }
      this.props.logic('CREATE_NEW_SET_STATE', {
        images: [].concat(images, imgs),
      });
    });
  };

  _onPressDeleteImage = item => {
    const { images } = this.props.state;
    const newArr = _.remove(images, o => {
      return o.path !== item.path;
    });
    this.props.logic('CREATE_NEW_SET_STATE', {
      images: newArr,
    });
  };
  _onChangeText = text => {
    this.props.logic('CREATE_NEW_SET_STATE', {
      content: text,
    });
  };

  _onPressAddTag = () => {
    this._addTag && this._addTag.getWrappedInstance().open();
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  _onPressSend = () => {
    const { images, content, weatherInfo, date } = this.props.state;
    this.props.logic('CREATE_NEW_SEND_POST', {
      images,
      content,
      weatherInfo,
      tag: '开发',
      date,
    });
  };
  // _addTagController = () => {
  //   const { showAddTag } = this.props.state;
  //   this.props.logic('CREATE_NEW_SET_STATE', {
  //     showAddTag: !showAddTag,
  //   });
  // };

  _getWeather = () => {
    const { date } = this.props.state;
    this.props.logic('CREATE_NEW_GET_WEATHER', {
      date,
    });
  };
  _onChangeWeather = weather => {
    const { weatherInfo } = this.props.state;
    let newWeather = {
      ...weatherInfo,
      ...{ weather: weather },
    };
    this.props.logic('CREATE_NEW_SET_STATE', {
      weatherInfo: newWeather,
    });
  };

  _onChangeTemperature = temperature => {
    let fixed = parseInt(temperature, 10);
    console.warn(temperature, fixed);
    if (fixed > 60) {
      return;
    }
    const { weatherInfo } = this.props.state;
    let newWeather = {
      ...weatherInfo,
      ...{ temperature: fixed },
    };
    this.props.logic('CREATE_NEW_SET_STATE', {
      weatherInfo: newWeather,
    });
  };

  _onPressKey = ({ nativeEvent }) => {
    if (nativeEvent.key == 'Enter') {
      this._scrollView && this._scrollView.getNode().scrollToEnd();
    }
  };
  render() {
    const {
      date,
      images,
      content,
      tags,
      showAddTag,
      weatherInfo,
      isFetchingWeather,
    } = this.props.state;
    const hasImages = images.length > 0;
    const hasContent = content.length > 0;
    const ableToPost = hasImages || hasContent;
    return (
      <View style={styles.container}>
        <NavBar
          title={'Create New'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          sourceRight={Assets.send.source}
          rightTint={ableToPost ? colors.main : colors.midGrey}
          onPressRight={ableToPost ? this._onPressSend : () => {}}
          style={{ paddingRight: 10 }}
        />
        <Animated.ScrollView
          ref={r => (this._scrollView = r)}
          scrollEventThrottle={16}
          style={{
            flex: 1,
            marginBottom: this.keyboardHeight,
            paddingBottom: 20,
          }}
          keyboardDismissMode={'on-drag'}
          // contentContainerStyle={{ paddingBottom: this.keyboardHeight }}
        >
          <View style={{ flex: 1 }}>
            <ChooseDate
              ref={r => (this._chooseDate = r)}
              date={date}
              onChangeDate={this._onChangeDate}
              onPressToday={() => {
                this._onChangeDate(Moment().format('YYYY-MM-DD'));
              }}
            />
            <View style={{ zIndex: 1 }}>
              <ChooseWeather
                weatherInfo={weatherInfo}
                isLoading={isFetchingWeather}
                onPressAutoGetWeather={this._getWeather}
                onChangeWeather={this._onChangeWeather}
                onChangeTemperature={this._onChangeTemperature}
              />
            </View>

            <ChooseTags tags={tags} onPressAddTag={this._onPressAddTag} />

            <ChooseImages
              onPressChooseImages={this._onPressChooseImages}
              pickedImages={images}
              onPressDeleteImage={this._onPressDeleteImage}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: colors.pureWhite,
                marginTop: 10,
                // marginBottom: this.keyboardHeight,
              }}
            >
              <MultiLinesTextInput
                value={content}
                onChangeText={this._onChangeText}
                style={{
                  backgroundColor: colors.pureWhite,
                  margin: 10,
                  flex: 1,
                }}
                onKeyPress={this._onPressKey}
                placeholder={I18n.t('placeholder')}
                placeholderTextColor={colors.midGrey}
              />
            </View>
          </View>
        </Animated.ScrollView>
        <AddTag
          ref={r => {
            this._addTag = r;
          }}
          // show={showAddTag}
          // modelController={this._addTagController}
          // tags={tags}
        />
      </View>
    );
  }
}
CreateNew.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default CreateNew;

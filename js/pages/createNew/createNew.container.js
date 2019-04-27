import * as React from 'react';
import { StyleSheet, View, Animated, Keyboard } from 'react-native';
import {
  NavBar,
  Assets,
  MultiLinesTextInput,
  withKeyboardListener,
} from '../../../re-kits';
import ImagePicker from 'react-native-image-crop-picker';
import Moment from 'moment';
import ChooseDate from './components/ChooseDate';
import ChooseImages from './components/ChooseImages';
import ChooseTags from './components/ChooseTags';
import ChooseWeather from './components/ChooseWeather';
import AddTag from '../addTag/addTag.connect';
import {
  colors,
  I18n,
  connect2,
  curried,
  $UPLOAD_IMAGES,
  subscribeUploadImages,
  generateUnsplashImageObj,
  generateLocalImageObj,
} from '../../utils';
import { getRandomPhoto } from '../../utils/Unsplash';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
@connect2('createNew')
class CreateNew extends React.Component {
  autoUploadSubscription;
  constructor(props) {
    super(props);
  }
  componentWillMount() {}

  componentDidMount() {
    this._initQuery();
    this._initSubscriptions();
  }
  _initSubscriptions = () => {
    this.autoUploadSubscription = subscribeUploadImages().subscribe(
      ({ image, imageUrl }) => {
        const obj = generateLocalImageObj(image, imageUrl);
        const { images } = this.props.state;
        const fixedImages = images.map(item => {
          if (item.path && item.path === image.path) {
            return {
              path: item.path,
              ...obj,
            };
          }
          return item;
        });
        this._setState({ images: fixedImages });
      },
    );
  };
  componentDidUpdate(prevProps) {
    if (prevProps.keyboardIsShown !== this.props.keyboardIsShown) {
      this._scrollToEnd();
    }
  }
  componentWillUnmount() {
    this.autoUploadSubscription && this.autoUploadSubscription.unsubscribe();
    this.props.dispatch('CREATE_NEW_RESET_STATE');
  }
  _setState = nextState => {
    this.props.dismiss('CREATE_NEW_SET_STATE', nextState);
  };
  _initQuery = () => {
    this._getWeather();
    this.props.dispatch('CREATE_NEW_FETCH_USER_USED_TAGS');
  };
  _scrollToEnd = () => {
    this._scrollView && this._scrollView.getNode().scrollToEnd();
  };
  _goBack = () => {
    this.props.navigation.goBack();
  };
  _setState = nextState =>
    this.props.dispatch('CREATE_NEW_SET_STATE', nextState);

  _onChangeDate = date => {
    this._chooseDate.onChangeAnimation();
    this.props.dispatch('CREATE_NEW_SET_STATE', {
      date: date,
    });
  };

  _onPressChooseImages = () => {
    const { images } = this.props.state;
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: Math.min(8 - images.length, 5),
    })
      .then(imgs => {
        if (images.length + imgs.length > 8) {
          this.props.dispatch('SHOW_SNAKE_BAR', {
            type: 'ERROR',
            content: I18n.t('atMost8Pics'),
          });
          return;
        }
        this._addImage(imgs);
        this._autoUpload(imgs);
      })
      .catch(() => {});
  };

  _autoUpload = images => {
    from(images).subscribe($UPLOAD_IMAGES);
  };
  _addImage = upcomingImages => {
    const { images } = this.props.state;
    this._setState({
      images: images.concat(upcomingImages),
    });
  };
  _onPressDeleteImage = index => {
    const { images } = this.props.state;
    const newArr = images.filter((o, i) => i !== index);

    this.props.dispatch('CREATE_NEW_SET_STATE', {
      images: newArr,
    });
  };
  _onChangeText = text => {
    this.props.dispatch('CREATE_NEW_SET_STATE', {
      content: text,
    });
  };

  _onPressAddTag = () => {
    this._addTag && this._addTag.getWrappedInstance().open();
  };

  dismissKeyboard = () => Keyboard.dismiss();

  _onPressSend = ableToPost => {
    if (!ableToPost) {
      this.props.snakeBar(I18n.t('atLeastOnePic'), 'NORMAL');
      return;
    }
    this.dismissKeyboard();
    this.autoUploadSubscription && this.autoUploadSubscription.unsubscribe();
    const {
      images,
      content,
      weatherInfo,
      date,
      currentTag,
      datePrecision,
    } = this.props.state;
    this.props.dispatch('CREATE_NEW_SEND_POST', {
      images,
      content,
      weatherInfo,
      tagId: currentTag.tagId,
      tag: currentTag.tag,
      date,
      datePrecision,
    });
  };
  _getWeather = () => {
    const { date } = this.props.state;
    this.props.dispatch('CREATE_NEW_GET_WEATHER', {
      date,
    });
  };
  _onChangeWeather = weather => {
    const { weatherInfo } = this.props.state;
    let newWeather = {
      ...weatherInfo,
      weather,
    };
    this.props.dispatch('CREATE_NEW_SET_STATE', {
      weatherInfo: newWeather,
    });
  };

  // _onChangeTemperature = temperature => {
  //   let fixed = parseInt(temperature, 10);
  //   if (fixed > 60) {
  //     return;
  //   }
  //   const { weatherInfo } = this.props.state;
  //   let newWeather = {
  //     ...weatherInfo,
  //     ...{ temperature: fixed },
  //   };
  //   this.props.dispatch('CREATE_NEW_SET_STATE', {
  //     weatherInfo: newWeather,
  //   });
  // };
  _onPressGetRandomImage = () => {
    const { images } = this.props.state;
    if (images.length > 8) {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        type: 'ERROR',
        content: I18n.t('atLeastOnePic'),
      });
      return;
    }
    this.props.dispatch('SHOW_ALERT', {
      choices: [
        {
          title: I18n.t('confirm'),
          onPress: this._getRandomImage,
        },
      ],
      type: 'NORMAL',
      cancelTitle: I18n.t('cancel'),
      content: I18n.t('spend2CoinChooseARandom'),
    });
  };
  _getRandomImage = () => {
    this.props.dispatch('COIN_TRANSACTION', {
      transaction: -2,
    });
    from(getRandomPhoto())
      .pipe(
        // tap(data => console.warn(data)),
        map(generateUnsplashImageObj),
      )
      .subscribe({
        next: this._addImage,
        error: error => {
          console.warn(error);
          this.props.snakeBar('Error', 'ERROR');
        },
      });
  };

  _onPressKey = ({ nativeEvent }) => {
    if (nativeEvent.key == 'Enter') {
      this._scrollView && this._scrollView.getNode().scrollToEnd();
    }
  };
  _onSwitchDatePrecision = datePrecision => {
    const { datePrecision: prevDatePrecision } = this.props.state;
    if (prevDatePrecision === 'day' && datePrecision === 'day') {
      datePrecision = 'month';
    }
    if (prevDatePrecision === 'month' && datePrecision === 'month') {
      datePrecision = 'year';
    }
    this._setState({
      datePrecision,
    });
  };
  _setCurrentTag = currentTag => {
    this._setState({
      currentTag,
    });
  };
  _showPhotoBrowser = (images, index = 0) => {
    this.props.dispatch('PHOTO_BROWSER_SHOW', {
      images,
      index,
    });
  };
  render() {
    const {
      date,
      images,
      tags,
      weatherInfo,
      currentTag,
      isFetchingWeather,
      datePrecision,
    } = this.props.state;
    const { keyboardHeight } = this.props;
    const hasImages = images.length > 0;
    const ableToPost = hasImages;
    return (
      <View style={styles.container}>
        <NavBar
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          sourceRight={Assets.send.source}
          rightTint={ableToPost ? colors.main : colors.midGrey}
          onPressRight={curried(this._onPressSend)(ableToPost)}
          style={{ paddingRight: 10 }}
        />
        <Animated.ScrollView
          ref={r => (this._scrollView = r)}
          scrollEventThrottle={16}
          style={{
            flex: 1,
            marginBottom: keyboardHeight,
            paddingBottom: 20,
          }}
          keyboardDismissMode={'on-drag'}
        >
          <View style={{ flex: 1, paddingBottom: 20 }}>
            <ChooseDate
              ref={r => (this._chooseDate = r)}
              date={date}
              onChangeDate={this._onChangeDate}
              datePrecision={datePrecision}
              onSwitchDatePrecision={curried(this._onSwitchDatePrecision)}
              onPressToday={curried(this._onChangeDate)(
                Moment().format('YYYY-MM-DD'),
              )}
            />
            <View style={{ zIndex: 1 }}>
              <ChooseWeather
                weatherInfo={weatherInfo}
                isLoading={isFetchingWeather}
                onPressAutoGetWeather={this._getWeather}
                onChangeWeather={this._onChangeWeather}
                // onChangeTemperature={this._onChangeTemperature}
              />
            </View>

            <ChooseTags
              tags={tags}
              onPressAddTag={this._onPressAddTag}
              currentTag={currentTag}
              onPressTag={this._setCurrentTag}
            />

            <ChooseImages
              onPressChooseImages={this._onPressChooseImages}
              pickedImages={images}
              onPressDeleteImage={this._onPressDeleteImage}
              onPressGetRandomImage={this._onPressGetRandomImage}
              onPressImage={this._showPhotoBrowser}
            />
            {this._renderContent()}
          </View>
        </Animated.ScrollView>
        <AddTag
          ref={r => {
            this._addTag = r;
          }}
        />
      </View>
    );
  }
  _renderContent = () => {
    const { content } = this.props.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.pureWhite,
          marginTop: 10,
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
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default withKeyboardListener(CreateNew);

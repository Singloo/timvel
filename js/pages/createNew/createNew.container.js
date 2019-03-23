import * as React from 'react';
import { StyleSheet, View, Animated, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import {
  NavBar,
  Assets,
  MultiLinesTextInput,
  withKeyboardListener,
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
import {
  colors,
  isAndroid,
  I18n,
  connect2,
  HANDLE,
  $CENTER,
  $TYPES,
  curried,
} from '../../utils';
import { getRandomPhoto } from '../../utils/Unsplash';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@connect2('createNew')
class CreateNew extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}

  componentDidMount() {
    this._initQuery();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.keyboardIsShown !== this.props.keyboardIsShown) {
      this._scrollToEnd();
    }
  }
  componentWillUnmount() {
    this.props.dispatch('CREATE_NEW_RESET_STATE');
  }
  _initQuery = () => {
    this._getWeather();
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
            content: 'Number of images at most 8',
          });
          return;
        }
        this._addImage(imgs);
      })
      .catch(() => {});
  };

  _addImage = item => {
    const { images } = this.props.state;
    this._setState({
      images: images.concat(item),
    });
  };
  _onPressDeleteImage = index => () => {
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
      this.props.snakeBar(
        'You need to upload at least one pic, try to get a random one?',
        'NORMAL',
      );
      return;
    }
    this.dismissKeyboard();
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
      tag: currentTag.tag,
      date,
      datePrecision,
    });
  };
  // _addTagController = () => {
  //   const { showAddTag } = this.props.state;
  //   this.props.dispatch('CREATE_NEW_SET_STATE', {
  //     showAddTag: !showAddTag,
  //   });
  // };

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
      ...{ weather: weather },
    };
    this.props.dispatch('CREATE_NEW_SET_STATE', {
      weatherInfo: newWeather,
    });
  };

  _onChangeTemperature = temperature => {
    let fixed = parseInt(temperature, 10);
    if (fixed > 60) {
      return;
    }
    const { weatherInfo } = this.props.state;
    let newWeather = {
      ...weatherInfo,
      ...{ temperature: fixed },
    };
    this.props.dispatch('CREATE_NEW_SET_STATE', {
      weatherInfo: newWeather,
    });
  };
  _onPressGetRandomImage = () => {
    const { images } = this.props.state;
    if (images.length > 8) {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        type: 'ERROR',
        content: 'Number of images at most 8',
      });
      return;
    }
    this.props.dispatch('SHOW_ALERT', {
      choices: [
        {
          title: '好的',
          onPress: this._getRandomImage,
        },
      ],
      type: 'NORMAL',
      cancelTitle: '那算了',
      content: '花费 2 个金币,选择一张随机的图片',
    });
  };
  _getRandomImage = () => {
    this.props.dispatch('COIN_TRANSACTION', {
      transaction: -2,
    });
    from(getRandomPhoto())
      .pipe(
        // tap(data => console.warn(data)),
        map(data => ({
          imageUrl: data.urls.regular,
          rawUrl: data.urls.raw,
          description: data.description,
          color: data.color,
          exif: data.exif,
          width: data.width,
          height: data.height,
          likes: data.likes,
          user: data.user,
          id: data.id,
          type: 'unsplash',
        })),
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
    if (typeof currentTag === 'string') {
      currentTag = {
        tag: currentTag,
        popularity: 0,
      };
    }
    this._setState({
      currentTag,
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
          title={'Create New'}
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
                onChangeTemperature={this._onChangeTemperature}
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
CreateNew.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default withKeyboardListener(CreateNew);

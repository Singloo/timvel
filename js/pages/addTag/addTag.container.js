import * as React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import {
  SCREEN_WIDTH,
  colors,
  SCREEN_HEIGHT,
  I18n,
  curried,
  invoke,
} from '../../utils';
import {
  Touchable,
  Image,
  Assets,
  Text,
  Tag,
  Separator,
  NAV_BAR_HEIGHT_FULL,
  PADDING_TOP_FULL,
  Styles,
} from '../../../re-kits';
import SearchResults from './components/SearchResult';
import _ from 'lodash';
class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prepareToShowSearch: false,
      animationState: new Animated.Value(0),
    };
    this.animationOpen = Animated.spring(this.state.animationState, {
      toValue: 1,
      duration: 300,
      bounciness: 8,
    });
    this.animationClose = Animated.timing(this.state.animationState, {
      toValue: 0,
      duration: 300,
    });
  }
  componentWillMount() {
    this.props.dispatch('ADD_TAG_FETCH_POPULAR');
  }
  componentDidMount() {
    this.props.dispatch('ADD_TAG_FETCH_POPULAR');
  }
  componentWillUnmount() {
    this.props.dispatch('ADD_TAG_RESET_STATE');
  }
  open = () => {
    this.props.dispatch('ADD_TAG_SET_STATE', {
      show: true,
    });
    this.animationOpen.start();
  };
  close = () => {
    this.animationClose.start(() => {
      this.props.dispatch('ADD_TAG_SET_STATE', {
        show: false,
      });
    });
  };

  _onChangeText = value => {
    const { showSearch } = this.props.state;
    if (this.state.prepareToShowSearch === true) {
      this.setState({
        prepareToShowSearch: false,
      });
      this.props.dispatch('ADD_TAG_SET_STATE', {
        showSearch: true,
      });
    }
    if (showSearch === false) {
      this.props.dispatch('ADD_TAG_SET_STATE', {
        showSearch: true,
      });
    }
    this.props.dispatch('ADD_TAG_SET_STATE', {
      value,
    });
    this.props.dispatch('ADD_TAG_SEARCH_TAG', {
      tag: value,
    });
  };
  _onTextInputFocus = () => {
    this.setState({
      prepareToShowSearch: true,
    });
  };
  // _onTextInputBlur = () => {
  //   this.props.dispatch('ADD_TAG_SET_STATE', {
  //     showSearch: false,
  //   });
  // };

  _onPressKey = ({ nativeEvent }) => {
    const { value, showSearch } = this.props.state;
    if (nativeEvent.key == 'Backspace') {
      if (value.length === 0) {
        Keyboard.dismiss();
        this._cancelSearch();
      }
    }
    if (nativeEvent.key == 'Enter') {
      this.props.dispatch('ADD_TAG_SEARCH_TAG', {
        tag: value,
      });
      if (showSearch === false) {
        this.props.dispatch('ADD_TAG_SEARCH_TAG', {
          showSearch: true,
        });
      }
    }
  };
  _cancelSearch = () => {
    this.props.dispatch('ADD_TAG_SET_STATE', {
      showSearch: false,
      value: '',
    });
  };
  _onPressNewTag = tag => {
    const { tags } = this.props.createNew;
    const { showSearch } = this.props.state;
    let included = !!tags.find(o => o.tagId == tag.tagId);
    let newTags = tags;
    if (!included) {
      newTags = [].concat(tag, tags);
    }
    this.props.dispatch('CREATE_NEW_SET_STATE', {
      currentTag: tag,
      tags: newTags,
    });
    if (showSearch) {
      this._cancelSearch();
    }
  };

  _onPressAddTag = tag => {
    if (tag.trim().length === 0) {
      return;
    }
    Keyboard.dismiss();
    this.props.dispatch('ADD_TAG_ADD_TAG', {
      tag,
      callback: tag => {
        this._onPressNewTag(tag);
        this.close();
      },
    });
  };

  _setCurrentTag = currentTag => {
    this.props.dispatch('CREATE_NEW_SET_STATE', {
      currentTag,
    });
  };

  render() {
    const { show, showSearch } = this.props.state;
    if (!show) {
      return null;
    }
    const backgroundColor = this.state.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(33,33,33,0)', 'rgba(33,33,33,0.5)'],
    });
    const height = this.state.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [SCREEN_HEIGHT, 0],
    });
    return (
      <Animated.View
        style={[styles.container, Styles.absolute, { backgroundColor }]}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              marginTop: height,
            },
          ]}
        >
          {this._renderSearchBar()}
          {this._renderCurrentTags()}
          <Text style={{ marginTop: 10, fontSize: 25, fontWeight: '200' }}>
            {showSearch ? 'Search results' : I18n.t('popular')}
          </Text>
          <Separator style={{ marginTop: 10 }} />
          {this._renderPopuparTags()}
        </Animated.View>
      </Animated.View>
    );
  }
  _renderSearchBar = () => {
    const { value, showSearch } = this.props.state;
    return (
      <View style={styles.close}>
        {showSearch ? (
          <Text style={{ fontSize: 14 }} onPress={this._cancelSearch}>
            {'Cancel'}
          </Text>
        ) : (
          <Image
            source={Assets.close.source}
            onPress={invoke(this._cancelSearch, this.close)}
            style={{ marginLeft: 10, width: 20, height: 20 }}
          />
        )}
        <TextInput
          style={styles.search}
          value={value}
          placeholder={I18n.t('noInterested')}
          autoCorrect={true}
          onFocus={this._onTextInputFocus}
          onBlur={this._onTextInputBlur}
          underlineColorAndroid={'transparent'}
          onChangeText={this._onChangeText}
          onKeyPress={this._onPressKey}
        />
        <View style={{ width: 10, backgroundColor: 'transparent' }} />
      </View>
    );
  };
  _renderTags = injectedProps => (item, index) => {
    return (
      <Tag
        title={item.tag}
        key={index.toString()}
        style={{
          marginHorizontal: 4,
          marginVertical: 4,
        }}
        {...injectedProps(item)}
      />
    );
  };
  _renderCurrentTags = () => {
    const { tags, currentTag } = this.props.createNew;
    const addtionalProps = item => ({
      isSelected: currentTag.tag === item.tag,
      selectedStyle: styles.selectedStyle,
      selectedTextStyle: styles.selectedTextStyle,
      onPress: curried(this._setCurrentTag)(item),
    });
    return (
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: '200' }}>
            {I18n.t('current')}
          </Text>
        </View>
        <Separator style={{ marginTop: 5 }} />
        <ScrollView
          style={{ marginLeft: 10, marginTop: 10 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {tags.map(this._renderTags(addtionalProps))}
        </ScrollView>
      </View>
    );
  };
  _renderPopuparTags = () => {
    const { searchResults, value, showSearch, popularTags } = this.props.state;
    const addtionalProps = item => ({
      onPress: curried(this._onPressNewTag)(item),
      popularity: parseInt(item.popularity),
    });
    return (
      <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {popularTags.map(this._renderTags(addtionalProps))}
        </ScrollView>
        {showSearch && (
          <SearchResults
            results={searchResults}
            onPressTag={this._onPressNewTag}
            isEmpty={searchResults.length === 0}
            showAddButton={value.trim().length !== 0}
            onPressAddTag={curried(this._onPressAddTag)(value)}
          />
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-end',
    // zIndex: 2,
  },
  contentContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    flex: 1,
  },
  close: {
    paddingTop: PADDING_TOP_FULL,
    height: NAV_BAR_HEIGHT_FULL + 10,
    alignItems: 'center',
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.lightGrey,
  },
  search: {
    borderBottomWidth: 1,
    borderColor: colors.midGrey,
    flex: 1,
    marginHorizontal: 10,
    height: 30,
    padding: 0,
  },
  selectedStyle: { backgroundColor: colors.main, borderColor: 'transparent' },
  selectedTextStyle: {
    color: 'white',
  },
});

export default AddTag;

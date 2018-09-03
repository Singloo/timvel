import * as React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import { base, I18n } from '../../utils/';
import {
  Touchable,
  Image,
  Assets,
  Text,
  Tag,
  Separator,
} from '../../../re-kits';
import SearchResults from './components/SearchResult';
import _ from 'lodash';
const { Styles, SCREEN_WIDTH, colors, SCREEN_HEIGHT, PADDING_TOP } = base;
class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prepareToShowSearch: false,
    };
    this.animationState = new Animated.Value(0);
    this.animationOpen = Animated.spring(this.animationState, {
      toValue: 1,
      duration: 300,
      bounciness: 10,
    });
    this.animationClose = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 300,
    });

    this.bk = this.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(33,33,33,0)', 'rgba(33,33,33,0.5)'],
    });
    this.height = this.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [0, SCREEN_HEIGHT],
    });
  }
  componentWillMount() {
    this.props.logic('ADD_TAG_FETCH_POPULAR');
  }
  componentDidMount() {
    this.props.logic('ADD_TAG_FETCH_POPULAR');
  }
  componentWillUnmount() {
    this.props.logic('ADD_TAG_RESET_STATE');
  }
  open() {
    this.props.logic('ADD_TAG_SET_STATE', {
      show: true,
    });
    this.animationOpen.start();
  }
  close() {
    this.animationClose.start(() => {
      this.props.logic('ADD_TAG_SET_STATE', {
        show: false,
      });
    });
  }

  _onChangeText = value => {
    const { showSearch } = this.props.state;
    if (this.state.prepareToShowSearch === true) {
      this.setState({
        prepareToShowSearch: false,
      });
      this.props.logic('ADD_TAG_SET_STATE', {
        showSearch: true,
      });
    }
    if (showSearch === false) {
      this.props.logic('ADD_TAG_SET_STATE', {
        showSearch: true,
      });
    }
    this.props.logic('ADD_TAG_SET_STATE', {
      value,
    });
    this.props.logic('ADD_TAG_SEARCH_TAG', {
      tag: value,
    });
  };
  _onTextInputFocus = () => {
    this.setState({
      prepareToShowSearch: true,
    });
  };
  // _onTextInputBlur = () => {
  //   this.props.logic('ADD_TAG_SET_STATE', {
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
      this.props.logic('ADD_TAG_SEARCH_TAG', {
        tag: value,
      });
      if (showSearch === false) {
        this.props.logic('ADD_TAG_SEARCH_TAG', {
          showSearch: true,
        });
      }
    }
  };
  _cancelSearch = () => {
    this.props.logic('ADD_TAG_SET_STATE', {
      showSearch: false,
      value: '',
    });
  };
  _onPressNewTag = tag => {
    const { tags } = this.props.createNew;
    const { showSearch } = this.props.state;
    let included = _.findIndex(tags, { tag: tag.tag }) !== -1;
    let newTags = tags;
    if (!included) {
      newTags = [].concat(tag, tags);
    }
    this.props.logic('CREATE_NEW_SET_STATE', {
      currentTag: tag.tag,
      tags: newTags,
    });
    if (showSearch) {
      this._cancelSearch();
    }
  };

  _onPressAddTag = tag => {
    this.props.logic('ADD_TAG_ADD_TAG', {
      tag,
      callback: () => {
        this._onPressNewTag({
          tag: tag,
          popularity: 0,
        });
      },
    });
  };

  render() {
    const {
      show,
      popularTags,
      searchResults,
      value,
      showSearch,
    } = this.props.state;
    const { tags } = this.props.createNew;
    const renderPopularTags = popularTags.map((item, index) => {
      return (
        <Tag
          title={item.tag}
          key={index.toString()}
          onPress={() => this._onPressNewTag(item)}
          popularity={item.popularity}
          style={{
            marginHorizontal: 4,
            marginVertical: 4,
          }}
        />
      );
    });
    const renderCurrentTags = tags.map((item, index) => {
      return (
        <Tag
          title={item.tag}
          key={index.toString()}
          style={{
            marginHorizontal: 4,
            marginVertical: 4,
          }}
        />
      );
    });
    if (show) {
      return (
        <Animated.View
          style={[
            styles.container,
            Styles.absolute,
            { backgroundColor: this.bk },
          ]}
        >
          <Animated.View
            style={[
              styles.contentContainer,
              {
                height: this.height,
              },
            ]}
          >
            <View style={styles.close}>
              {showSearch ? (
                <Text style={{ fontSize: 14 }} onPress={this._cancelSearch}>
                  {'Cancel'}
                </Text>
              ) : (
                <Image
                  source={Assets.close.source}
                  onPress={() => {
                    this._cancelSearch();
                    this.close();
                  }}
                  style={{ marginLeft: 10 }}
                  size={'small'}
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
                {renderCurrentTags}
              </ScrollView>
            </View>

            <Text style={{ marginTop: 10, fontSize: 25, fontWeight: '200' }}>
              {showSearch ? 'Search results' : I18n.t('popular')}
            </Text>
            <Separator style={{ marginTop: 10 }} />
            <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10 }}>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {renderPopularTags}
              </ScrollView>
              {showSearch && (
                <SearchResults
                  results={searchResults}
                  onPressTag={this._onPressNewTag}
                  isEmpty={searchResults.length === 0}
                  onPressAddTag={() => {
                    this._onPressAddTag(value);
                  }}
                />
              )}
            </View>
          </Animated.View>
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: { justifyContent: 'flex-end', zIndex: 2 },
  contentContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  close: {
    paddingTop: PADDING_TOP,
    height: PADDING_TOP + 44 + 10,
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
  },
});

export default AddTag;

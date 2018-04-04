import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { Button, Text, InfiniteText } from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import {BlurView} from 'react-native-blur'
const { realSize, colors, renderTitle, SCREEN_WIDTH, PADDING_TOP } = base;
const width = SCREEN_WIDTH;
const height = realSize(200);
const avatarSize = realSize(80);
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetY: new Animated.Value(0),
      beginShrink: false,
      viewRef:null
    };
  }
  componentWillMount() {}

  _handleScroll = event => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y > realSize(200 - 80)) {
      if (this.state.beginShrink == false) {
        this.setState({ beginShrink: true });
      }
    } else {
      if (this.state.beginShrink == true) {
        this.setState({ beginShrink: false });
      }
    }
  };

  render() {
    const { userInfo } = this.props;

    const { username, userCoin, userAvatar, userTitle } = userInfo && userInfo;
    return (
      <View style={styles.wrapper}>
        <Animated.View style={styles.headerBar}>

          <View style={styles.infoContainerAfter}>
            <Image source={{ uri: userAvatar }} style={styles.avatarAfter} />
            <View style={styles.textContainer}>
              <InfiniteText
                text={username + userCoin}
                style={{}}
                textStyle={{ color: colors.white }}
              >
                {renderTitle(userTitle)}
                <View
                  style={{
                    width: 1,
                    height: 18,
                    backgroundColor: colors.white,
                    marginRight: 4,
                    alignSelf: 'center',
                  }}
                />
              </InfiniteText>
            </View>
          </View>
        </Animated.View>
        <ScrollView
          style={styles.container}
          // showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0 }}
          onScroll={event => this._handleScroll(event)}
          scrollEventThrottle={30}
        >
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            shrink={this.state.beginShrink}
          />
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            shrink={this.state.beginShrink}
          />
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            shrink={this.state.beginShrink}
          />
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            shrink={this.state.beginShrink}
          />
        </ScrollView>
      </View>
    );
  }
}
UserProfile.propTypes = {};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  infoContainerAfter: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    height: 30,
    alignItems: 'center',
    // alignSelf:'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  avatarAfter: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerBar: {
    height: 44 + PADDING_TOP,
    paddingTop: PADDING_TOP,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main,
  },
});

export default UserProfile;

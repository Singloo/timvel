import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  findNodeHandle,
} from 'react-native';
import {
  Button,
  Text,
  Icon,
  InfiniteText,
} from '../../../../re-kits/components';
import { base } from '../../../utils';
import { BlurView } from 'react-native-blur';
import PropTypes from 'prop-types';
const { SCREEN_WIDTH, colors, renderTitle } = base;
const width = SCREEN_WIDTH;
const height = SCREEN_WIDTH * (4 / 7);
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  componentWillMount() {}
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  render() {
    const { username, userCoin, userAvatar, userTitle } = this.props;

    return (
      <View style={styles.container}>
        <Image
          ref={r => {
            this.backgroundImage = r;
          }}
          source={{ uri: userAvatar }}
          style={styles.bkImage}
          resizeMode={'cover'}
        />
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'regular'}
          style={styles.absolute}
        />
        <View style={styles.infoContainer}>
          <Icon uri={userAvatar} size={80} isRound={true} />
          <View style={styles.textContainer}>
            <InfiniteText
              text={username + userCoin}
              style={{}}
              textStyle={{ color: colors.white }}
            >
            {renderTitle(userTitle)}
            </InfiniteText>
          </View>
        </View>
      </View>
    );
  }
}
UserInfo.propTypes = {};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: width,
    height: height,
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bkImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height,
  },
  infoContainer: {
    // alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue',
    paddingVertical: 0,
  },
  textContainer: {
    height: 30,
    marginTop: 10,
    // flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    marginLeft:40,
  },
});

export default UserInfo;

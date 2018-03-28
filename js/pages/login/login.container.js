import React, { Component } from 'react';
import { Platform, StyleSheet, View, Keyboard, Animated } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Icon,
  InfiniteText,
  Text,
  TextInput,
  Touchable,
} from '../../../re-kits/components';
import { base } from '../../utils';
import LottieView from 'lottie-react-native';
import { BlurView } from 'react-native-blur';
const {SCREEN_WIDTH} = base
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  componentDidMount() {
    // this.gradientBK.play();
  }
  componentWillUnmount() {
    // this.gradientBK.reset();
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  //listener
  keyboardWillShow = event => {
    // Animated.parallel([
    //     Animated.timing(this.keyboardHeight,{
    //         duration: event.duration,
    //         toValue: event.endCoordinates.height,
    //     }),
    //     Animated.timing(this.imageHeight,{
    //         duration: event.duration,
    //         toValue: IMAGE_HEIGHT_SMALL
    //     })
    // ]).start()
  };

  keyboardWillHide = event => {
    // Animated.parallel([
    //     Animated.timing(this.keyboardHeight,{
    //         duration: event.duration,
    //         toValue: base.realSize(100),
    //     }),
    //     Animated.timing(this.imageHeight,{
    //         duration: event.duration,
    //         toValue: IMAGE_HEIGHT
    //     })
    // ]).start()
  };

  //press
  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    const { username, password } = this.props.state;
    return (
      <View style={styles.container}>
        {/* <LottieView
          ref={r => {
            this.gradientBK = r;
          }}
          loop={true}
          speed={0.5}
          source={require('../../lottieFiles/gradient.json')}
          style={styles.absoluteBK}
        /> */}
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'light'}
          style={styles.absoluteBK}
          blurAmount={20}
        />
        <Touchable withOutFeedback={true} onPress={this._dismissKeyboard}>
          <View style={styles.contentContainer}>
            <View>
              <TextInput
                placeholder={'username'}
                value={username}
                onChangeText={value => {
                  this.props.logic('LOGIN_SET_STATE', {
                    username: value,
                  });
                }}
                clearText={() =>
                  this.props.logic('LOGIN_SET_STATE', {
                    username: '',
                  })
                }
              />
              <TextInput
                placeholder={'password'}
                value={password}
                onChangeText={value => {
                  this.props.logic('LOGIN_SET_STATE', {
                    password: value,
                  });
                }}
                clearText={() =>
                  this.props.logic('LOGIN_SET_STATE', {
                    password: '',
                  })
                }
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title={'Press me to login'} />
              <Button title={`Don't have an account?`} />
            </View>
          </View>
        </Touchable>
        <NavBar
          uriLeft={'arrow_left'}
          onPressLeft={this._goBack}
          title={'LogIn or SignUp'}
          style={styles.navBar}
        />
      </View>
    );
  }
}
Login.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  navBar: {
    position: 'absolute',
    top: 0,
  },
  absoluteBK: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Login;

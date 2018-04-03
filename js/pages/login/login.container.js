import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Keyboard,
  Animated,
  Easing,
} from 'react-native';
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
import { base, User } from '../../utils';
import LottieView from 'lottie-react-native';
import { BlurView } from 'react-native-blur';
const { SCREEN_WIDTH, realSize, colors } = base;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
    this.keyboardHeight = new Animated.Value(0);
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
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: realSize(200),
    }).start();
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
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: 0,
    }).start();
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

  async _login() {
    const { username, password } = this.props.state;
    try {
      await User.logIn(username, password);
    } catch (error) {
      console.warn(error);
      switch (error.code) {
        case 210:
          console.warn('用户名和密码不匹配。');
          break;
        case 211:
          console.warn('找不到用户。');
          break;
        case 216:
          console.warn('未验证的邮箱地址。');
          break;

        case 219:
          console.warn(
            '登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码',
          );
          break;
        default:
          console.warn('network error' + `${error.code}`);
          break;
      }
    } finally {
    }
  }

  _signUp = () => {};
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
          <Animated.View
            style={[
              styles.contentContainer,
              { marginBottom: this.keyboardHeight },
            ]}
          >
            <View>
              <TextInput
                containerStyle={styles.textInputContainer}
                style={styles.textInput}
                placeholderText={'username'}
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
                containerStyle={styles.textInputContainer}
                style={styles.textInput}
                secureTextEntry={true}
                placeholderText={'password'}
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
              <Button title={'Press me to login'} onPress={this._login} />
              <Button title={`Don't have an account?`} onPress={this._signUp} />
            </View>
          </Animated.View>
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
    // alignItems: 'center',
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
    // backgroundColor: 'red',
    // alignItems: 'center',
  },
  textInput: {
    // borderColor:colors.lightGrey
  },
  textInputContainer: {
    marginHorizontal: 30,
  },
});

export default Login;

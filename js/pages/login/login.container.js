import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Animated,
  Easing,
  SafeAreaView,
  LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  TextInput,
  Touchable,
  Assets,
} from '../../../re-kits';
import { base, User, I18n } from '../../utils';
import LottieView from 'lottie-react-native';
import { BlurView } from 'react-native-blur';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
const { SCREEN_WIDTH, realSize, colors, Styles, EMAIL_REGEX } = base;
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
    // this.gradientBK&&this.gradientBK.play();
  }
  componentWillUnmount() {
    this.props.logic('LOGIN_RESET_STATE');
    // this.gradientBK && this.gradientBK.reset();
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.timer1 && clearTimeout(this.timer1);
  }

  //listener
  keyboardWillShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: event.endCoordinates.height,
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

  _onPressLogin = (username, password) => {
    console.warn(username, password);
    this.props.logic('LOGIN', {
      username: username.trim(),
      password: password.trim(),
      callback: this._loginCallback,
    });
    // try {
    //   User.logIn(username, password);
    // } catch (error) {
    //   console.warn(error);
    //   switch (error.code) {
    //     case 210:
    //       console.warn('用户名和密码不匹配。');
    //       break;
    //     case 211:
    //       console.warn('找不到用户。');
    //       break;
    //     case 216:
    //       console.warn('未验证的邮箱地址。');
    //       break;

    //     case 219:
    //       console.warn(
    //         '登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码',
    //       );
    //       break;
    //     default:
    //       console.warn('network error' + `${error.code}`);
    //       break;
    //   }
    // } finally {
    // }
  };

  _loginCallback = () => {
    this.props.logic('USER_GET_USER_STATUS');
    this._goBack();
  };
  _onChangeLoginSignup = () => {
    this._dismissKeyboard();

    const { onLoginPage, showSignUpPage } = this.props.state;
    if (showSignUpPage) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          400,
          LayoutAnimation.Types.easeIn,
          LayoutAnimation.Properties.opacity,
        ),
      );
      this.props.logic('LOGIN_SET_STATE', {
        onLoginPage: !onLoginPage,
      });
      this.timer1 = setTimeout(() => {
        this.props.logic('LOGIN_SET_STATE', {
          showSignUpPage: !showSignUpPage,
        });
      }, 400);
    } else {
      this.props.logic('LOGIN_SET_STATE', {
        showSignUpPage: !showSignUpPage,
      });
      setTimeout(() => {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            400,
            LayoutAnimation.Types.easeIn,
            LayoutAnimation.Properties.opacity,
          ),
        );
        this.props.logic('LOGIN_SET_STATE', {
          onLoginPage: !onLoginPage,
        });
      }, 50);
    }
  };

  _onPressSignUp = (username, password, email) => {
    if (username.length === 0) {
      this.props.logic('GLOBAL_SET_STATE', {
        snakeBarInfo: I18n.t('usernameEmpty'),
      });
      return;
    }
    if (password.length === 0) {
      this.props.logic('GLOBAL_SET_STATE', {
        snakeBarInfo: I18n.t('passwordEmpty'),
      });
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      console.warn(EMAIL_REGEX.test(email), email);
      this.props.logic('GLOBAL_SET_STATE', {
        snakeBarInfo: I18n.t('emailEmpty'),
      });
      return;
    }
    this.props.logic('SIGNUP', {
      username: username.trim(),
      password: password.trim(),
      email: email.trim(),
      callback: this._signUpCallback,
    });
  };

  _signUpCallback = () => {
    this.props.logic('USER_GET_USER_STATUS');
    this._goBack();
    this.props.logic('GLOBAL_SET_STATE', {
      snakeBarInfo: I18n.t('welcome'),
    });
  };
  render() {
    const { onLoginPage, showSignUpPage } = this.props.state;
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
          style={Styles.absolute}
          blurAmount={20}
        />
        <Touchable withoutFeedback={true} onPress={this._dismissKeyboard}>
          <Animated.View
            style={[
              styles.contentContainer,
              { marginBottom: this.keyboardHeight },
            ]}
          >
            <View style={{ flex: 1 }}>
              <LoginPage
                onPressNew={this._onChangeLoginSignup}
                onPressLogin={this._onPressLogin}
                onLoginPage={onLoginPage}
              />
              {showSignUpPage && (
                <SignUpPage
                  onLoginPage={onLoginPage}
                  onPressSignUp={this._onPressSignUp}
                />
              )}
            </View>
          </Animated.View>
        </Touchable>
        <Button
          title={onLoginPage ? 'New?' : 'Have an account?'}
          buttonStyle={[
            styles.buttonStyle,
            { backgroundColor: 'transparent', marginTop: 10 },
          ]}
          textStyle={{ fontSize: 14 }}
          onPress={this._onChangeLoginSignup}
        />
        <NavBar
          sourceLeft={Assets.arrow_left.source}
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
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: 30,
    width: SCREEN_WIDTH - 60,
  },
});

export default Login;

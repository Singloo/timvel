import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Animated,
  Easing,
  SafeAreaView,
  LayoutAnimation,
  findNodeHandle,
} from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  TextInput,
  Touchable,
  Assets,
  Styles,
} from '../../../re-kits';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  realSize,
  colors,
  EMAIL_REGEX,
  User,
  I18n,
  isAndroid,
  isIOS,
  Notification,
  Navigation,
} from '../../utils';
import LottieView from 'lottie-react-native';
import { BlurView } from 'react-native-blur';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: new Animated.Value(0),
    };
  }
  componentWillMount() {
    if (isIOS) {
      this.keyboardWillShowSub = Keyboard.addListener(
        'keyboardWillShow',
        this.keyboardWillShow,
      );
      this.keyboardWillHideSub = Keyboard.addListener(
        'keyboardWillHide',
        this.keyboardWillHide,
      );
    } else {
      this.keyboardDidShowSub = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardDidShow,
      );
      this.keyboardDidHideSub = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardDidHide,
      );
    }
  }

  componentDidMount() {
    if (__DEV__) {
      return;
    }
    setTimeout(() => this.gradientBK && this.gradientBK.play(), 800);
  }
  componentWillUnmount() {
    this.props.dispatch('LOGIN_RESET_STATE');
    this.gradientBK && this.gradientBK.reset();
    if (isIOS) {
      this.keyboardWillShowSub && this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub && this.keyboardWillHideSub.remove();
    } else {
      this.keyboardDidShowSub && this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub && this.keyboardDidHideSub.remove();
    }
    this.timer1 && clearTimeout(this.timer1);
  }

  //listener
  keyboardWillShow = event => {
    Animated.timing(this.state.keyboardHeight, {
      duration: 400,
      toValue: event.endCoordinates.height,
    }).start();
  };
  keyboardDidShow = event => {
    // Animated.timing(this.state.keyboardHeight, {
    //   duration: 400,
    //   toValue: event.endCoordinates.height,
    // }).start();
  };
  keyboardWillHide = event => {
    Animated.timing(this.state.keyboardHeight, {
      duration: 400,
      toValue: 0,
    }).start();
  };
  keyboardDidHide = event => {
    // Animated.timing(this.state.keyboardHeight, {
    //   duration: 400,
    //   toValue: 0,
    // }).start();
  };
  //press
  _goBack = () => {
    this.props.navigation.goBack();
  };

  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  _onPressLogin = (username, password) => {
    this.props.dispatch('LOGIN', {
      username: username.trim(),
      password: password.trim(),
      callback: this._loginCallback,
    });
  };

  _loginCallback = () => {
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
      this.props.dispatch('LOGIN_SET_STATE', {
        onLoginPage: !onLoginPage,
      });
      this.timer1 = setTimeout(() => {
        this.props.dispatch('LOGIN_SET_STATE', {
          showSignUpPage: !showSignUpPage,
        });
      }, 400);
    } else {
      this.props.dispatch('LOGIN_SET_STATE', {
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
        this.props.dispatch('LOGIN_SET_STATE', {
          onLoginPage: !onLoginPage,
        });
      }, 50);
    }
  };

  _onPressSignUp = (username, password, email) => {
    if (username.length === 0) {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        content: I18n.t('usernameEmpty'),
      });
      return;
    }
    if (password.length === 0) {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        content: I18n.t('passwordEmpty'),
      });
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      console.warn(EMAIL_REGEX.test(email), email);
      this.props.dispatch('SHOW_SNAKE_BAR', {
        content: I18n.t('emailEmpty'),
      });
      return;
    }
    Keyboard.dismiss();
    this.props.dispatch('SHOW_ALERT', {
      choices: [
        { title: I18n.t('userPolicy'), onPress: this._goToPolicy },
        {
          title: I18n.t('confirm'),
          onPress: () => {
            this._onConfirmSignUp(username, password, email);
          },
        },
      ],
      content: I18n.t('ifAgreeWithUserPolicy'),
      cancelTitle: I18n.t('cancel'),
      onCancel: () => {
        Navigation.back();
      },
    });
  };
  _onConfirmSignUp = (username, password, email) => {
    this.props.dispatch('SIGNUP', {
      username: username.trim(),
      password: password.trim(),
      email: email.trim(),
      callback: this._signUpCallback,
    });
  };
  _goToPolicy = () => {
    Navigation.navigate('policy');
  };
  _signUpCallback = () => {
    this._goBack();
    this.props.dispatch('SHOW_SNAKE_BAR', {
      content: I18n.t('welcome'),
    });
    if (isIOS) {
      Notification.IOSinitPush();
    }
  };
  render() {
    const { onLoginPage, showSignUpPage } = this.props.state;
    return (
      <View style={styles.container}>
        <LottieView
          ref={r => {
            this.gradientBK = r;
          }}
          loop={true}
          speed={0.5}
          source={require('../../lottieFiles/gradient.json')}
          style={styles.absoluteBK}
        />
        {isIOS && (
          <BlurView blurType={'dark'} style={Styles.absolute} blurAmount={30} />
        )}
        <Touchable withoutFeedback={true} onPress={this._dismissKeyboard}>
          <Animated.View
            style={[
              styles.contentContainer,
              { marginBottom: this.state.keyboardHeight },
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
                  onPressUserPolicy={this._goToPolicy}
                />
              )}
            </View>
          </Animated.View>
        </Touchable>
        <Button
          title={
            onLoginPage
              ? `        ${I18n.t('isNew')}      `
              : I18n.t('haveAnAccount')
          }
          buttonStyle={[
            styles.buttonStyle,
            { backgroundColor: 'transparent', marginTop: 10 },
          ]}
          textStyle={{ fontSize: 14, color: colors.main, textAlign: 'center' }}
          onPress={this._onChangeLoginSignup}
        />
        <NavBar
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          title={onLoginPage ? I18n.t('loginTitle') : I18n.t('signUpTitle')}
          style={styles.navBar}
          titleStyle={{ color: colors.white }}
          leftTint={colors.white}
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
    overflow: 'hidden',
    // alignItems: 'center',
  },
  navBar: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: 30,
    // width: SCREEN_WIDTH - 60,
  },
  absoluteBK: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    transform: [{ scale: 1.2 }],
  },
});

export default Login;

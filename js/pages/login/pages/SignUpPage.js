import React from 'react';
import { StyleSheet, View, Animated, ScrollView } from 'react-native';
import {
  Button,
  Image,
  Text,
  TextInput,
  NAV_BAR_HEIGHT_FULL,
  Styles,
  colors,
} from '../../../../re-kits';
import { SCREEN_WIDTH, SCREEN_HEIGHT, I18n } from '../../../utils';
const RIGHT = SCREEN_WIDTH;
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  _clear = key => {
    switch (key) {
      case 'username': {
        this.setState({
          username: '',
        });
        break;
      }
      case 'password': {
        this.setState({
          password: '',
        });
        break;
      }
      case 'email': {
        this.setState({
          email: '',
        });
        break;
      }
      default:
        return;
    }
  };
  _onChangeUsername = value => {
    this.setState({
      username: value,
    });
  };

  _onChangePassword = value => {
    this.setState({
      password: value,
    });
  };

  _onChangeEmail = value => {
    this.setState({
      email: value,
    });
  };
  render() {
    const { onLoginPage, onPressSignUp, onPressUserPolicy } = this.props;
    const { username, password, email } = this.state;
    return (
      <View style={[Styles.absolute, styles.container]}>
        {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}> */}
        <Animated.View
          style={[
            styles.relative,
            {
              right: !onLoginPage ? 0 : -RIGHT,
              bottom: !onLoginPage ? 0 : 50,
            },
          ]}
        >
          <TextInput
            containerStyle={styles.textInputContainer}
            style={styles.textInput}
            placeholderText={I18n.t('signUpUsername')}
            value={username}
            textStyle={{ color: colors.pureWhite }}
            onChangeText={this._onChangeUsername}
            clearText={() => this._clear('username')}
            iconStyle={{ tintColor: colors.pureWhite }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.relative,
            {
              right: !onLoginPage ? 0 : -RIGHT - 160,
              bottom: !onLoginPage ? 0 : -50,
            },
          ]}
        >
          <TextInput
            containerStyle={styles.textInputContainer}
            style={styles.textInput}
            placeholderText={I18n.t('signUpPassword')}
            value={password}
            textStyle={{ color: colors.pureWhite }}
            onChangeText={this._onChangePassword}
            clearText={() => this._clear('password')}
            iconStyle={{ tintColor: colors.pureWhite }}
          />
        </Animated.View>
        {/* <Animated.View
          style={[
            styles.relative,
            {
              right: !onLoginPage ? 0 : -RIGHT - 160 * 2,
              bottom: !onLoginPage ? 0 : -50,
            },
          ]}
        >
          <TextInput
            containerStyle={styles.textInputContainer}
            style={styles.textInput}
            placeholderText={I18n.t('signUpPassword2')}
            value={password2}
            onChangeText={this._onChangePassword2}
            clearText={() => this._clear('password2')}
          />
        </Animated.View> */}
        <Animated.View
          style={[
            styles.relative,
            {
              right: !onLoginPage ? 0 : -RIGHT - 160 * 2,
              bottom: !onLoginPage ? 0 : -50,
            },
          ]}
        >
          <TextInput
            containerStyle={styles.textInputContainer}
            style={styles.textInput}
            placeholderText={I18n.t('signUpEmail')}
            value={email}
            textStyle={{ color: colors.pureWhite }}
            onChangeText={this._onChangeEmail}
            clearText={() => this._clear('email')}
            iconStyle={{ tintColor: colors.pureWhite }}
          />
        </Animated.View>
        <Button
          title={'Sign up!!'}
          type={'mainBlank'}
          buttonStyle={[
            styles.buttonStyle,
            styles.relative,
            {
              top: !onLoginPage ? 0 : SCREEN_HEIGHT,
              right: !onLoginPage ? 0 : -RIGHT - 160 * 3,
            },
          ]}
          textStyle={{ fontWeight: 'bold' }}
          onPress={() => {
            onPressSignUp(username, password, email);
          }}
        />
        <Text
          style={{
            color: colors.main,
            alignSelf: 'center',
            marginTop: 30,
            fontSize: 14,
            opacity: !onLoginPage ? 1 : 0,
          }}
          onPress={onPressUserPolicy}
        >
          {I18n.t('userPolicy')}
        </Text>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: NAV_BAR_HEIGHT_FULL,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  relative: {
    position: 'relative',
  },
  textInputContainer: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  textInput: { borderColor: colors.white, color: colors.pureWhite },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: 30,
    width: SCREEN_WIDTH - 60,
    backgroundColor: 'transparent',
  },
});
export default SignUpPage;

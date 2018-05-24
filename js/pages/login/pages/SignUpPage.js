import React from 'react';
import { StyleSheet, View, Animated, ScrollView } from 'react-native';
import { Button, Icon, Text, TextInput } from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
const { Styles, SCREEN_WIDTH, NAV_BAR_HEIGHT, SCREEN_HEIGHT } = base;
const RIGHT = SCREEN_WIDTH;
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
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
      case 'password1': {
        this.setState({
          password1: '',
        });
        break;
      }
      case 'password2': {
        this.setState({
          password2: '',
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

  _onChangePassword1 = value => {
    this.setState({
      password1: value,
    });
  };

  _onChangeEmail = value => {
    this.setState({
      email: value,
    });
  };
  render() {
    const { onLoginPage, onPressSignUp } = this.props;
    const { username, password1, password2, email } = this.state;
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
              placeholderText={'your username'}
              value={username}
              onChangeText={this._onChangeUsername}
              clearText={() => this._clear('username')}
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
              placeholderText={'your password'}
              value={password1}
              onChangeText={this._onChangePassword1}
              clearText={() => this._clear('password1')}
            />
          </Animated.View>
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
              placeholderText={'your password again'}
              value={password2}
              onChangeText={this._onChangePassword2}
              clearText={() => this._clear('password2')}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.relative,
              {
                right: !onLoginPage ? 0 : -RIGHT - 160 * 3,
                bottom: !onLoginPage ? 0 : -50,
              },
            ]}
          >
            <TextInput
              containerStyle={styles.textInputContainer}
              style={styles.textInput}
              placeholderText={'your email'}
              value={email}
              onChangeText={this._onChangeEmail}
              clearText={() => this._clear('email')}
            />
          </Animated.View>
          <Button
            title={'Sign up!!'}
            buttonStyle={[
              styles.buttonStyle,
              styles.relative,
              {
                top: !onLoginPage ? 0 : SCREEN_HEIGHT,
                right: !onLoginPage ? 0 : -RIGHT - 160 * 4,
              },
            ]}
            onPress={() => {
              onPressSignUp(username, password2, email);
            }}
          />
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: NAV_BAR_HEIGHT,
    justifyContent: 'center',
    backgroundColor:'transparent'
  },
  relative: {
    position: 'relative',
  },
  textInputContainer: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  textInput: {},
  buttonStyle: {
    alignSelf: 'center',
    marginTop: 30,
    width: SCREEN_WIDTH - 60,
  },
});
export default SignUpPage;

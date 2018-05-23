import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Icon, Text, TextInput } from '../../../../re-kits/components';
import { base } from '../../../utils';
const { Styles, NAV_BAR_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT } = base;
import PropTypes from 'prop-types';

const LEFT = SCREEN_WIDTH;
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

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
  _clearUsername = () => {
    this.setState({
      username: '',
    });
  };

  _clearPassword = () => {
    this.setState({
      password: '',
    });
  };
  render() {
    const { username, password } = this.state;
    const { onPressNew, onPressLogin, onLoginPage } = this.props;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.relative,
            {
              left: onLoginPage ? 0 : -LEFT,
              bottom: onLoginPage ? 0 : 50,
            },
          ]}
        >
          <TextInput
            containerStyle={styles.textInputContainer}
            style={styles.textInput}
            placeholderText={'username'}
            value={username}
            onChangeText={this._onChangeUsername}
            clearText={this._clearUsername}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.relative,
            {
              left: onLoginPage ? 0 : -LEFT - 160,
              bottom: onLoginPage ? 0 : -50,
            },
          ]}
        >
          <TextInput
            containerStyle={styles.textInputContainer}
            style={styles.textInput}
            placeholderText={'password'}
            value={password}
            onChangeText={this._onChangePassword}
            clearText={this._clearPassword}
          />
        </Animated.View>
        <View
          stylle={[
            styles.relative,
            {
              top: onLoginPage ? 0 : -SCREEN_HEIGHT,
            },
          ]}
        >
          <Button
            title={'Login'}
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              onPressLogin(username, password);
            }}
          />
          <Button
            title={'New?'}
            buttonStyle={[
              styles.buttonStyle,
              { backgroundColor: 'transparent', marginTop: 10 },
            ]}
            textStyle={{ fontSize: 14 }}
            onPress={onPressNew}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: NAV_BAR_HEIGHT,
    justifyContent: 'center',
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

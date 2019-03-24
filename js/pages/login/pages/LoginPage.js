import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
  Button,
  TextInput,
  NAV_BAR_HEIGHT_FULL,
  colors,
} from '../../../../re-kits';
import {
  Styles,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  I18n,
  curried,
} from '../../../utils';

const LEFT = SCREEN_WIDTH * 2;
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
    const { onPressLogin, onLoginPage } = this.props;
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
            placeholderText={I18n.t('loginUsername')}
            value={username}
            textStyle={{ color: colors.pureWhite }}
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
            placeholderText={I18n.t('loginPassword')}
            value={password}
            textStyle={{ color: colors.pureWhite }}
            onChangeText={this._onChangePassword}
            clearText={this._clearPassword}
          />
        </Animated.View>

        <Button
          title={'Login'}
          type={'mainBlank'}
          buttonStyle={[
            styles.buttonStyle,
            styles.relative,
            {
              top: onLoginPage ? 0 : SCREEN_HEIGHT,
              left: onLoginPage ? 0 : -LEFT - 160 * 2,
            },
          ]}
          textStyle={{ fontWeight: 'bold' }}
          onPress={curried(onPressLogin)(username, password)}
        />
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
  textInput: { borderColor: colors.white },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: 30,
    width: SCREEN_WIDTH - 60,
    backgroundColor: 'transparent',
  },
});
export default SignUpPage;

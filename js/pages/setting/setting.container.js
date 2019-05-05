/*
 * File: /Users/origami/Desktop/timvel/js/pages/setting/template.container.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday April 27th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday May 5th 2019 9:47:33 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Clipboard, Linking } from 'react-native';
import {
  Button,
  NavBar,
  Assets,
  SCREEN_WIDTH,
  colors,
} from '../../../re-kits';
import {
  I18n,
  User,
  isIOS,
  Cache,
  Navigation,
} from '../../utils';
import { connect2 } from '../../utils/Setup';
import { InfoBar } from '../../components';
import {} from 'rxjs/operators';
import DeviceInfo from 'react-native-device-info';
@connect2('setting')
class Sample extends Component {
  componentWillMount() {
    this.logOutCallback = this.props.navigation.getParam(
      'logOutCallback',
      () => {},
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };
  _onPressLogout = () => {
    this.props.dispatch('SHOW_ALERT', {
      choices: [
        {
          title: I18n.t('confirm'),
          onPress: this._logOut,
        },
      ],
      content: I18n.t('areYouSureToLogout'),
    });
  };
  _logOut = () => {
    User.logOut();
    this.logOutCallback();
    this._goBack();
    this.props.dispatch('SHOW_SNAKE_BAR', {
      content: I18n.t('seeYouAgain'),
    });
  };
  _onPressCheckNewVersion = () => {
    this.props.dispatch('SETTING_CHECK_NEW_VERSION', {
      onConfirmDownload: link => {
        if (isIOS) {
          Linking.openURL('https://itunes.apple.com/cn/app/id1461661373');
          return;
        }
        Clipboard.setString(link);
        this.props.dispatch('SHOW_SNAKE_BAR', {
          content: I18n.t('saveToClipboard'),
          type: 'SUCCESS',
        });
      },
      onNoNewVersion: () => {
        this.props.dispatch('SHOW_SNAKE_BAR', {
          content: I18n.t('noNewVersion'),
        });
      },
      onCancel: () => {
        Cache.set(
          Cache.VERSION_CHECK_KEYS(DeviceInfo.getReadableVersion()),
          'true',
          true,
        );
      },
    });
  };
  _goToPolicy = () => {
    Navigation.navigate('policy');
  };
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={'Setting'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
          <InfoBar
            title={I18n.t('checkVerison')}
            onPress={this._onPressCheckNewVersion}
          />
          <InfoBar title={I18n.t('userPolicy')} onPress={this._goToPolicy} />
        </ScrollView>
        <Button
          title={I18n.t('logout')}
          onPress={this._onPressLogout}
          buttonStyle={{ width: SCREEN_WIDTH, backgroundColor: colors.red }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;

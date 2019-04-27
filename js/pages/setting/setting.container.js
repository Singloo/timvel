/*
 * File: /Users/origami/Desktop/timvel/js/pages/setting/template.container.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday April 27th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday April 27th 2019 6:45:21 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Clipboard } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  SCREEN_WIDTH,
  colors,
} from '../../../re-kits';
import { I18n, User, apiClient, retry3, isIOS } from '../../utils';
import { connect2 } from '../../utils/Setup';
import { InfoBar } from '../../components';
import { map } from 'rxjs/operators';
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
    });
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

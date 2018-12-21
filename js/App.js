import * as React from 'react';
import { View, UIManager, PushNotificationIOS, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import configureStore, { setNavigation } from './configureStore';
import SimpleApp from './Navigators';
import { Setup, base, Notification, User } from './utils';
import * as Connectors from './connectors';
import CoinIncrease from './components/CoinIncrease';
import { CoinTransactionAnimation } from './components/CoinTransactionAnimation';
//ignore isMounted is deprecated, this warning fixed in higher version
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
import AV from 'leancloud-storage';
AV.init({
  appId: 'UYganDzaND6XsvYaL552tlbs-gzGzoHsz',
  appKey: 'l5ld3QxRSvLCaJ4Rpv6gXbIq',
});
import Installation from 'leancloud-installation';
Installation(AV);
const store = configureStore();
Setup.preventDoublePress(SimpleApp);
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class App extends React.Component {
  async componentDidMount() {
    try {
      this._init();
      let notification = new Notification(Installation);
      if (base.isIOS) {
        notification.IOSinitPush();
      } else {
        notification.AndroidinitPush();
      }
      // try to prevent crash n._navigation.state
      if (base.isIOS) {
        return;
      }
      await new Promise(resolve => {
        setTimeout(resolve, 500);
      });
      Setup.androidBackButton(this._navigation, store);
    } catch (error) {
      //
    }
  }
  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register');
    store.dispatch({ type: 'UPDATE_USERINFO' });
  }

  _init = async () => {
    CoinTransactionAnimation.init();
    await User.init();
  };

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <SimpleApp
            ref={navigation => {
              this._navigation = navigation;
              setNavigation(navigation);
            }}
          />

          <Connectors.global />
          <Connectors.alert />
          <Connectors.snakeBar />
          <CoinIncrease edge={15} />
        </View>
      </Provider>
    );
  }
}

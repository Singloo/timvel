import * as React from 'react';
import {
  View,
  UIManager,
  PushNotificationIOS,
  YellowBox,
  BackHandler,
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import SimpleApp from './Navigators';
import {
  Setup,
  isIOS,
  Notification,
  Navigation,
  isAndroid,
  User,
  AV,
} from './utils';
import * as Connectors from './connectors';
import CoinIncrease from './components/CoinIncrease';
import { CoinTransactionAnimation } from './components/CoinTransactionAnimation';
//ignore isMounted is deprecated, this warning fixed in higher version
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RCTImagePickerManager',
  'Warning: ViewPagerAndroid',
  'Warning: Slider has been',
]);
//@ts-ignore
import Installation from 'leancloud-installation';
const installation = Installation(AV);
const store = configureStore();
// Setup.preventDoublePress(SimpleApp);
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class App extends React.Component {
  _alert;
  componentDidMount() {
    this._init();
    this._setupNotification();
    if (isIOS) {
      return;
    }
    Setup.HandleBack.init(this._navigation, store);
  }
  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register');
    store.dispatch({ type: 'UPDATE_USERINFO', payload: {} });
    // this._unsubscribeBackHandler();
  }
  _setupNotification = async () => {
    Notification.init(installation);
    if (isAndroid) {
      Notification.AndroidinitPush();
    }
  };
  onBackButtonPressAndroid = () => {
    const { show } = store.getState().alert;
    console.warn(show);
    if (show) {
      console.warn(this._alert);
      return true;
    } else {
      return false;
    }
  };
  _subscribeBackHandler = () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );
  };
  _unsubscribeBackHandler = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );
  };
  _init = async () => {
    try {
      CoinTransactionAnimation.init();
    } catch (error) {
      console.warn(error);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <SimpleApp
            ref={navigation => {
              this._navigation = navigation;
              Navigation.setNavigation(navigation);
            }}
          />
          <Connectors.photoBrowser />
          <Connectors.global />
          <Connectors.alert ref={r => (this._alert = r)} />
          <Connectors.snakeBar />
          <CoinIncrease />
        </View>
      </Provider>
    );
  }
}

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import * as Connectors from './connectors';
const MainScreenNavigator = createBottomTabNavigator(
  {
    Home: { screen: Connectors.homePage },
    // Home: { screen: Connectors.testPage },
    ShopPage: { screen: Connectors.shopPage },
    NotifPage: { screen: Connectors.notifPage },
    UserPage: { screen: Connectors.userPage },
  },
  {
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarComponent: Connectors.tabbar,
  },
);

const SimpleApp = createStackNavigator(
  {
    Main: {
      screen: MainScreenNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    login: {
      screen: Connectors.login,
    },
    launchPage: {
      screen: Connectors.launchPage,
    },
    createNew: {
      screen: Connectors.createNew,
    },
    chooseSex: {
      screen: Connectors.chooseSex,
    },
    comment: {
      screen: Connectors.comment,
    },
    strangerProfile: {
      screen: Connectors.strangerProfile,
    },
    notifPage: {
      screen: Connectors.notifPage,
    },
    rememberPage: {
      screen: Connectors.rememberPage,
    },
    addTag: {
      screen: Connectors.addTag,
    },
    publishProduct: {
      screen: Connectors.publishProduct,
    },
    postDetail: {
      screen: Connectors.postDetail,
    },
    postReplies: {
      screen: Connectors.postReplies,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'launchPage',
    // transitionConfig: TransitionConfiguration,
  },
);

export default createAppContainer(SimpleApp);

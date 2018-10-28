import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import * as Connectors from './connectors';
import CardStackStyleInterpolator from '../node_modules/react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { base } from './utils';
//transition : 'forHorizontal' 'forVertical'
const TransitionConfiguration = () => ({
  screenInterpolator: sceneProps => {
    const { scene } = sceneProps;
    const { route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal';
    return CardStackStyleInterpolator[transition](sceneProps);
  },
});
const MainScreenNavigator = TabNavigator(
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

const SimpleApp = StackNavigator(
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
  },
  {
    headerMode: 'none',
    initialRouteName: 'launchPage',
    transitionConfig: TransitionConfiguration,
  },
);

// const Drawer = DrawerNavigator(
//   {
//     Home: { screen: SimpleApp },
//     UserPage: { screen: Connectors.userPage }
//   },
//   {
//     initialRouteName:'Home',
//     contentComponent:Connectors.userPage
//   }
// )

export default SimpleApp;

import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import * as Connectors from './connectors';
import { base } from './utils';

const MainScreenNavigator = TabNavigator(
  {
    Home: { screen: Connectors.homePage },
    RememberPage: { screen: Connectors.rememberPage },
    shooPage: { screen: Connectors.shopPage },
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
    // rememberPage:{
    //   screen: Connectors.rememberPage
    // }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Main',
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

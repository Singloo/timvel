import { TabNavigator, StackNavigator } from 'react-navigation';
import * as Connectors from './connectors'

const MainScreenNavigator = TabNavigator(
  {
    Home: { screen: Connectors.homePage },
    RememberPage: { screen: Connectors.rememberPage },
    shooPage: { screen: Connectors.shopPage },
    UserPage: { screen: Connectors.userPage }
    // // Study: { screen: SearchConnector },
    // Teacher: { screen: VideoHistoryConnector },
  },
  {
    // tabBarComponent: NavConnector,
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    lazy: true,
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
)

export default SimpleApp
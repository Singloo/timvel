import { TabNavigator, StackNavigator } from 'react-navigation';
import * as Connectors from './connectors'

const MainScreenNavigator = TabNavigator(
  {
    Home: { screen: Connectors.homePage },
    // Search: { screen: Connectors2.lessonFeed },
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
 { Main: {
    screen: MainScreenNavigator,
    navigationOptions: {
      gesturesEnabled: false,
    },
  }

},
{
  headerMode: 'none',
  initialRouteName: 'Main',
  // initialRouteName: 'levelTest',
},
)

export default SimpleApp
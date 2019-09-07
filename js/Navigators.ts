import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  NavigationTransitionProps,
  NavigationSceneRendererProps,
} from 'react-navigation';
import { Easing, Animated } from 'react-native';
// import * as Connectors from './connectors';
import { Policy } from './singlePages';
import Feed from './modules/Feed/builder';
import PostDetail from './modules/PostDetail/builder';
import { get } from 'lodash';
const transitionConfig = (
  transitionProps: NavigationTransitionProps,
  prevTransitionProps: NavigationTransitionProps,
  isModal: boolean,
) => {
  const { scenes } = transitionProps;
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  const prevRouteName = get(prevScene, 'route.routeName');
  const nextRouteName = get(nextScene, 'route.routeName');
  // console.log(scenes, prevRouteName, nextRouteName);
  if (nextRouteName === 'postDetail') {
    return {
      transitionSpec: {
        duration: 700,
        // easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;
        const width = layout.initWidth;

        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        });

        const scale = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [0.3, 1],
        });
        return { transform: [{ translateX: 0 }], opacity: scale };
      },
    };
  }
  return {};
};

const MainScreenNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Feed,
    },
    // ShopPage: { screen: Connectors.shopPage },
    // NotifPage: { screen: Connectors.notifPage },
    // UserPage: { screen: Connectors.userPage },
  },
  {
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    lazy: true,
    // tabBarComponent: Connectors.tabbar,
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
    // login: {
    //   screen: Connectors.login,
    // },
    // launchPage: {
    //   screen: Connectors.launchPage,
    // },
    // createNew: {
    //   screen: Connectors.createNew,
    // },
    // chooseSex: {
    //   screen: Connectors.chooseSex,
    // },
    // comment: {
    //   screen: Connectors.comment,
    // },
    // strangerProfile: {
    //   screen: Connectors.strangerProfile,
    // },
    // notifPage: {
    //   screen: Connectors.notifPage,
    // },
    // rememberPage: {
    //   screen: Connectors.rememberPage,
    // },
    // addTag: {
    //   screen: Connectors.addTag,
    // },
    // publishProduct: {
    //   screen: Connectors.publishProduct,
    // },
    postDetail: {
      screen: PostDetail,
    },
    // postReplies: {
    //   screen: Connectors.postReplies,
    // },
    // postByTag: {
    //   screen: Connectors.postByTag,
    // },
    // camera: {
    //   screen: Connectors.camera,
    // },
    // setting: {
    //   screen: Connectors.setting,
    // },
    // policy: {
    //   screen: Policy,
    // },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Main',
    // transitionConfig: TransitionConfiguration,
    transitionConfig: transitionConfig,
  },
);

export default createAppContainer(SimpleApp);

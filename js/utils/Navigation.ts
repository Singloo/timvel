import {
  NavigationActions,
  StackActions,
  NavigationContainerComponent,
} from 'react-navigation';
class Navigation {
  navigation: NavigationContainerComponent | null = null;
  setNavigation = (navigation: NavigationContainerComponent | null) => {
    this.navigation = navigation;
  };
  navigate = (routeName: string, params = {}) => {
    if (!this.navigation) {
      return;
    }
    this.navigation.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  };
  replace = (routeName: string, params = {}) => {
    if (!this.navigation) {
      return;
    }
    const action = StackActions.replace({
      routeName,
      params,
    });
    this.navigation.dispatch(action);
  };
  reset = (routeName: string) => {
    if (!this.navigation) {
      return;
    }
    const aciton = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });
    this.navigation.dispatch(aciton);
  };
  back = () => {
    if (!this.navigation) {
      return;
    }
    this.navigation.dispatch(StackActions.pop({ n: 1 }));
  };
}

export default new Navigation();

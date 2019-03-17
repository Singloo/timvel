import { NavigationActions, StackActions } from 'react-navigation';
class Navigation {
  navigation = null;
  setNavigation = navigation => {
    this.navigation = navigation;
  };
  navigate = (routeName, params = {}) => {
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
  replace = (routeName, params = {}) => {
    if (!this.navigation) {
      return;
    }
    const action = StackActions.replace({
      routeName,
      params,
    });
    this.navigation.dispatch(action);
  };
  reset = routeName => {
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

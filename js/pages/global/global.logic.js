import { createLogic } from 'redux-logic'

const navigate = createLogic({
  type: 'NAVIGATION_NAVIGATE',
  latest: true,
  async process({ action }, dispatch, done) {
    const { navigation, routeName, params } = action.payload;
    navigation.navigate(routeName, params || {});
    done();
  },
})

const navigateBack = createLogic({
  type: 'NAVIGATION_BACK',
  latest: true,
  async process({ action }, dispatch, done) {
    const { navigation } = action.payload;
    navigation.dispatch({
      type: 'Navigation/BACK'
    })
    done();
  },
})


export default [navigate, navigateBack]
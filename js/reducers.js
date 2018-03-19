import { combineReducers } from 'redux';
import homePage from './pages/homePage/homePage.reducer'
import rememberPage from './pages/rememberPage/remember.reducer'
import global from './pages/global/global.reducer'
import userPage from './pages/userPage/user.reducer'
import shopPage from './pages/shopPage/shopPage.reducer'
import tabbar from './pages/tabbar/tabbar.reducer'
const reducers = combineReducers({
  homePage,
  rememberPage,
  global,
  userPage,
  shopPage,
  tabbar
})

export default reducers
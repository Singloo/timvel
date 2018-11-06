import { combineReducers } from 'redux';
import homePage from './pages/homePage/homePage.reducer';
import rememberPage from './pages/rememberPage/remember.reducer';
import global from './pages/global/global.reducer';
import userPage from './pages/userPage/user.reducer';
import shopPage from './pages/shopPage/shopPage.reducer';
import tabbar from './pages/tabbar/tabbar.reducer';
import login from './pages/login/login.reducer';
import launchPage from './pages/launchPage/launchPage.reducer';
import createNew from './pages/createNew/createNew.reducer';
import alert from './pages/alert/alert.reducer';
import snakeBar from './pages/snakeBar/snakeBar.reducer';
import chooseSex from './pages/chooseSex/chooseSex.reducer';
import comment from './pages/comment/comment.reducer';
import strangerProfile from './pages/strangerProfile/strangerProfile.reducer';
import notifPage from './pages/notifPage/notifPage.reducer';
import addTag from './pages/addTag/addTag.reducer';
import publishProduct from './pages/publishProduct/publishProduct.reducer';
import testPage from './pages/testPage/testPage.reducer';
import postDetail from './pages/postDetail/postDetail.reducer';
const reducers = combineReducers({
  postDetail,
  testPage,
  publishProduct,
  homePage,
  rememberPage,
  global,
  userPage,
  shopPage,
  tabbar,
  login,
  launchPage,
  createNew,
  alert,
  snakeBar,
  chooseSex,
  comment,
  strangerProfile,
  notifPage,
  addTag,
});

export default reducers;

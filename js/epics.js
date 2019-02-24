import { combineEpics } from 'redux-observable';
import addTag from './pages/addTag/addTag.epics';
import userPage from './pages/userPage/user.epics';
import homePage from './pages/homePage/homePage.epics';
import shopPage from './pages/shopPage/shopPage.epics';
import publishProduct from './pages/publishProduct/publishProduct.epics';
import testPage from './pages/testPage/testPage.epics';
import snakeBar from './pages/snakeBar/snakeBar.epic';
import postDetail from './pages/postDetail/postDetail.epics';
import strangerProfile from './pages/strangerProfile/strangerProfile.epic';
import createNew from './pages/createNew/createNew.epic';
import global from './pages/global/global.epic';
import notifPage from './pages/notifPage/notifPage.epic';
import postReplies from './pages/postReplies/postReplies.epics';
import login from './pages/login/login.epic';
import alert from './pages/alert/alert.epic';
import comment from './pages/comment/comment.epic';
import launchPage from './pages/launchPage/launchPage.epic';
const epics = [].concat(
  launchPage,
  comment,
  alert,
  login,
  postReplies,
  global,
  strangerProfile,
  postDetail,
  snakeBar,
  addTag,
  userPage,
  homePage,
  shopPage,
  publishProduct,
  testPage,
  createNew,
  notifPage,
);
export default combineEpics(...epics);

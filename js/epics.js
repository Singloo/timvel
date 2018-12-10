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
const epics = [].concat(
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
);
export default combineEpics(...epics);

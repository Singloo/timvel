import { combineEpics } from 'redux-observable';
import addTag from './pages/addTag/addTag.epics';
import userPage from './pages/userPage/user.epics';
import homePage from './pages/homePage/homePage.epics';
import shopPage from './pages/shopPage/shopPage.epics';
import publishProduct from './pages/publishProduct/publishProduct.epics';
import testPage from './pages/testPage/testPage.epics';
import snakeBar from './pages/snakeBar/snakeBar.epic';
const epics = [].concat(
  snakeBar,
  addTag,
  userPage,
  homePage,
  shopPage,
  publishProduct,
  testPage,
);
export default combineEpics(...epics);

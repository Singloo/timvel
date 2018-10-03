import { combineEpics } from 'redux-observable';
import addTag from './pages/addTag/addTag.epics';
import userPage from './pages/userPage/user.epics';
import homePage from './pages/homePage/homePage.epics';
import shopPage from './pages/shopPage/shopPage.epics';
import publishProduct from './pages/publishProduct/publishProduct.epics';
const epics = [].concat(addTag, userPage, homePage, shopPage, publishProduct);
export default combineEpics(...epics);

import { combineEpics } from 'redux-observable';
import addTag from './pages/addTag/addTag.epics';
import userPage from './pages/userPage/user.epics';
import homePage from './pages/homePage/homePage.epics';
const epics = [].concat(addTag, userPage, homePage);
export default combineEpics(...epics);

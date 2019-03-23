import { AppRegistry } from 'react-native';
import App from './js/App';
import { name as appName } from './app.json';
// ErrorUtils.setGlobalHandler((err, isFatal) => {
//   console.warn('global', isFatal, err);
// });
AppRegistry.registerComponent(appName, () => App);

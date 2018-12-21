import { InteractionManager } from 'react-native';

const runAfter = func => () => InteractionManager.runAfterInteractions(func);

export { runAfter };

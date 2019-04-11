import { InteractionManager } from 'react-native';

const runAfter = (func: () => void) => () =>
  InteractionManager.runAfterInteractions(func);

export { runAfter };

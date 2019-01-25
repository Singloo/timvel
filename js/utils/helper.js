const invoke = (...funcs) => () => funcs.forEach(func => func && func());
const clearTimers = (...timers) =>
  timers.forEach(timer => timer && clearTimeout(timer));
const curried = (func, ctx = null) => (...args) => () =>
  func && func.apply(ctx, args);
const booleanMap = (bool, v1, v2) => (!!bool ? v1 : v2);

export { invoke, clearTimers, curried, booleanMap };

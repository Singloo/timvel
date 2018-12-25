const invoke = (...funcs) => () => funcs.forEach(func => func && func());
const clearTimers = (...timers) =>
  timers.forEach(timer => timer && clearTimeout(timer));
export { invoke, clearTimers };

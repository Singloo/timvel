const invoke = (...funcs: (() => void)[]) => () =>
  funcs.forEach(func => func && func());
const clearTimers = (...timers: NodeJS.Timeout[]) =>
  timers.forEach(timer => timer && clearTimeout(timer));
const curried = (func: (...args: (any)[]) => void, ctx = null) => (
  ...args: any[]
) => () => func && func.apply(ctx, args);
const booleanMap = (bool: any, v1: any, v2: any) => (!!bool ? v1 : v2);

export { invoke, clearTimers, curried, booleanMap };

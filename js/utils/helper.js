const invoke = (...funcs) => funcs.forEach(func => func && func());

export { invoke };

import * as ReactRedux from 'react-redux';
const logic = function(type, payload){
  return {
    type,
    payload,
  };
};

export const connect = function({
  name,
  stateMapper,
  actions = {},
  container,
}){
  if(!name){
    throw new Error('connect name is required');
  }
  if(!stateMapper){
    stateMapper = function(state){
      return {
        state: state[name],
        global: state.global,
      };
    };
  }
  const allActions = {
    ...actions,
    logic
  };
  return ReactRedux.connect(stateMapper, allActions)(container);
};
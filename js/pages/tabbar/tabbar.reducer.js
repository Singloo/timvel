const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TABBAR_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'TABBAR_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SETTING_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'SETTING_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

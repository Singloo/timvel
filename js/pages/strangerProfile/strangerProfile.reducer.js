const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'STRANGER_PROFILE_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'STRANGER_PROFILE_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

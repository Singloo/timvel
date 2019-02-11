const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'POST_REPLIES_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'POST_REPLIES_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

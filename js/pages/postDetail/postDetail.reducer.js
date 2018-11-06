const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'POST_DETAIL_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'POST_DETAIL_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

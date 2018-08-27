const initialState = {
  comments: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'COMMENT_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'COMMENT_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

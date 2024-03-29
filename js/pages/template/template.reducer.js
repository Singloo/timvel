const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SAMPLE_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'SAMPLE_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

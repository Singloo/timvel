const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LAUNCH_PAGE_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'LAUNCH_PAGE_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

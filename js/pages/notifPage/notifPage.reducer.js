const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'NOTIF_PAGE_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'NOTIF_PAGE_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

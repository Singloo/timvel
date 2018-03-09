const initialState = {
  count:20
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'HOME_PAGE_SET_STATE': {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'HOME_PAGE_RESET_STATE': {
      return initialState
    };
    default:
      return state
  }
}

export default reducer
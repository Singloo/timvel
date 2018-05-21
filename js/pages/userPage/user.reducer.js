const initialState = {
  buttonLocations: [],
  userInfo:{}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'USER_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

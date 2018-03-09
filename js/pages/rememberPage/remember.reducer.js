const initialState = {

}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REMEMBER_SET_STATE': {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'REMEMBER_RESET_STATE': {
      return initialState
    };
    default:
      return state
  }
}

export default reducer
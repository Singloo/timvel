const initialState = {
  title:'',
  content:'',
  imageUrl:'',

};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ANIMATED_POPUP_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'ANIMATED_POPUP_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

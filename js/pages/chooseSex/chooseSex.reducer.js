const initialState = {
  sex: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHOOSE_SEX_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'CHOOSE_SEX_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

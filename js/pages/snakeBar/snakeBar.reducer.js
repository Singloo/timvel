const initialState = {
  show: false,
  content: '',
  type: 'NORMAL',
  duration: 2000,
  onPress: null,
  // queue: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SNAKE_BAR_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'SNAKE_BAR_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

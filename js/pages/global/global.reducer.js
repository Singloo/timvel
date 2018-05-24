const initialState = {
  isLoading: false,
  snakeBarInfo: '',
  snakeBarType: 'normal',
  snakeBarDuration: 3000,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GLOBAL_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'GLOBAL_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

const initialState = {
  show: false,
  snakeBarInfo: '',
  snakeBarType: 'NORMAL',
  snakeBarDuration: 3000,
  onPressSnakeBar: null,
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

const initialState = {
  show: false,
  choices: [],
  cancelTitle: null,
  type: 'NORMAL',
  onCancel: null,
  content: '',
  vertical: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ALERT_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'ALERT_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

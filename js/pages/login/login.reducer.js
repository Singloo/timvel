const initialState = {
  onLoginPage: false,
  showSignUpPage: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'LOGIN_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

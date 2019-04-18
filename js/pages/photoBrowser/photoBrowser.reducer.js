const initialState = {
  imageUrls: [],
  show: false,
  onCancel: undefined,
  index: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PHOTO_BROWSER_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'PHOTO_BROWSER_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

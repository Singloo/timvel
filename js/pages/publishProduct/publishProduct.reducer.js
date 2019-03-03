const initialState = {
  title: '',
  price: '',
  description: '',
  productType: '',
  coverImage: undefined,
  keyboardDidShow: false,
  customTitle: '',
  confirmedCustomTitle: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PUBLISH_PRODUCT_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'PUBLISH_PRODUCT_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

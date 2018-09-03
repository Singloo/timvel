const initialState = {
  popularTags: [],
  searchResults: [],
  show: false,
  value: '',
  showSearch: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TAG_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'ADD_TAG_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

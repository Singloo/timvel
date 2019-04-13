/*
 * File: /Users/origami/Desktop/timvel/js/pages/postsByTag/template.reducer.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Monday April 8th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday April 13th 2019 11:19:20 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const initialState = {
  data: [],
  isLoading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'POST_BY_TAG_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'POST_BY_TAG_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

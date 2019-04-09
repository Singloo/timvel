/*
 * File: /Users/origami/Desktop/timvel/js/pages/postsByTag/template.reducer.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Monday April 8th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday April 8th 2019 10:11:28 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const initialState = {
  data:[]
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

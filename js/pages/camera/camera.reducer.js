/*
 * File: /Users/origami/Desktop/timvel/js/pages/camera/template.reducer.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Sunday April 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday April 21st 2019 1:21:50 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const initialState = {
  cameraType: 'front',
  currentImage: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CAMERA_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'CAMERA_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

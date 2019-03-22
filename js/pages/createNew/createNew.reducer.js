import Moment from 'moment';
const initialTag = { tag: '日常', popularity: 0 };
const initialState = {
  date: Moment().format('YYYY-MM-DD'),
  images: [],
  content: '',
  currentTag: initialTag,
  tags: [initialTag],
  showAddTag: false,
  weatherInfo: {},
  isFetchingWeather: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_NEW_SET_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'CREATE_NEW_RESET_STATE': {
      return initialState;
    }
    default:
      return state;
  }
}

export default reducer;

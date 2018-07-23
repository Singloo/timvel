import Moment from 'moment';
import { I18n } from '../../utils';
const initialState = {
  date: Moment().format('YYYY-MM-DD'),
  images: [],
  content: '',
  tags: [I18n.t('daily')],
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

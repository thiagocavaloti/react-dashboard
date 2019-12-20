import {
  SET_ITEM,
  MESSAGE_FETCHED_SUCCESS,
  MESSAGE_DELETED_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  fetching: true,
  items: [],
  item: {
    username: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    date: ''
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MESSAGE_FETCHED_SUCCESS:
      return { ...state, items: action.payload, fetching: false };
    case SET_ITEM:
      return { ...state, item: action.payload, fetching: false };
    case MESSAGE_DELETED_SUCCESS:
      return {
        ...state, item: null, fetching: false
      };
    default:
      return state;
  }
}

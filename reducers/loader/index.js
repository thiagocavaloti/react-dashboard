import {
  LOADED,
  LOADING
} from '../../actions';

const INITIAL_STATE = {
  loading: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADED:
      return false;
    case LOADING:
      return true;
    default:
      return state;
  }
}

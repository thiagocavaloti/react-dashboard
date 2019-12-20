import { combineReducers } from 'redux';
import loading from './loader';
import messages from './messages';

export default combineReducers({
  loading,
  messages
});

/* istanbul ignore next not testing file */
import { combineReducers } from 'redux';
import secretSanta from './secretSanta';
import notification from './notification';

/* istanbul ignore next: not testing combineReducers */
const secretSantaReducer = combineReducers({
  secretSanta, notification
});

/* istanbul ignore next: not testing export */
export default secretSantaReducer;

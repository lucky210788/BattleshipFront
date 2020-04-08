import {combineReducers} from 'redux';
import logIn from './logIn';
import users from './users';


const rootReducer = combineReducers({
  logIn,
  users
});

export default rootReducer;
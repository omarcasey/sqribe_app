// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Create this file for your user reducer

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;

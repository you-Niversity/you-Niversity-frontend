'use strict';

import { combineReducers} from 'Redux';
import userReducer from './user-reducer';
import messageReducer from './message-reducer';

var reducers = combineReducers({
  userState: userReducer,
  messageState: messageReducer
});

export default reducers;

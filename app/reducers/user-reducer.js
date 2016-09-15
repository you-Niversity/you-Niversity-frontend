'use strict';

import * as types from '../actions/action-types';

const initialState= {};

const userReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, action.user );

    case types.USER_LOGOUT_SUCCESS:
      return {};

  }
  return state;
}


export default userReducer;

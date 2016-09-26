'use strict';

import * as types from '../actions/action-types';

const initialState= {};

const messageReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.UNREAD_MESSAGES:
      return Object.assign({}, state, {unreadMessages: action.unread});

  }
  return state;
};


export default messageReducer;

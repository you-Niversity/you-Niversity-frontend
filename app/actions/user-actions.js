'use strict';
import {USER_LOGIN_SUCCESS} from './action-types';

export function userLoginSuccess(user) {
  return {

    type: USER_LOGIN_SUCCESS,
    user: user
  };
}

export function userLogoutSuccess() {
  return {
    type: types.USER_LOGOUT_SUCCESS
  };
}

'use strict';

import {UNREAD_MESSAGES} from './action-types';

export function unreadMessages(unread) {
  return {
    type: UNREAD_MESSAGES,
    unread: unread
  };
}

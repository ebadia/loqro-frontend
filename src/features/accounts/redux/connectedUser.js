// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { ACCOUNTS_CONNECTED_USER } from './constants';

export function connectedUser(user) {
  return {
    type: ACCOUNTS_CONNECTED_USER,
    user,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNTS_CONNECTED_USER:
      return {
        ...state,
        connected: action.user,
      };

    default:
      return state;
  }
}

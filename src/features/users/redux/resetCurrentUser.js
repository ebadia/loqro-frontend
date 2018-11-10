// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  USERS_RESET_CURRENT_USER,
} from './constants';

export function resetCurrentUser() {
  return {
    type: USERS_RESET_CURRENT_USER,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USERS_RESET_CURRENT_USER:
      return {
        ...state,
         currentUser: null
     };

    default:
      return state;
  }
}

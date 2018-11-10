// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { ACCOUNTS_EDIT_ACCOUNT } from './constants';

export function editAccount(account) {
  return {
    type: ACCOUNTS_EDIT_ACCOUNT,
    account,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNTS_EDIT_ACCOUNT:
      return {
        ...state,
        editting: action.account,
      };

    default:
      return state;
  }
}

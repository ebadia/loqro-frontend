// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CLIENTES_RESET_CURRENT_CLIENTE,
} from './constants';

export function resetCurrentCliente() {
  return {
    type: CLIENTES_RESET_CURRENT_CLIENTE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENTES_RESET_CURRENT_CLIENTE:
      return {
        ...state,
        currentCliente: null,
      };

    default:
      return state;
  }
}

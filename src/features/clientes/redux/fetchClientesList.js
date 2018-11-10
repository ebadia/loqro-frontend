import axios from 'axios'

import {
  CLIENTES_FETCH_CLIENTES_LIST_BEGIN,
  CLIENTES_FETCH_CLIENTES_LIST_SUCCESS,
  CLIENTES_FETCH_CLIENTES_LIST_FAILURE,
  CLIENTES_FETCH_CLIENTES_LIST_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchClientesList(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CLIENTES_FETCH_CLIENTES_LIST_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

      const doRequest = axios.get('http://localhost:3400/api/v1/clientes');
      doRequest.then(
        (res) => {
          dispatch({
            type: CLIENTES_FETCH_CLIENTES_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: CLIENTES_FETCH_CLIENTES_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchClientesListError() {
  return {
    type: CLIENTES_FETCH_CLIENTES_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENTES_FETCH_CLIENTES_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchClientesListPending: true,
        fetchClientesListError: null,
      };

    case CLIENTES_FETCH_CLIENTES_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchClientesListPending: false,
        fetchClientesListError: null,
        clientesList: action.data[0],
        clientesCount: action.data[1]
      };

    case CLIENTES_FETCH_CLIENTES_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchClientesListPending: false,
        fetchClientesListError: action.data.error,
      };

    case CLIENTES_FETCH_CLIENTES_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchClientesListError: null,
      };

    default:
      return state;
  }
}

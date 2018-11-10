import axios from 'axios';

import {
  ACCOUNTS_FETCH_DETAILS_BEGIN,
  ACCOUNTS_FETCH_DETAILS_SUCCESS,
  ACCOUNTS_FETCH_DETAILS_FAILURE,
  ACCOUNTS_FETCH_DETAILS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchDetails(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNTS_FETCH_DETAILS_BEGIN,
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
      const doRequest = axios.get(`${process.env.REACT_APP_API_URL}/accounts/${args}`);

      doRequest.then(
        res => {
          dispatch({
            type: ACCOUNTS_FETCH_DETAILS_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: ACCOUNTS_FETCH_DETAILS_FAILURE,
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
export function dismissFetchDetailsError() {
  return {
    type: ACCOUNTS_FETCH_DETAILS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNTS_FETCH_DETAILS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDetailsPending: true,
        fetchDetailsError: null,
      };

    case ACCOUNTS_FETCH_DETAILS_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchDetailsPending: false,
        fetchDetailsError: null,
        current: action.data,
      };

    case ACCOUNTS_FETCH_DETAILS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDetailsPending: false,
        fetchDetailsError: action.data.error,
      };

    case ACCOUNTS_FETCH_DETAILS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDetailsError: null,
      };

    default:
      return state;
  }
}

import axios from 'axios';

import {
  USERS_FETCH_USER_DETAILS_BEGIN,
  USERS_FETCH_USER_DETAILS_SUCCESS,
  USERS_FETCH_USER_DETAILS_FAILURE,
  USERS_FETCH_USER_DETAILS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchUserDetails(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: USERS_FETCH_USER_DETAILS_BEGIN,
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
      const doRequest = axios.get(`${process.env.REACT_APP_API_URL}/users/${args}`);

      doRequest.then(
        res => {
          const user = res.data;
          // eliminar los null del retorno de backend para el formulario Formik
          const obj = {};
          Object.keys(user).map(item => (user[item] ? (obj[item] = user[item]) : (obj[item] = '')));

          dispatch({
            type: USERS_FETCH_USER_DETAILS_SUCCESS,
            data: obj,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: USERS_FETCH_USER_DETAILS_FAILURE,
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
export function dismissFetchUserDetailsError() {
  return {
    type: USERS_FETCH_USER_DETAILS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USERS_FETCH_USER_DETAILS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchUserDetailsPending: true,
        fetchUserDetailsError: null,
      };

    case USERS_FETCH_USER_DETAILS_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchUserDetailsPending: false,
        fetchUserDetailsError: null,
        currentUser: action.data,
      };

    case USERS_FETCH_USER_DETAILS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchUserDetailsPending: false,
        fetchUserDetailsError: action.data.error,
      };

    case USERS_FETCH_USER_DETAILS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchUserDetailsError: null,
      };

    default:
      return state;
  }
}

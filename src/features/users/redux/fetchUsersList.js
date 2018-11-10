import axios from 'axios';

import {
  USERS_FETCH_USERS_LIST_BEGIN,
  USERS_FETCH_USERS_LIST_SUCCESS,
  USERS_FETCH_USERS_LIST_FAILURE,
  USERS_FETCH_USERS_LIST_DISMISS_ERROR,
} from './constants';


// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchUsersList(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: USERS_FETCH_USERS_LIST_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      // const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

      const doRequest = axios.get(process.env.REACT_APP_API_URL + '/users');

      doRequest.then(
        (res) => {
          dispatch({
            type: USERS_FETCH_USERS_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: USERS_FETCH_USERS_LIST_FAILURE,
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
export function dismissFetchUsersListError() {
  return {
    type: USERS_FETCH_USERS_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USERS_FETCH_USERS_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchUsersListPending: true,
        fetchUsersListError: null,
      };

    case USERS_FETCH_USERS_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        usersList: action.data[0],
        usersCount: action.data[1],
        fetchUsersListPending: false,
        fetchUsersListError: null,
      };

    case USERS_FETCH_USERS_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchUsersListPending: false,
        fetchUsersListError: action.data.error,
      };

    case USERS_FETCH_USERS_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchUsersListError: null,
      };

    default:
      return state;
  }
}

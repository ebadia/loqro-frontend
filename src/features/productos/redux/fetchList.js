import axios from 'axios';
import * as moment from 'moment';

import {
  FETCH_LIST_BEGIN,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  FETCH_LIST_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchList(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: FETCH_LIST_BEGIN,
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

      const doRequest = axios.get(process.env.REACT_APP_API_URL + '/productos');

      doRequest.then(
        res => {
          // const obj = res.data[0].map(item => {
          //   /**
          //    * marca los productos como activos
          //    */
          //   const activo =
          //     (item.hasta === '' && moment().isSameOrAfter(moment(item.desde))) ||
          //     (item.hasta !== '' &&
          //       (moment().isSameOrAfter(moment(item.desde)) &&
          //         moment().isSameOrBefore(moment(item.hasta)))) ||
          //     false;
          //   return { ...item, activo };
          // });
          // console.log('item :', obj);
          dispatch({
            type: FETCH_LIST_SUCCESS,
            // data: [obj, res.data[1]],
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: FETCH_LIST_FAILURE,
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
export function dismissFetchListError() {
  return {
    type: FETCH_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchListPending: true,
        fetchListError: null,
      };

    case FETCH_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        list: action.data[0],
        count: action.data[1],
        fetchListPending: false,
        fetchListError: null,
      };

    case FETCH_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchListPending: false,
        fetchListError: action.data.error,
      };

    case FETCH_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchListError: null,
      };

    default:
      return state;
  }
}

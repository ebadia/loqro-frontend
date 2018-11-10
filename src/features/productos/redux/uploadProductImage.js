import axios from 'axios';

import {
  PRODUCTOS_UPLOAD_PRODUCT_IMAGE_BEGIN,
  PRODUCTOS_UPLOAD_PRODUCT_IMAGE_SUCCESS,
  PRODUCTOS_UPLOAD_PRODUCT_IMAGE_FAILURE,
  PRODUCTOS_UPLOAD_PRODUCT_IMAGE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function uploadProductImage(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_BEGIN,
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

      const doRequest = axios.post(
        `${process.env.REACT_APP_API_URL}/productos/upload/${args.id}`,
        args.file,
      );

      doRequest.then(
        res => {
          console.log('res from uopload :', res);
          dispatch({
            type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_FAILURE,
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
export function dismissUploadProductImageError() {
  return {
    type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRODUCTOS_UPLOAD_PRODUCT_IMAGE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        uploadProductImagePending: true,
        uploadProductImageError: null,
      };

    case PRODUCTOS_UPLOAD_PRODUCT_IMAGE_SUCCESS:
      // The request is success
      return {
        ...state,
        uploadProductImagePending: false,
        uploadProductImageError: null,
        current: action.data,
      };

    case PRODUCTOS_UPLOAD_PRODUCT_IMAGE_FAILURE:
      // The request is failed
      return {
        ...state,
        uploadProductImagePending: false,
        uploadProductImageError: action.data.error,
      };

    case PRODUCTOS_UPLOAD_PRODUCT_IMAGE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        uploadProductImageError: null,
      };

    default:
      return state;
  }
}

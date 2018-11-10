import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRODUCTOS_UPLOAD_PRODUCT_IMAGE_BEGIN,
  PRODUCTOS_UPLOAD_PRODUCT_IMAGE_SUCCESS,
  PRODUCTOS_UPLOAD_PRODUCT_IMAGE_FAILURE,
  PRODUCTOS_UPLOAD_PRODUCT_IMAGE_DISMISS_ERROR,
} from '../../../../src/features/productos/redux/constants';

import {
  uploadProductImage,
  dismissUploadProductImageError,
  reducer,
} from '../../../../src/features/productos/redux/uploadProductImage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('productos/redux/uploadProductImage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when uploadProductImage succeeds', () => {
    const store = mockStore({});

    return store.dispatch(uploadProductImage())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRODUCTOS_UPLOAD_PRODUCT_IMAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRODUCTOS_UPLOAD_PRODUCT_IMAGE_SUCCESS);
      });
  });

  it('dispatches failure action when uploadProductImage fails', () => {
    const store = mockStore({});

    return store.dispatch(uploadProductImage({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRODUCTOS_UPLOAD_PRODUCT_IMAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRODUCTOS_UPLOAD_PRODUCT_IMAGE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUploadProductImageError', () => {
    const expectedAction = {
      type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_DISMISS_ERROR,
    };
    expect(dismissUploadProductImageError()).toEqual(expectedAction);
  });

  it('handles action type PRODUCTOS_UPLOAD_PRODUCT_IMAGE_BEGIN correctly', () => {
    const prevState = { uploadProductImagePending: false };
    const state = reducer(
      prevState,
      { type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadProductImagePending).toBe(true);
  });

  it('handles action type PRODUCTOS_UPLOAD_PRODUCT_IMAGE_SUCCESS correctly', () => {
    const prevState = { uploadProductImagePending: true };
    const state = reducer(
      prevState,
      { type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadProductImagePending).toBe(false);
  });

  it('handles action type PRODUCTOS_UPLOAD_PRODUCT_IMAGE_FAILURE correctly', () => {
    const prevState = { uploadProductImagePending: true };
    const state = reducer(
      prevState,
      { type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadProductImagePending).toBe(false);
    expect(state.uploadProductImageError).toEqual(expect.anything());
  });

  it('handles action type PRODUCTOS_UPLOAD_PRODUCT_IMAGE_DISMISS_ERROR correctly', () => {
    const prevState = { uploadProductImageError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRODUCTOS_UPLOAD_PRODUCT_IMAGE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadProductImageError).toBe(null);
  });
});


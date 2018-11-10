import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRODUCTOS_DELETE_PRODUCT_IMAGE_BEGIN,
  PRODUCTOS_DELETE_PRODUCT_IMAGE_SUCCESS,
  PRODUCTOS_DELETE_PRODUCT_IMAGE_FAILURE,
  PRODUCTOS_DELETE_PRODUCT_IMAGE_DISMISS_ERROR,
} from '../../../../src/features/productos/redux/constants';

import {
  deleteProductImage,
  dismissDeleteProductImageError,
  reducer,
} from '../../../../src/features/productos/redux/deleteProductImage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('productos/redux/deleteProductImage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteProductImage succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteProductImage())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRODUCTOS_DELETE_PRODUCT_IMAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRODUCTOS_DELETE_PRODUCT_IMAGE_SUCCESS);
      });
  });

  it('dispatches failure action when deleteProductImage fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteProductImage({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRODUCTOS_DELETE_PRODUCT_IMAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRODUCTOS_DELETE_PRODUCT_IMAGE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteProductImageError', () => {
    const expectedAction = {
      type: PRODUCTOS_DELETE_PRODUCT_IMAGE_DISMISS_ERROR,
    };
    expect(dismissDeleteProductImageError()).toEqual(expectedAction);
  });

  it('handles action type PRODUCTOS_DELETE_PRODUCT_IMAGE_BEGIN correctly', () => {
    const prevState = { deleteProductImagePending: false };
    const state = reducer(
      prevState,
      { type: PRODUCTOS_DELETE_PRODUCT_IMAGE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteProductImagePending).toBe(true);
  });

  it('handles action type PRODUCTOS_DELETE_PRODUCT_IMAGE_SUCCESS correctly', () => {
    const prevState = { deleteProductImagePending: true };
    const state = reducer(
      prevState,
      { type: PRODUCTOS_DELETE_PRODUCT_IMAGE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteProductImagePending).toBe(false);
  });

  it('handles action type PRODUCTOS_DELETE_PRODUCT_IMAGE_FAILURE correctly', () => {
    const prevState = { deleteProductImagePending: true };
    const state = reducer(
      prevState,
      { type: PRODUCTOS_DELETE_PRODUCT_IMAGE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteProductImagePending).toBe(false);
    expect(state.deleteProductImageError).toEqual(expect.anything());
  });

  it('handles action type PRODUCTOS_DELETE_PRODUCT_IMAGE_DISMISS_ERROR correctly', () => {
    const prevState = { deleteProductImageError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRODUCTOS_DELETE_PRODUCT_IMAGE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteProductImageError).toBe(null);
  });
});


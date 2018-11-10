import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENTES_SAVE_CLIENTE_DETAILS_BEGIN,
  CLIENTES_SAVE_CLIENTE_DETAILS_SUCCESS,
  CLIENTES_SAVE_CLIENTE_DETAILS_FAILURE,
  CLIENTES_SAVE_CLIENTE_DETAILS_DISMISS_ERROR,
} from '../../../../src/features/clientes/redux/constants';

import {
  saveClienteDetails,
  dismissSaveClienteDetailsError,
  reducer,
} from '../../../../src/features/clientes/redux/saveClienteDetails';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clientes/redux/saveClienteDetails', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveClienteDetails succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveClienteDetails())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENTES_SAVE_CLIENTE_DETAILS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENTES_SAVE_CLIENTE_DETAILS_SUCCESS);
      });
  });

  it('dispatches failure action when saveClienteDetails fails', () => {
    const store = mockStore({});

    return store.dispatch(saveClienteDetails({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENTES_SAVE_CLIENTE_DETAILS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENTES_SAVE_CLIENTE_DETAILS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveClienteDetailsError', () => {
    const expectedAction = {
      type: CLIENTES_SAVE_CLIENTE_DETAILS_DISMISS_ERROR,
    };
    expect(dismissSaveClienteDetailsError()).toEqual(expectedAction);
  });

  it('handles action type CLIENTES_SAVE_CLIENTE_DETAILS_BEGIN correctly', () => {
    const prevState = { saveClienteDetailsPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTES_SAVE_CLIENTE_DETAILS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveClienteDetailsPending).toBe(true);
  });

  it('handles action type CLIENTES_SAVE_CLIENTE_DETAILS_SUCCESS correctly', () => {
    const prevState = { saveClienteDetailsPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTES_SAVE_CLIENTE_DETAILS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveClienteDetailsPending).toBe(false);
  });

  it('handles action type CLIENTES_SAVE_CLIENTE_DETAILS_FAILURE correctly', () => {
    const prevState = { saveClienteDetailsPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTES_SAVE_CLIENTE_DETAILS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveClienteDetailsPending).toBe(false);
    expect(state.saveClienteDetailsError).toEqual(expect.anything());
  });

  it('handles action type CLIENTES_SAVE_CLIENTE_DETAILS_DISMISS_ERROR correctly', () => {
    const prevState = { saveClienteDetailsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTES_SAVE_CLIENTE_DETAILS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveClienteDetailsError).toBe(null);
  });
});


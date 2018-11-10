import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENTES_FETCH_CLIENTE_DETAILS_BEGIN,
  CLIENTES_FETCH_CLIENTE_DETAILS_SUCCESS,
  CLIENTES_FETCH_CLIENTE_DETAILS_FAILURE,
  CLIENTES_FETCH_CLIENTE_DETAILS_DISMISS_ERROR,
} from '../../../../src/features/clientes/redux/constants';

import {
  fetchClienteDetails,
  dismissFetchClienteDetailsError,
  reducer,
} from '../../../../src/features/clientes/redux/fetchClienteDetails';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clientes/redux/fetchClienteDetails', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchClienteDetails succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchClienteDetails())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENTES_FETCH_CLIENTE_DETAILS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENTES_FETCH_CLIENTE_DETAILS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchClienteDetails fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchClienteDetails({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENTES_FETCH_CLIENTE_DETAILS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENTES_FETCH_CLIENTE_DETAILS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchClienteDetailsError', () => {
    const expectedAction = {
      type: CLIENTES_FETCH_CLIENTE_DETAILS_DISMISS_ERROR,
    };
    expect(dismissFetchClienteDetailsError()).toEqual(expectedAction);
  });

  it('handles action type CLIENTES_FETCH_CLIENTE_DETAILS_BEGIN correctly', () => {
    const prevState = { fetchClienteDetailsPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTES_FETCH_CLIENTE_DETAILS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchClienteDetailsPending).toBe(true);
  });

  it('handles action type CLIENTES_FETCH_CLIENTE_DETAILS_SUCCESS correctly', () => {
    const prevState = { fetchClienteDetailsPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTES_FETCH_CLIENTE_DETAILS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchClienteDetailsPending).toBe(false);
  });

  it('handles action type CLIENTES_FETCH_CLIENTE_DETAILS_FAILURE correctly', () => {
    const prevState = { fetchClienteDetailsPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTES_FETCH_CLIENTE_DETAILS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchClienteDetailsPending).toBe(false);
    expect(state.fetchClienteDetailsError).toEqual(expect.anything());
  });

  it('handles action type CLIENTES_FETCH_CLIENTE_DETAILS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchClienteDetailsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTES_FETCH_CLIENTE_DETAILS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchClienteDetailsError).toBe(null);
  });
});


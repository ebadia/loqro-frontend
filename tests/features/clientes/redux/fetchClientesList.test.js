import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENTES_FETCH_CLIENTES_LIST_BEGIN,
  CLIENTES_FETCH_CLIENTES_LIST_SUCCESS,
  CLIENTES_FETCH_CLIENTES_LIST_FAILURE,
  CLIENTES_FETCH_CLIENTES_LIST_DISMISS_ERROR,
} from '../../../../src/features/clientes/redux/constants';

import {
  fetchClientesList,
  dismissFetchClientesListError,
  reducer,
} from '../../../../src/features/clientes/redux/fetchClientesList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clientes/redux/fetchClientesList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchClientesList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchClientesList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENTES_FETCH_CLIENTES_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENTES_FETCH_CLIENTES_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchClientesList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchClientesList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENTES_FETCH_CLIENTES_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENTES_FETCH_CLIENTES_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchClientesListError', () => {
    const expectedAction = {
      type: CLIENTES_FETCH_CLIENTES_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchClientesListError()).toEqual(expectedAction);
  });

  it('handles action type CLIENTES_FETCH_CLIENTES_LIST_BEGIN correctly', () => {
    const prevState = { fetchClientesListPending: false };
    const state = reducer(
      prevState,
      { type: CLIENTES_FETCH_CLIENTES_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchClientesListPending).toBe(true);
  });

  it('handles action type CLIENTES_FETCH_CLIENTES_LIST_SUCCESS correctly', () => {
    const prevState = { fetchClientesListPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTES_FETCH_CLIENTES_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchClientesListPending).toBe(false);
  });

  it('handles action type CLIENTES_FETCH_CLIENTES_LIST_FAILURE correctly', () => {
    const prevState = { fetchClientesListPending: true };
    const state = reducer(
      prevState,
      { type: CLIENTES_FETCH_CLIENTES_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchClientesListPending).toBe(false);
    expect(state.fetchClientesListError).toEqual(expect.anything());
  });

  it('handles action type CLIENTES_FETCH_CLIENTES_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchClientesListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTES_FETCH_CLIENTES_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchClientesListError).toBe(null);
  });
});


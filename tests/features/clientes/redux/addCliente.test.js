import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENTES_ADD_CLIENTE_BEGIN,
  CLIENTES_ADD_CLIENTE_SUCCESS,
  CLIENTES_ADD_CLIENTE_FAILURE,
  CLIENTES_ADD_CLIENTE_DISMISS_ERROR,
} from '../../../../src/features/clientes/redux/constants';

import {
  addCliente,
  dismissAddClienteError,
  reducer,
} from '../../../../src/features/clientes/redux/addCliente';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('clientes/redux/addCliente', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addCliente succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addCliente())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENTES_ADD_CLIENTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENTES_ADD_CLIENTE_SUCCESS);
      });
  });

  it('dispatches failure action when addCliente fails', () => {
    const store = mockStore({});

    return store.dispatch(addCliente({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENTES_ADD_CLIENTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENTES_ADD_CLIENTE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddClienteError', () => {
    const expectedAction = {
      type: CLIENTES_ADD_CLIENTE_DISMISS_ERROR,
    };
    expect(dismissAddClienteError()).toEqual(expectedAction);
  });

  it('handles action type CLIENTES_ADD_CLIENTE_BEGIN correctly', () => {
    const prevState = { addClientePending: false };
    const state = reducer(
      prevState,
      { type: CLIENTES_ADD_CLIENTE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addClientePending).toBe(true);
  });

  it('handles action type CLIENTES_ADD_CLIENTE_SUCCESS correctly', () => {
    const prevState = { addClientePending: true };
    const state = reducer(
      prevState,
      { type: CLIENTES_ADD_CLIENTE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addClientePending).toBe(false);
  });

  it('handles action type CLIENTES_ADD_CLIENTE_FAILURE correctly', () => {
    const prevState = { addClientePending: true };
    const state = reducer(
      prevState,
      { type: CLIENTES_ADD_CLIENTE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addClientePending).toBe(false);
    expect(state.addClienteError).toEqual(expect.anything());
  });

  it('handles action type CLIENTES_ADD_CLIENTE_DISMISS_ERROR correctly', () => {
    const prevState = { addClienteError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENTES_ADD_CLIENTE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addClienteError).toBe(null);
  });
});


import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ACCOUNTS_CREAR_CUENTA_BEGIN,
  ACCOUNTS_CREAR_CUENTA_SUCCESS,
  ACCOUNTS_CREAR_CUENTA_FAILURE,
  ACCOUNTS_CREAR_CUENTA_DISMISS_ERROR,
} from '../../../../src/features/accounts/redux/constants';

import {
  crearCuenta,
  dismissCrearCuentaError,
  reducer,
} from '../../../../src/features/accounts/redux/crearCuenta';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('accounts/redux/crearCuenta', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when crearCuenta succeeds', () => {
    const store = mockStore({});

    return store.dispatch(crearCuenta())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCOUNTS_CREAR_CUENTA_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCOUNTS_CREAR_CUENTA_SUCCESS);
      });
  });

  it('dispatches failure action when crearCuenta fails', () => {
    const store = mockStore({});

    return store.dispatch(crearCuenta({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCOUNTS_CREAR_CUENTA_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCOUNTS_CREAR_CUENTA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCrearCuentaError', () => {
    const expectedAction = {
      type: ACCOUNTS_CREAR_CUENTA_DISMISS_ERROR,
    };
    expect(dismissCrearCuentaError()).toEqual(expectedAction);
  });

  it('handles action type ACCOUNTS_CREAR_CUENTA_BEGIN correctly', () => {
    const prevState = { crearCuentaPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_CREAR_CUENTA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.crearCuentaPending).toBe(true);
  });

  it('handles action type ACCOUNTS_CREAR_CUENTA_SUCCESS correctly', () => {
    const prevState = { crearCuentaPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_CREAR_CUENTA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.crearCuentaPending).toBe(false);
  });

  it('handles action type ACCOUNTS_CREAR_CUENTA_FAILURE correctly', () => {
    const prevState = { crearCuentaPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_CREAR_CUENTA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.crearCuentaPending).toBe(false);
    expect(state.crearCuentaError).toEqual(expect.anything());
  });

  it('handles action type ACCOUNTS_CREAR_CUENTA_DISMISS_ERROR correctly', () => {
    const prevState = { crearCuentaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_CREAR_CUENTA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.crearCuentaError).toBe(null);
  });
});


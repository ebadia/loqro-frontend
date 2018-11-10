import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ACCOUNTS_GUARDAR_CUENTA_BEGIN,
  ACCOUNTS_GUARDAR_CUENTA_SUCCESS,
  ACCOUNTS_GUARDAR_CUENTA_FAILURE,
  ACCOUNTS_GUARDAR_CUENTA_DISMISS_ERROR,
} from '../../../../src/features/accounts/redux/constants';

import {
  guardarCuenta,
  dismissGuardarCuentaError,
  reducer,
} from '../../../../src/features/accounts/redux/guardarCuenta';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('accounts/redux/guardarCuenta', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when guardarCuenta succeeds', () => {
    const store = mockStore({});

    return store.dispatch(guardarCuenta())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCOUNTS_GUARDAR_CUENTA_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCOUNTS_GUARDAR_CUENTA_SUCCESS);
      });
  });

  it('dispatches failure action when guardarCuenta fails', () => {
    const store = mockStore({});

    return store.dispatch(guardarCuenta({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCOUNTS_GUARDAR_CUENTA_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCOUNTS_GUARDAR_CUENTA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGuardarCuentaError', () => {
    const expectedAction = {
      type: ACCOUNTS_GUARDAR_CUENTA_DISMISS_ERROR,
    };
    expect(dismissGuardarCuentaError()).toEqual(expectedAction);
  });

  it('handles action type ACCOUNTS_GUARDAR_CUENTA_BEGIN correctly', () => {
    const prevState = { guardarCuentaPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GUARDAR_CUENTA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarCuentaPending).toBe(true);
  });

  it('handles action type ACCOUNTS_GUARDAR_CUENTA_SUCCESS correctly', () => {
    const prevState = { guardarCuentaPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GUARDAR_CUENTA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarCuentaPending).toBe(false);
  });

  it('handles action type ACCOUNTS_GUARDAR_CUENTA_FAILURE correctly', () => {
    const prevState = { guardarCuentaPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GUARDAR_CUENTA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarCuentaPending).toBe(false);
    expect(state.guardarCuentaError).toEqual(expect.anything());
  });

  it('handles action type ACCOUNTS_GUARDAR_CUENTA_DISMISS_ERROR correctly', () => {
    const prevState = { guardarCuentaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GUARDAR_CUENTA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarCuentaError).toBe(null);
  });
});


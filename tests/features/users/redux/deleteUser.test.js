import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  USERS_DELETE_USER_BEGIN,
  USERS_DELETE_USER_SUCCESS,
  USERS_DELETE_USER_FAILURE,
  USERS_DELETE_USER_DISMISS_ERROR,
} from '../../../../src/features/users/redux/constants';

import {
  deleteUser,
  dismissDeleteUserError,
  reducer,
} from '../../../../src/features/users/redux/deleteUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('users/redux/deleteUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USERS_DELETE_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', USERS_DELETE_USER_SUCCESS);
      });
  });

  it('dispatches failure action when deleteUser fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USERS_DELETE_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', USERS_DELETE_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteUserError', () => {
    const expectedAction = {
      type: USERS_DELETE_USER_DISMISS_ERROR,
    };
    expect(dismissDeleteUserError()).toEqual(expectedAction);
  });

  it('handles action type USERS_DELETE_USER_BEGIN correctly', () => {
    const prevState = { deleteUserPending: false };
    const state = reducer(
      prevState,
      { type: USERS_DELETE_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserPending).toBe(true);
  });

  it('handles action type USERS_DELETE_USER_SUCCESS correctly', () => {
    const prevState = { deleteUserPending: true };
    const state = reducer(
      prevState,
      { type: USERS_DELETE_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserPending).toBe(false);
  });

  it('handles action type USERS_DELETE_USER_FAILURE correctly', () => {
    const prevState = { deleteUserPending: true };
    const state = reducer(
      prevState,
      { type: USERS_DELETE_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserPending).toBe(false);
    expect(state.deleteUserError).toEqual(expect.anything());
  });

  it('handles action type USERS_DELETE_USER_DISMISS_ERROR correctly', () => {
    const prevState = { deleteUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USERS_DELETE_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserError).toBe(null);
  });
});


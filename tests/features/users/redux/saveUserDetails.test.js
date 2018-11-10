import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  USERS_SAVE_USER_DETAILS_BEGIN,
  USERS_SAVE_USER_DETAILS_SUCCESS,
  USERS_SAVE_USER_DETAILS_FAILURE,
  USERS_SAVE_USER_DETAILS_DISMISS_ERROR,
} from '../../../../src/features/users/redux/constants';

import {
  saveUserDetails,
  dismissSaveUserDetailsError,
  reducer,
} from '../../../../src/features/users/redux/saveUserDetails';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('users/redux/saveUserDetails', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveUserDetails succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveUserDetails())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USERS_SAVE_USER_DETAILS_BEGIN);
        expect(actions[1]).toHaveProperty('type', USERS_SAVE_USER_DETAILS_SUCCESS);
      });
  });

  it('dispatches failure action when saveUserDetails fails', () => {
    const store = mockStore({});

    return store.dispatch(saveUserDetails({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USERS_SAVE_USER_DETAILS_BEGIN);
        expect(actions[1]).toHaveProperty('type', USERS_SAVE_USER_DETAILS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveUserDetailsError', () => {
    const expectedAction = {
      type: USERS_SAVE_USER_DETAILS_DISMISS_ERROR,
    };
    expect(dismissSaveUserDetailsError()).toEqual(expectedAction);
  });

  it('handles action type USERS_SAVE_USER_DETAILS_BEGIN correctly', () => {
    const prevState = { saveUserDetailsPending: false };
    const state = reducer(
      prevState,
      { type: USERS_SAVE_USER_DETAILS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveUserDetailsPending).toBe(true);
  });

  it('handles action type USERS_SAVE_USER_DETAILS_SUCCESS correctly', () => {
    const prevState = { saveUserDetailsPending: true };
    const state = reducer(
      prevState,
      { type: USERS_SAVE_USER_DETAILS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveUserDetailsPending).toBe(false);
  });

  it('handles action type USERS_SAVE_USER_DETAILS_FAILURE correctly', () => {
    const prevState = { saveUserDetailsPending: true };
    const state = reducer(
      prevState,
      { type: USERS_SAVE_USER_DETAILS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveUserDetailsPending).toBe(false);
    expect(state.saveUserDetailsError).toEqual(expect.anything());
  });

  it('handles action type USERS_SAVE_USER_DETAILS_DISMISS_ERROR correctly', () => {
    const prevState = { saveUserDetailsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USERS_SAVE_USER_DETAILS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveUserDetailsError).toBe(null);
  });
});


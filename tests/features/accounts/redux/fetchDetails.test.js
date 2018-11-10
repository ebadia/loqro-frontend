import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ACCOUNTS_FETCH_DETAILS_BEGIN,
  ACCOUNTS_FETCH_DETAILS_SUCCESS,
  ACCOUNTS_FETCH_DETAILS_FAILURE,
  ACCOUNTS_FETCH_DETAILS_DISMISS_ERROR,
} from '../../../../src/features/accounts/redux/constants';

import {
  fetchDetails,
  dismissFetchDetailsError,
  reducer,
} from '../../../../src/features/accounts/redux/fetchDetails';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('accounts/redux/fetchDetails', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchDetails succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchDetails())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCOUNTS_FETCH_DETAILS_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCOUNTS_FETCH_DETAILS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchDetails fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchDetails({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCOUNTS_FETCH_DETAILS_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCOUNTS_FETCH_DETAILS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchDetailsError', () => {
    const expectedAction = {
      type: ACCOUNTS_FETCH_DETAILS_DISMISS_ERROR,
    };
    expect(dismissFetchDetailsError()).toEqual(expectedAction);
  });

  it('handles action type ACCOUNTS_FETCH_DETAILS_BEGIN correctly', () => {
    const prevState = { fetchDetailsPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_FETCH_DETAILS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDetailsPending).toBe(true);
  });

  it('handles action type ACCOUNTS_FETCH_DETAILS_SUCCESS correctly', () => {
    const prevState = { fetchDetailsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_FETCH_DETAILS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDetailsPending).toBe(false);
  });

  it('handles action type ACCOUNTS_FETCH_DETAILS_FAILURE correctly', () => {
    const prevState = { fetchDetailsPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_FETCH_DETAILS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDetailsPending).toBe(false);
    expect(state.fetchDetailsError).toEqual(expect.anything());
  });

  it('handles action type ACCOUNTS_FETCH_DETAILS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchDetailsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_FETCH_DETAILS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDetailsError).toBe(null);
  });
});


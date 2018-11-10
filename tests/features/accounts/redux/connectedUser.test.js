import {
  ACCOUNTS_CONNECTED_USER,
} from '../../../../src/features/accounts/redux/constants';

import {
  connectedUser,
  reducer,
} from '../../../../src/features/accounts/redux/connectedUser';

describe('accounts/redux/connectedUser', () => {
  it('returns correct action by connectedUser', () => {
    expect(connectedUser()).toHaveProperty('type', ACCOUNTS_CONNECTED_USER);
  });

  it('handles action type ACCOUNTS_CONNECTED_USER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ACCOUNTS_CONNECTED_USER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

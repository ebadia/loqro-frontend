import {
  ACCOUNTS_LOGOUT,
} from '../../../../src/features/accounts/redux/constants';

import {
  logout,
  reducer,
} from '../../../../src/features/accounts/redux/logout';

describe('accounts/redux/logout', () => {
  it('returns correct action by logout', () => {
    expect(logout()).toHaveProperty('type', ACCOUNTS_LOGOUT);
  });

  it('handles action type ACCOUNTS_LOGOUT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ACCOUNTS_LOGOUT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

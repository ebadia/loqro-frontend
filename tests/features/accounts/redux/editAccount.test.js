import {
  ACCOUNTS_EDIT_ACCOUNT,
} from '../../../../src/features/accounts/redux/constants';

import {
  editAccount,
  reducer,
} from '../../../../src/features/accounts/redux/editAccount';

describe('accounts/redux/editAccount', () => {
  it('returns correct action by editAccount', () => {
    expect(editAccount()).toHaveProperty('type', ACCOUNTS_EDIT_ACCOUNT);
  });

  it('handles action type ACCOUNTS_EDIT_ACCOUNT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ACCOUNTS_EDIT_ACCOUNT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

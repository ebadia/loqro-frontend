import {
  USERS_RESET_CURRENT_USER,
} from '../../../../src/features/users/redux/constants';

import {
  resetCurrentUser,
  reducer,
} from '../../../../src/features/users/redux/resetCurrentUser';

describe('users/redux/resetCurrentUser', () => {
  it('returns correct action by resetCurrentUser', () => {
    expect(resetCurrentUser()).toHaveProperty('type', USERS_RESET_CURRENT_USER);
  });

  it('handles action type USERS_RESET_CURRENT_USER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: USERS_RESET_CURRENT_USER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

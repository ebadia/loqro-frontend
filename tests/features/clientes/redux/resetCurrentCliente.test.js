import {
  CLIENTES_RESET_CURRENT_CLIENTE,
} from '../../../../src/features/clientes/redux/constants';

import {
  resetCurrentCliente,
  reducer,
} from '../../../../src/features/clientes/redux/resetCurrentCliente';

describe('clientes/redux/resetCurrentCliente', () => {
  it('returns correct action by resetCurrentCliente', () => {
    expect(resetCurrentCliente()).toHaveProperty('type', CLIENTES_RESET_CURRENT_CLIENTE);
  });

  it('handles action type CLIENTES_RESET_CURRENT_CLIENTE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENTES_RESET_CURRENT_CLIENTE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});

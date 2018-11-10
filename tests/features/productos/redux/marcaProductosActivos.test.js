import { PRODUCTOS_MARCA_PRODUCTOS_ACTIVOS } from '../../../../src/features/productos/redux/constants';

import {
  marcaProductosActivos,
  reducer,
} from '../../../../src/features/productos/redux/marcaProductosActivos';

describe('productos/redux/marcaProductosActivos', () => {
  it('returns correct action by marcaProductosActivos', () => {
    expect(marcaProductosActivos()).toHaveProperty('type', PRODUCTOS_MARCA_PRODUCTOS_ACTIVOS);
  });

  it('handles action type PRODUCTOS_MARCA_PRODUCTOS_ACTIVOS correctly', () => {
    const prevState = { list: [{ desde: '2018-11-01' }] };
    const state = reducer(prevState, { type: PRODUCTOS_MARCA_PRODUCTOS_ACTIVOS });
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = { list: [{ desde: '2018-11-01', activo: true }] };
    expect(state).toEqual(expectedState);
  });
});

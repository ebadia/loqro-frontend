// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da
import moment from 'moment';
import { PRODUCTOS_MARCA_PRODUCTOS_ACTIVOS } from './constants';

export function marcaProductosActivos() {
  return {
    type: PRODUCTOS_MARCA_PRODUCTOS_ACTIVOS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRODUCTOS_MARCA_PRODUCTOS_ACTIVOS:
      /**
       * marca los productos como activos
       */
      const obj = state.list.map(item => {
        const activo =
          (!item.hasta && moment().isSameOrAfter(moment(item.desde))) ||
          (item.hasta &&
            (moment().isSameOrAfter(moment(item.desde)) &&
              moment().isSameOrBefore(moment(item.hasta)))) ||
          false;
        return { ...item, activo };
      });

      return {
        ...state,
        list: obj,
      };

    default:
      return state;
  }
}

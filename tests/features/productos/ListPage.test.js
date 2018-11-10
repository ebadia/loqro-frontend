import React from 'react';
import { shallow } from 'enzyme';
import { ListPage } from '../../../src/features/productos/ListPage';

describe('productos/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      productos: { list: [] },
      actions: {},
    };
    const renderedComponent = shallow(<ListPage {...props} />);

    expect(renderedComponent.find('.products-list-page').length).toBe(1);
  });
});

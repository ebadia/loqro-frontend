import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/productos/DefaultPage';

describe('productos/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      productos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.productos-default-page').length
    ).toBe(1);
  });
});

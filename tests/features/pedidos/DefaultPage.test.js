import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/pedidos/DefaultPage';

describe('pedidos/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      pedidos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.pedidos-default-page').length
    ).toBe(1);
  });
});

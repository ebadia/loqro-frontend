import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/clientes/DefaultPage';

describe('clientes/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientes: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.clientes-default-page').length
    ).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/accounts/DefaultPage';

describe('accounts/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      accounts: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.accounts-default-page').length
    ).toBe(1);
  });
});

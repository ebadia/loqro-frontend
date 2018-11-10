import React from 'react';
import { shallow } from 'enzyme';
import { AccountDetails } from '../../../src/features/accounts/AccountDetails';

describe('accounts/AccountDetails', () => {
  it('renders node with correct class name', () => {
    const props = {
      accounts: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AccountDetails {...props} />
    );

    expect(
      renderedComponent.find('.accounts-account-details').length
    ).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { AccountsForm } from '../../../src/features/accounts';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AccountsForm />);
  expect(renderedComponent.find('.accounts-accounts-form').length).toBe(1);
});

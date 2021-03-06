import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/accounts';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Login />);
  expect(renderedComponent.find('.accounts-login').length).toBe(1);
});

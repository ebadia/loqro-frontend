import React from 'react';
import { shallow } from 'enzyme';
import { UserForm } from '../../../src/features/users';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UserForm />);
  expect(renderedComponent.find('.users-user-form').length).toBe(1);
});

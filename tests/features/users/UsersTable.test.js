import React from 'react';
import { shallow } from 'enzyme';
import { UsersTable } from '../../../src/features/users';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UsersTable />);
  expect(renderedComponent.find('.users-users-table').length).toBe(1);
});

import React from 'react';
import { shallow } from 'enzyme';
import { UsersListPage } from '../../../src/features/users/UsersListPage';

describe('users/UsersListPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UsersListPage {...props} />
    );

    expect(
      renderedComponent.find('.users-users-list-page').length
    ).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { UsersDetailPage } from '../../../src/features/users/UsersDetailPage';

describe('users/UsersDetailPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UsersDetailPage {...props} />
    );

    expect(
      renderedComponent.find('.users-users-detail-page').length
    ).toBe(1);
  });
});

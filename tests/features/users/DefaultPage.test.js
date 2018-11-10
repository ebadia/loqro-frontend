import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/users/DefaultPage';

describe('users/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.users-default-page').length
    ).toBe(1);
  });
});

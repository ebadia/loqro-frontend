import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmModal } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ConfirmModal />);
  expect(renderedComponent.find('.common-confirm-modal').length).toBe(1);
});

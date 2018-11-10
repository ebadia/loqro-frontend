import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ClienteDetailsPage } from '../../../src/features/clientes/ClienteDetailsPage';

let wrapper;
const props = {
  clientes: { id: 1 },
  history: {
    goBack: jest.fn,
  },
  actions: {
    resetCurrentCliente: jest.fn,
    saveClienteDetails: jest.fn,
    addCliente: jest.fn,
  },
};

describe('<ClienteDetailsPage />', () => {
  beforeEach(() => {
    wrapper = shallow(<ClienteDetailsPage {...props} />);
  });

  it('renders correct', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders node with correct class name', () => {
    // expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('.clientes-cliente-details-page').length).toBe(1);
    expect(wrapper.find('.clientes-cliente-details-page-header').length).toBe(1);
    expect(wrapper.find('.clientes-cliente-details-page-back').length).toBe(1);
  });

  it('performs a back button click', () => {
    const onBackClick = sinon.spy(ClienteDetailsPage.prototype, 'handleBack');

    wrapper.find('.clientes-cliente-details-page-back').simulate('click');
    expect(onBackClick.calledOnce).toBeTruthy();
  });
});

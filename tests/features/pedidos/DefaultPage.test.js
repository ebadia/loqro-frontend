import React from 'react';
import { shallow, mount } from 'enzyme';
import { DefaultPage } from '../../../src/features/pedidos/DefaultPage';
import Axios from 'axios';

describe('pedidos/DefaultPage rendereing', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      pedidos: {},
      actions: {},
    };
    wrapper = shallow(<DefaultPage {...props} />);
  });
  it('renders node with correct class name', () => {
    expect(wrapper.find('.pedidos-default-page').length).toBe(1);
  });
  it('renders node with TableComponent', () => {
    expect(wrapper.find('TableComponent').length).toBe(1);
  });
  it('renders node with TableComponent with onEdit prop', () => {
    expect(wrapper.find('TableComponent').prop('onEdit')).toBeDefined();
  });
  it('renders node with Confirm', () => {
    expect(wrapper.find('Confirm').length).toBe(1);
  });
  it('renders node with Confirm hidden', () => {
    expect(wrapper.find('Confirm').prop('open')).toBeFalsy();
  });
});

describe('pedidos/DefaultPage interactions', () => {
  const flushPromises = () => new Promise(resolve => setImmediate(resolve));
  let props;
  const current = 1;
  let wrapper;
  beforeEach(() => {
    props = {
      pedidos: {},
      actions: {},
    };
    wrapper = shallow(<DefaultPage {...props} />);
    wrapper.setState({ lista: [{ id: 1 }] });
  });
  it('handles edit prop', () => {
    let handleEditMock = jest.fn();
    DefaultPage.prototype.handleEdit = handleEditMock;
    wrapper.find('TableComponent').prop('onEdit')(current);
    expect(handleEditMock).toHaveBeenCalledTimes(1);
  });
  it('handles add prop', () => {
    let handleAddMock = jest.fn();
    DefaultPage.prototype.handleAdd = handleAddMock;
    wrapper.find('TableComponent').prop('onAdd')();
    expect(handleAddMock).toHaveBeenCalledTimes(1);
  });
  it('handles delete prop', () => {
    let handleDeleteMock = jest.fn();
    DefaultPage.prototype.handleDelete = handleDeleteMock;
    wrapper.find('TableComponent').prop('onDelete')(1);
    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
  });
  it('handles shows confirm on delete prop', () => {
    let handleDeleteMock = jest.fn(() => wrapper.setState({ open: true }));
    DefaultPage.prototype.handleDelete = handleDeleteMock;
    wrapper.find('TableComponent').prop('onDelete')(1);
    expect(wrapper.find('Confirm').prop('open')).toBeTruthy();
  });
  it('handles cancel on confirm delete prop', () => {
    let handleCancelMock = jest.fn(() => wrapper.setState({ open: false }));
    DefaultPage.prototype.handleCancel = handleCancelMock;
    wrapper.find('TableComponent').prop('onDelete')(1);
    wrapper.find('Confirm').prop('onCancel')();
    expect(handleCancelMock).toHaveBeenCalledTimes(1);
  });
  it('handles confirm on confirm delete prop', () => {
    let handleConfirmMock = jest.fn(() => wrapper.setState({ open: false }));
    DefaultPage.prototype.handleConfirm = handleConfirmMock;
    wrapper.find('TableComponent').prop('onDelete')(1);
    wrapper.find('Confirm').prop('onConfirm')();
    expect(handleConfirmMock).toHaveBeenCalledTimes(1);
  });
});

describe('pedidos/DefaultPage unit tests', () => {
  const flushPromises = () => new Promise(resolve => setImmediate(resolve));
  let props;
  const current = 1;
  let wrapper;
  beforeEach(() => {
    props = {
      pedidos: {},
      actions: {},
    };
    wrapper = shallow(<DefaultPage {...props} />);
    wrapper.setState({ lista: [{ id: 1 }] });
  });
  it('handleConfirm', async () => {
    wrapper.instance().handleConfirm();
    expect(wrapper.state().open).toBeFalsy();
    expect(wrapper.state().current).toBeNull();
  });
  it('handleCancel', async () => {
    wrapper.instance().handleCancel();
    expect(wrapper.state().open).toBeFalsy();
    expect(wrapper.state().current).toBeNull();
  });
  it('handleEdit', async () => {
    const res = await Axios.get(`http://localhost:1234/api/pedidos/${current}`);
    wrapper.setState({ current: res.data });
    expect(wrapper.state().current.id).toBe(1);
  });
  it('handleEdit', async () => {
    wrapper.setState({ current: { id: 1 } });
    try {
      const res = await Axios.get(`http://localhost:1234/api/pedidos/undefined`);
    } catch (error) {
      wrapper.setState({ current: null });
    }
    expect(wrapper.state().current).toBeNull();
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import { TableComponent } from '../../../src/features/pedidos';

const testProps = () => ({
  datos: [],
  onAdd: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
});

describe('rendering pedidos table', () => {
  let wrapper;
  beforeEach(() => {
    const props = testProps();
    wrapper = shallow(<TableComponent {...props} />);
  });
  it('renders pedidos table node with correct class name', () => {
    expect(wrapper.find('[data-test="pedidos-table"]').length).toBe(1);
  });
  it('should display a table', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });
  it('should display an add button in header', () => {
    expect(wrapper.find('[data-test="add-pedido-button"]').length).toBe(1);
  });
  describe('datos received', () => {
    const datosFake = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    beforeEach(() => {
      wrapper = shallow(<TableComponent datos={datosFake} />);
    });
    it('should have five rows in table', () => {
      expect(wrapper.find('[data-test="table-row"]').length).toBe(5);
    });
    it('should have five edit buttons in table', () => {
      expect(wrapper.find('[data-test="edit-pedido-button"]').length).toBe(5);
    });
    it('should have five delete buttons in table', () => {
      expect(wrapper.find('[data-test="delete-pedido-button"]').length).toBe(5);
    });
  });
});

describe('interaction pedidos table', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = testProps();
    props.datos = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    wrapper = shallow(<TableComponent {...props} />);
  });
  it('clicks add button', () => {
    wrapper.find('[data-test="add-pedido-button"]').simulate('click');
    expect(props.onAdd).toHaveBeenCalledTimes(1);
  });
  it('clicks edit button', () => {
    wrapper
      .find('[data-test="edit-pedido-button"]')
      .first()
      .simulate('click');
    expect(props.onEdit).toHaveBeenCalledTimes(1);
  });
  it('clicks delete button', () => {
    wrapper
      .find('[data-test="delete-pedido-button"]')
      .first()
      .simulate('click');
    expect(props.onDelete).toHaveBeenCalledTimes(1);
  });
});

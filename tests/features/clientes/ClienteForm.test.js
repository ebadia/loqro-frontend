import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { ClienteForm } from '../../../src/features/clientes';
import { Form } from 'react-final-form';

const props = {
  values: {
    nombre: 'john',
  },
};

describe('<ClienteDetailsPage />', () => {
  it('renders <ClienteForm />', () => {
    const wrapper = shallow(<ClienteForm />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders <ClienteForm /> nodes with correct class name', () => {
    const wrapper = shallow(<ClienteForm />);
    expect(wrapper.find('.clientes-cliente-form').length).toBe(1);
    expect(wrapper.find('.clientes-cliente-form-submit').length).toBe(1);
  });

  it('renders <ClienteForm /> fields', () => {
    const wrapper = shallow(<ClienteForm />);
    expect(wrapper.find('[name="nombre"]').length).toBe(1);
    expect(wrapper.find('[type="submit"]').length).toBe(1);
  });

  it('submits the form', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ClienteForm {...props} handleSubmit={spy} />);
    expect(wrapper.find('form').length).toBe(1);
    wrapper.find('form').simulate('submit');
    expect(spy.calledOnce).toBeTruthy();
  });

  it('receives initial data', () => {
    const submit = sinon.spy(jest.fn);
    const validateForm = sinon.spy(jest.fn);
    const wrapper = mount(
      <Form
        className="clientes-cliente-details-page-form"
        initialValues={props.values}
        onSubmit={submit}
        validate={validateForm}
        render={formprops => <ClienteForm {...formprops} />}
      />,
    );

    expect(wrapper.find('input[name="nombre"]').instance().value).toBe('john');
    wrapper.find('input[name="nombre"]').simulate('change', { target: { value: 'foo' } });
    expect(wrapper.find('input[name="nombre"]').instance().value).toBe('foo');

    expect(wrapper.find('button[type="submit"]').hasClass('disabled')).toBe(false);
  });

  it('receives initial data empty', () => {
    const submit = sinon.spy(jest.fn);
    const validate = sinon.spy(jest.fn);
    const wrapper = mount(
      <Form
        className="clientes-cliente-details-page-form"
        initialValues={null}
        onSubmit={submit}
        validate={validate}
        render={formprops => <ClienteForm {...formprops} />}
      />,
    );

    const nombre = wrapper.find('input[name="nombre"]');
    expect(nombre.instance().value).toBe('');
    expect(wrapper.find('button').hasClass('disabled')).toBe(true);
  });
});

import React from 'react';
import compiler from 'mson/lib/compiler';
import Component from 'mson-react/lib/component';

const theForm = {
  component: 'Form',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre',
      component: 'TextField',
      fullWidth: true,
      required: true,
    },
    {
      name: 'descripcion',
      fullWidth: true,
      multiline: true,
      label: 'Descripción',
      component: 'TextField',
    },
    {
      name: 'precio',
      label: 'Precio',
      component: 'NumberField',
    },
    {
      name: 'oferta',
      label: 'Oferta',
      component: 'NumberField',
    },
    {
      name: 'desde',
      label: 'Activo Desde',
      component: 'DateField',
    },
    {
      name: 'hasta',
      label: 'Activo Hasta',
      component: 'DateField',
    },
    {
      name: 'submit',
      component: 'ButtonField',
      label: 'Submit',
      icon: 'Save',
    },
    {
      name: 'reset',
      component: 'ButtonField',
      label: 'Reset',
      icon: 'Clear',
    },
  ],
};

class FormComponent extends React.PureComponent {
  state = {
    form: null,
  };

  onReset = () => {
    const { form } = this.state;
    form.reset();
  };

  onSubmit = () => {
    const { form } = this.state;

    console.log('submit :', form.getValues());
  };

  componentDidMount() {
    const { values, onSubmit } = this.props;
    console.log('FORM values', values);

    const form = compiler.newComponent(theForm);
    this.setState({ form });
    form.setValues(values);

    form.on('submit', () => onSubmit(form.getValues()));
    form.on('reset', this.onReset);
  }

  render() {
    const { form } = this.state;
    return <div className="productos-user-form">{form && <Component component={form} />}</div>;
  }
}

export default FormComponent;

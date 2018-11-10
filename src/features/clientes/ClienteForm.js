import React from 'react';
import { Field } from 'react-final-form';
import { Button, Segment, Divider } from 'semantic-ui-react';
import { TextFieldAdapter } from '../../common/FormUtils';

const ClienteForm = ({ handleSubmit, submitting, pristine }) => (
  <Segment>
    <form onSubmit={handleSubmit} className="ui form clientes-cliente-form">
      <Field fluid component={TextFieldAdapter} name="nombre" label="Nombre" />
      <Divider />
      <Button
        className="clientes-cliente-form-submit"
        type="submit"
        disabled={pristine || submitting}
      >
        Enviar
      </Button>
    </form>
  </Segment>
);

export default ClienteForm;

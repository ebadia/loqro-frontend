import React from 'react';
import { Field } from 'react-final-form';
import { Button, Segment, Divider } from 'semantic-ui-react';
import { TextFieldAdapter, SelectAdapter } from '../../common/FormUtils';
import { Roles } from '../../common/enums';

const options = Object.values(Roles).map(rol => ({ key: rol, value: rol, text: rol }));

const UserForm = ({ handleSubmit, values, clientes, submitting }) => {
  const clientesOpts = clientes.map(item => ({ key: item.id, value: item.id, text: item.nombre }));

  return (
    <Segment>
      <form onSubmit={handleSubmit} className="ui form">
        <div>
          <Field component={TextFieldAdapter} name="firstName" label="First Name" />
        </div>

        <div>
          <Field component={TextFieldAdapter} name="lastName" label="Last Name" />
        </div>

        <div>
          <Field component={SelectAdapter} name="role" options={options} label="Rol" />
        </div>

        <div>
          {clientes && (
            <Field
              component={SelectAdapter}
              name="cliente.id"
              options={clientesOpts}
              label="Cliente"
            />
          )}
        </div>

        <Divider />

        <Button type="submit" disabled={submitting}>
          Enviar
        </Button>
      </form>
    </Segment>
  );
};

export default UserForm;

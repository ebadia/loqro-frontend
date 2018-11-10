import React from 'react';
import { Field } from 'react-final-form';
import { Button, Segment, Divider } from 'semantic-ui-react';
import {
  TextFieldAdapter,
  TextAreaAdapter,
  FileAdapter,
  DateInputAdpater,
} from '../../common/FormUtils';

class AccountsForm extends React.Component {
  render() {
    const { handleSubmit, submitting, invalid, values } = this.props;

    return (
      <Segment>
        {values ? (
          <form onSubmit={handleSubmit} className="ui form">
            <div>
              <Field fluid name="email" component={TextFieldAdapter} label="Email" />
            </div>

            <div>
              <Field
                fluid
                type="password"
                component={TextFieldAdapter}
                label="Contraseña"
                name="password"
              />
            </div>

            <Divider />

            <Button type="submit" disabled={invalid || submitting}>
              Enviar
            </Button>
          </form>
        ) : (
          'Loading...'
        )}
      </Segment>
    );
  }
}

export default AccountsForm;

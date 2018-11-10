import React from 'react';
import {
  Segment,
  Form,
  TextArea,
  Header,
  Button,
  Checkbox,
  Input,
  Radio,
  Select,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

import moment from 'moment';
moment.locale('es');

class FormComponent extends React.Component {
  state = {};

  handleChange = (e, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  onReset = () => {
    const { form } = this.state;
  };

  onFormSubmit = () => {
    const { onSubmit } = this.props;
    console.log('this.state from form :', this.state);
    onSubmit(this.state);
  };

  componentDidMount() {
    const { values, onSubmit } = this.props;
    console.log('this.props :', this.props);
    this.setState({ ...values });
  }

  render() {
    console.log('STATE :', this.state);
    return (
      <Segment raised>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input
            fluid
            control={Input}
            label="Nombre"
            name="nombre"
            value={this.state.nombre || ''}
            onChange={this.handleChange}
          />
          {/* <Header as="h5">Descripción</Header> */}
          <Form.Input
            control={TextArea}
            label="Descripción"
            name="descripcion"
            value={this.state.descripcion || ''}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Precio"
            name="precio"
            value={this.state.precio || 0}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Oferta"
            name="oferta"
            value={this.state.oferta || 0}
            onChange={this.handleChange}
          />
          <DateInput
            name="desde"
            label="Desde"
            closeOnMouseLeave={false}
            value={this.state.desde || ''}
            iconPosition="left"
            onChange={this.handleChange}
          />
          <DateInput
            name="hasta"
            label="Hasta"
            closeOnMouseLeave={false}
            value={this.state.hasta || ''}
            iconPosition="left"
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Segment>
    );
  }
}

export default FormComponent;

import React from 'react';
import { Field } from 'react-final-form';
// import { Input, Select, TextField } from 'final-form-material-ui';
// import Button from '@material-ui/core/Button';
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

import { DatePicker } from 'material-ui-pickers';

class FormComponent extends React.Component {
  state = {
    desde: null,
    hasta: null,
  };

  componentDidMount() {
    const { values } = this.props;
    this.setState({ desde: values.desde, hasta: values.hasta });
  }

  handleDesdeChange = date => {
    const { values } = this.props;
    this.setState({ desde: date.format('YYYY-MM-DD') });
    // values.desde = date.format('YYYY-MM-DD');
  };

  handleHastaChange = date => {
    const { values } = this.props;
    this.setState({ hasta: date.format('YYYY-MM-DD') });
    // values.hasta = date.format('YYYY-MM-DD');
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const { desde, hasta } = this.state;

    return (
      <div className="productos-user-form">
        <form onSubmit={handleSubmit}>
          <div>
            <Field type="text" component={Input} name="nombre" placeholder="Nombre" />
            <label>Nombre</label>
          </div>

          <div>
            <input accept="image/*" id="flat-button-file" multiple type="file" />
            <Button htmlFor="flat-button-file" variant="raised" color="secondary" component="span">
              Upload
            </Button>
          </div>

          <div>
            <label>Descripcion</label>
            <Field
              type="text"
              component={TextArea}
              name="descripcion"
              placeholder="Descripcion"
              multiline={true}
            />
          </div>

          <div>
            <label>Precio</label>
            <Field type="text" component={Input} name="precio" placeholder="Precio" />
          </div>

          <div>
            <label>Oferta</label>
            <Field type="text" component={Input} name="oferta" placeholder="Oferta" />
          </div>

          <div>
            <DatePicker
              label="Desde"
              value={desde}
              onChange={this.handleDesdeChange}
              animateYearScrolling
              invalidLabel="--"
              format="dddd, DD MMMM YYYY"
            />
            <DatePicker
              label="Hasta"
              value={hasta}
              onChange={this.handleHastaChange}
              animateYearScrolling
              invalidLabel="--"
              format="dddd, DD MMMM YYYY"
            />
          </div>

          <Button fullWidth variant="contained" type="submit" disabled={submitting}>
            Enviar
          </Button>
        </form>
      </div>
    );
  }
}

export default FormComponent;

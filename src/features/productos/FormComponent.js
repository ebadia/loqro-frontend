import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Button, Segment, Divider, Loader, Item, Dimmer, Grid } from 'semantic-ui-react';
import {
  TextFieldAdapter,
  TextAreaAdapter,
  FileAdapter,
  DateInputAdpater,
} from '../../common/FormUtils';
import * as QRCode from 'qrcode.react';

class FormComponent extends React.Component {
  static propTypes = {
    productos: PropTypes.object.isRequired,
    handleDeleteImage: PropTypes.func.isRequired,
    handleFile: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
  };

  render() {
    const {
      handleDeleteImage,
      handleFile,
      handleSubmit,
      submitting,
      pristine,
      values,
    } = this.props;

    const { uploadProductImagePending } = this.props.productos;

    return (
      <Segment>
        {uploadProductImagePending ? (
          <Dimmer active inverted>
            <Loader active={uploadProductImagePending} inverted>
              Cargando imagen...
            </Loader>
          </Dimmer>
        ) : (
          <div />
        )}

        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={12}>
              {values.imagen ? (
                <Item>
                  <Item.Image src={values.imagen} size="medium" rounded />
                  <Item.Content>
                    <Item.Extra>
                      <Button
                        icon="times"
                        label="Borrar"
                        onClick={() => handleDeleteImage()}
                        float="right"
                      />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ) : (
                <Field
                  fluid
                  component={FileAdapter}
                  label="Cargar Imagen"
                  name="imagen"
                  handleFile={e => handleFile(e)}
                />
              )}
            </Grid.Column>
            <Grid.Column width={2}>
              {values && <QRCode value={JSON.stringify(values)} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {values ? (
          <form onSubmit={handleSubmit} className="ui form">
            <div>
              <Field fluid name="nombre" component={TextFieldAdapter} label="Nombre" />
            </div>

            <div>
              <Field fluid component={TextAreaAdapter} label="Descripción" name="descripcion" />
            </div>

            <div>
              <Field fluid component={TextFieldAdapter} label="Precio" name="precio" />
            </div>

            <div>
              <Field fluid component={TextFieldAdapter} label="Oferta" name="oferta" />
            </div>

            <div>
              <Field component={DateInputAdpater} label="Desde" name="desde" placeholder="Desde" />
            </div>

            <div>
              <Field component={DateInputAdpater} label="Hasta" name="hasta" placeholder="Hasta" />
            </div>

            <Divider />

            <Button type="submit" disabled={pristine || submitting}>
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

export default FormComponent;

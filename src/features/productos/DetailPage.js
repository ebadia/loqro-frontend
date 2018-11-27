import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Form } from 'react-final-form';
import FormComponent from './FormComponent';
import { Header, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
moment.locale('es');

// import FormComponent from './FormComponent';

export class DetailPage extends Component {
  static propTypes = {
    productos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  validate = values => {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = true;
    }
    if (!values.precio) {
      errors.precio = true;
    }
    if (!values.oferta) {
      errors.oferta = true;
    }
    if (!values.desde) {
      errors.desde = true;
    }
    return errors;
  };

  async componentDidMount() {
    const { fetchDetails } = this.props.actions;
    const { match } = this.props;

    if (match.params.id) {
      await fetchDetails(match.params.id);
    }
  }

  // handleSubmit = async (values, { props = this.props, setSubmitting }) => {
  handleSubmit = async values => {
    const { saveDetails, add } = this.props.actions;
    const { current } = this.props.productos;

    if (current) {
      if (values.activo === '') {
        values.activo = false;
      }
      await saveDetails(values);
      this.handleBack();
    } else {
      await add(values);
      this.handleBack();
    }
  };

  handleBack() {
    const { history } = this.props;
    const { resetCurrent } = this.props.actions;
    resetCurrent();
    history.goBack();
  }

  handleFile = e => {
    const { uploadProductImage } = this.props.actions;
    const { current } = this.props.productos;

    // console.log('event from file :', e.target.files[0]);
    const fd = new FormData();
    fd.append('file', e.target.files[0], e.target.files[0].name);
    uploadProductImage({ id: current.id, file: fd });
  };

  handleDeleteImage = () => {
    const { deleteProductImage } = this.props.actions;
    const { current } = this.props.productos;
    deleteProductImage({ id: current.id });
  };

  render() {
    const { current, fetchDetailsPending } = this.props.productos;

    return (
      <div className="products-detail-page">
        <Header as="h1" color="teal">
          <Button onClick={() => this.handleBack()}>
            <Icon name="arrow left" />
          </Button>
          Producto
        </Header>
        {!fetchDetailsPending ? (
          <Form
            initialValues={current}
            onSubmit={this.handleSubmit}
            validate={this.validate}
            render={formprops => <FormComponent {...formprops} />}
            handleFile={this.handleFile}
            handleDeleteImage={() => this.handleDeleteImage()}
            {...this.props}
          />
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    productos: state.productos,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailPage);

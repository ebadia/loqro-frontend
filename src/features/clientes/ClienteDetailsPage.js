import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header, Button, Icon } from 'semantic-ui-react';
import { Form } from 'react-final-form';

import ClienteForm from './ClienteForm';

export class ClienteDetailsPage extends Component {
  static propTypes = {
    clientes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    const { fetchClienteDetails } = this.props.actions;
    const { match } = this.props;

    if (match.params.id) {
      await fetchClienteDetails(match.params.id);
    }
  }

  // handleSubmit = async (values, { props = this.props, setSubmitting }) => {
  handleSubmit = async values => {
    const { saveClienteDetails, addCliente } = this.props.actions;
    const { currentCliente } = this.props.clientes;
    if (currentCliente) {
      await saveClienteDetails(values);
      this.handleBack();
    } else {
      await addCliente(values);
      this.handleBack();
    }
  };

  handleBack() {
    const { history } = this.props;
    const { resetCurrentCliente } = this.props.actions;
    resetCurrentCliente();
    history.goBack();
  }

  validate = values => {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = true;
    }
    return errors;
  };

  render() {
    const { currentCliente, fetchClienteDetailsPending } = this.props.clientes;

    return (
      <div className="clientes-cliente-details-page">
        <Header className="clientes-cliente-details-page-header" as="h1" color="teal">
          <Button className="clientes-cliente-details-page-back" onClick={() => this.handleBack()}>
            <Icon name="arrow left" />
          </Button>
          Cliente
        </Header>
        {!fetchClienteDetailsPending ? (
          <Form
            className="clientes-cliente-details-page-form"
            initialValues={currentCliente}
            onSubmit={this.handleSubmit}
            validate={this.validate}
            render={formprops => <ClienteForm {...formprops} />}
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
    clientes: state.clientes,
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
)(ClienteDetailsPage);

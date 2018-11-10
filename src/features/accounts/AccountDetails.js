import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Form } from 'react-final-form';

import AccountsForm from './AccountsForm';
import { Header, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
moment.locale('es');

// import FormComponent from './FormComponent';

export class AccountDetails extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  state = {
    id: null,
  };

  validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = true;
    }
    if (!values.password) {
      errors.password = true;
    }
    return errors;
  };

  async componentDidMount() {
    const { fetchDetails } = this.props.actions;
    const { editting } = this.props.accounts;
    const { match } = this.props;
    this.setState({ id: match.params.id });
    if (editting) {
      await fetchDetails(editting.id);
    }
  }

  // handleSubmit = async (values, { props = this.props, setSubmitting }) => {
  handleSubmit = async values => {
    const { editAccount, crearCuenta } = this.props.actions;
    const { current } = this.props.accounts;
    values.userId = this.state.id;
    if (current) {
      await editAccount(values);
      this.handleBack();
    } else {
      await crearCuenta(values);
      this.handleBack();
    }
  };

  handleBack() {
    const { history } = this.props;
    const { resetCurrent } = this.props.actions;
    resetCurrent();
    history.goBack();
  }

  render() {
    const { current, fetchDetailsPending } = this.props.accounts;

    return (
      <div className="accounts-detail-page">
        <Header as="h1" color="teal">
          Cuenta
        </Header>
        {!fetchDetailsPending ? (
          <Form
            initialValues={current}
            onSubmit={this.handleSubmit}
            validate={this.validate}
            render={formprops => <AccountsForm {...formprops} />}
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
    accounts: state.accounts,
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
)(AccountDetails);

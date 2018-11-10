import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as clientesActions from '../clientes/redux/actions';
import { Header, Button, Icon } from 'semantic-ui-react';
import { Form } from 'react-final-form';
import UserForm from './UserForm';
import moment from 'moment';
moment.locale('es');

export class UsersDetailPage extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    const { fetchUserDetails, fetchClientesList } = this.props.actions;
    const { match } = this.props;

    await fetchClientesList();

    if (match.params.id) {
      await fetchUserDetails(match.params.id);
    }
  }

  handleSubmit = async (values, { props = this.props, setSubmitting }) => {
    const { saveUserDetails, addUser } = this.props.actions;
    const { currentUser } = this.props.users;
    if (currentUser) {
      console.log(values);
      if (values.cliente.id === '') {
        values.cliente = null;
      }
      await saveUserDetails(values);
      this.handleBack();
    } else {
      await addUser(values);
      this.handleBack();
    }

    //process form submission here
    //done submitting, set submitting to false
    setSubmitting(false);
    return;
  };

  handleBack() {
    const { history } = this.props;
    const { resetCurrentUser } = this.props.actions;
    console.log('match :', this.props);
    resetCurrentUser();
    history.goBack();
  }

  render() {
    const { currentUser, fetchUserDetailsPending } = this.props.users;
    const { clientesList } = this.props.clientes;

    return (
      <div className="users-users-detail-page">
        <Header as="h1" color="teal">
          <Button onClick={() => this.handleBack()}>
            <Icon name="arrow left" />
          </Button>
          Usuario
        </Header>
        {!fetchUserDetailsPending ? (
          <Form
            initialValues={currentUser}
            onSubmit={this.handleSubmit}
            render={formprops => <UserForm {...formprops} clientes={clientesList} />}
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
    users: state.users,
    clientes: state.clientes,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...clientesActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersDetailPage);

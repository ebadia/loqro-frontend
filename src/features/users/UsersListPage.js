import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as accountActions from '../accounts/redux/actions';
import { Header, Confirm } from 'semantic-ui-react';
import UsersTable from './UsersTable';

export class UsersListPage extends Component {
  static propTypes = {};

  state = {
    open: false,
    id: null,
    isAdmin: false,
  };

  async componentDidMount() {
    const { fetchUsersList } = this.props.actions;

    const role = JSON.parse(localStorage.getItem('current')).role;
    if (role === 'Administrador') {
      this.setState({ isAdmin: true });
    }
    await fetchUsersList();
  }

  handleEdit(id) {
    const { match, history } = this.props;
    history.push(`${match.url}/details/${id}`);
  }

  handleNew = () => {
    const { history } = this.props;
    history.push(`/users/details`);
  };

  handleDelete = id => {
    this.setState({ open: true, id });
  };

  handleDelete = id => {
    this.setState({ open: true, id });
  };

  handleConfirm = async () => {
    const { remove } = this.props.actions;
    const { id } = this.state;
    await remove(id);
    this.setState({ open: false, id: null });
  };

  handleCancel = () => {
    this.setState({ open: false, id: null });
  };

  handleEditarCuenta = user => {
    console.log('user :', user);
    const { history } = this.props;
    const { editAccount } = this.props.actions;
    editAccount(user.account);
    history.push(`/main/accounts/details/${user.id}`);
  };

  render() {
    const { usersList } = this.props.users;
    const { clientesList } = this.props.clientes;
    const { fetchUsersListError } = this.props.actions;
    const { open, isAdmin } = this.state;

    return (
      <React.Fragment>
        <Header as="h1" color="teal">
          Lista de usuarios{' '}
        </Header>
        {!fetchUsersListError ? (
          <UsersTable
            isAdmin={isAdmin}
            users={usersList}
            clientes={clientesList}
            onEdit={id => this.handleEdit(id)}
            onEditarCuenta={(user, id) => this.handleEditarCuenta(user, id)}
            onAdd={() => this.handleNew()}
            onDelete={id => this.handleDelete(id)}
          />
        ) : (
          <div>Error</div>
        )}
        <Confirm
          open={open}
          cancelButton="No"
          confirmButton="Si, adelante"
          content="¿Borrar el usuario?"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </React.Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    users: state.users,
    clientes: state.clientes,
    accounts: state.accounts,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...accountActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersListPage);

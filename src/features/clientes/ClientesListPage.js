import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header, Confirm } from 'semantic-ui-react';
import ClientesTable from './ClientesTable';

export class ClientesListPage extends Component {
  static propTypes = {
    clientes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    open: false,
    id: null,
  };

  componentDidMount() {
    const { fetchClientesList } = this.props.actions;
    fetchClientesList();
  }

  handleEdit(id) {
    const { history } = this.props;
    history.push(`/main/clientes/details/${id}`);
  }

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

  handleNewClient = () => {
    const { history } = this.props;
    const { resetCurrentCliente } = this.props.actions;
    resetCurrentCliente();
    history.push(`/main/clientes/details`);
  };

  render() {
    const { clientesList } = this.props.clientes;
    const { fetchCientesListError } = this.props.actions;
    const { open } = this.state;

    return (
      <React.Fragment>
        <div className="clientes-clientes-list-page-header">
          <Header className="clientes-clientes-list-page" as="h1" color="teal">
            Lista de clientes
          </Header>
          {!fetchCientesListError ? (
            <ClientesTable
              className="clientes-clientes-list-page-table"
              clientes={clientesList}
              onEdit={id => this.handleEdit(id)}
              onAdd={() => this.handleNewClient()}
              onDelete={id => this.handleDelete(id)}
            />
          ) : (
            <div>Error</div>
          )}
          <Confirm
            open={open}
            cancelButton="No"
            confirmButton="Si, adelante"
            content="¿Borrar el cliente?"
            onCancel={() => this.handleCancel()}
            onConfirm={() => this.handleConfirm()}
          />
        </div>
      </React.Fragment>
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
)(ClientesListPage);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header, Confirm } from 'semantic-ui-react';
import TableComponent from './TableComponent';
import * as moment from 'moment';

export class ListPage extends Component {
  static propTypes = {
    productos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    open: false,
    id: null,
    isAdmin: false,
  };

  async componentDidMount() {
    const { fetchList, marcaProductosActivos } = this.props.actions;
    const { accounts } = this.props;
    accounts.role === 'Administrador' && this.setState({ isAdmin: true });
    await fetchList();
    marcaProductosActivos();
  }

  handleEdit(id) {
    const { history } = this.props;
    history.push(`/main/productos/details/${id}`);
  }

  handleNew = () => {
    const { history } = this.props;
    history.push(`/main/productos/details`);
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

  render() {
    const { list } = this.props.productos;
    const { fetchListError } = this.props.actions;
    const { open, isAdmin } = this.state;

    return (
      <React.Fragment>
        <div className="products-list-page">
          <Header as="h1" color="teal">
            Lista de productos
          </Header>
          {!fetchListError ? (
            <TableComponent
              isAdmin={isAdmin}
              productos={list}
              onEdit={id => this.handleEdit(id)}
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
            content="¿Borrar el producto?"
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
    productos: state.productos,
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
)(ListPage);

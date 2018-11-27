import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header, Confirm } from 'semantic-ui-react';
import TableComponent from './TableComponent';
import Axios from 'axios';

export class DefaultPage extends Component {
  static propTypes = {
    pedidos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    lista: [],
    current: null,
    open: false,
  };

  async componentDidMount() {
    try {
      const res = await Axios.get('http://localhost:1234/api/pedidos');
      this.setState({ current: res.data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async handleEdit(id) {
    if (id) {
      const res = await Axios.get(`http://localhost:1234/api/pedidos/${id}`);
      this.setState({ current: res.data });
    }
  }

  handleDelete(id) {
    this.setState({ open: true });
  }

  handleAdd() {
    console.log('add :');
  }

  handleCancel() {
    this.setState({ open: false, current: null });
  }

  async handleConfirm() {
    const { current } = this.state;
    const res = await Axios.delete(`http://localhost:1234/api/pedidos/${current.id}`);
    this.setState({ open: false, current: null });
  }

  render() {
    const { lista, open } = this.state;
    return (
      <div className="pedidos-default-page">
        <React.Fragment>
          <div className="products-list-page">
            <Header as="h1" color="teal">
              Lista de pedidos
            </Header>
            <TableComponent
              datos={lista}
              onAdd={() => this.handleAdd()}
              onEdit={id => this.handleEdit(id)}
              onDelete={id => this.handleDelete(id)}
              data-test="table-component"
            />
          </div>
          <Confirm
            open={open}
            cancelButton="No"
            confirmButton="Si, adelante"
            content="¿Borrar el producto?"
            onCancel={() => this.handleCancel()}
            onConfirm={() => this.handleConfirm()}
          />
        </React.Fragment>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    pedidos: state.pedidos,
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
)(DefaultPage);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Confirm, Button, Header } from 'semantic-ui-react';

export class SidePanel extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleConfirm = () => {
    const { history } = this.props;
    this.setState({ open: false });
    localStorage.removeItem('token');
    history.push('/');
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <div className="loqro-side-panel">
        <Header as="h1" color="teal">
          LOQRO
        </Header>
        <ul>
          <li>
            <Link to="/main/users">Usuarios</Link>
          </li>
          <li>
            <Link to="/main/productos">Productos</Link>
          </li>
          <li>
            <Link to="/main/clientes">Clientes</Link>
          </li>
          <li>
            <Button icon="log out" label="Salir" compact onClick={this.handleOpen} color="violet" />
            <Confirm
              open={open}
              cancelButton="No"
              confirmButton="Si, adelante"
              content="Cerrar la sesión?"
              onCancel={() => this.handleCancel()}
              onConfirm={() => this.handleConfirm()}
            />
          </li>
        </ul>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    examples: state.examples,
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
)(SidePanel);

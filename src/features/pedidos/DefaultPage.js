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
    pedidos: [],
  };

  async componentDidMount() {
    const res = await Axios.get('http://localhost:1234/api/pedidos');
    this.setState({ pedidos: res.data });
  }

  render() {
    const { pedidos } = this.state;
    return (
      <div className="pedidos-default-page">
        <React.Fragment>
          <div className="products-list-page">
            <Header as="h1" color="teal">
              Lista de pedidos
            </Header>
            <TableComponent datos={pedidos} />
          </div>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as accountsActions from '../accounts/redux/actions';
import { Grid } from 'semantic-ui-react';

import Login from '../accounts/Login';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async handleEntrar(user) {
    const { history } = this.props;
    const { login, connectedUser } = this.props.actions;
    const connected = await login(user);
    connectedUser(connected.data);
    history.replace('/main/users');
  }

  render() {
    return (
      <div>
        <Grid style={{ height: '100vh' }} verticalAlign="middle" centered>
          <Grid.Row>
            <Grid.Column>
              <Login onEntrar={user => this.handleEntrar(user)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    accounts: state.accounts,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...accountsActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);

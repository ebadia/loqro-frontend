import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';

export default class PageNotFound extends PureComponent {
  render() {
    return (
      <Grid style={{ height: '100vh' }} verticalAlign="middle" centered>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment>
              <Header as="h2" color="teal" textAlign="center">
                Página no encontrada
                <br />
                <Link to="/">Salir</Link>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

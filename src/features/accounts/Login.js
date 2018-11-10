import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { onEntrar } = this.props;
    return (
      <React.Fragment>
        <div className="login-form">
          {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
            centered
            columns={1}
          >
            <Grid.Row>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  Entrar
                </Header>
                <Form size="large">
                  <Segment raised>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="E-mail"
                      name="email"
                      onChange={this.onChange}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={this.onChange}
                    />

                    <Button color="teal" fluid size="large" onClick={() => onEntrar(this.state)}>
                      Login
                    </Button>
                  </Segment>
                </Form>
                {/* <Message>
                  New to us? <a href="#">Sign Up</a>
                </Message> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default SignIn;

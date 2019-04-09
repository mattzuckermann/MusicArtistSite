import React, { Component } from 'react';
// import axios from 'axios';
import Jumbotron from '../../components/Jumbotron';
import { H1, H2 } from '../../components/Headings';
import { Container, Row, Col } from '../../components/Grid';
import { Form, Input, FormGroup, Label } from '../../components/Form';
import { Panel, PanelBody } from '../../components/Panel';
import SEO from '../../components/SEO';
import './Admin.css';

class Login extends Component<
  {},
  { username: string; password: string; message: string }
> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    // const { username, password } = this.state;
    // var self = this;

    // axios
    //   .post('/api/auth/login', { username, password })
    //   .then(result => {
    //     localStorage.setItem('jwtToken', result.data.token);
    //     localStorage.setItem('user', username);
    //     self.props.updateLogin(self.props.parent);
    //     this.setState({ message: '' });
    //   })
    //   .then(() => {
    //     this.props.history.push('/');
    //   })
    //   .catch(error => {
    //     if (error.response.status === 401) {
    //       this.setState({
    //         message: 'Login failed. Username or password not match',
    //       });
    //     }
    //   });
    // this.setState({
    //   username: '',
    //   password: '',
    //   message: '',
    // });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <Container fluid>
        <SEO description="visibility improvement" title="Admin" />
        <Row fluid>
          <Col size="sm-10">
            <Jumbotron>
              <H1 className="text-center">Welcome Josh Zuckermann</H1>
              <hr style={{ width: '60%' }} />
            </Jumbotron>
            <Panel>
              <PanelBody>
                <Form className="form-signin" style={{ marginBottom: '30px' }}>
                  {message !== '' && (
                    <div
                      className="alert alert-warning alert-dismissible"
                      role="alert"
                    >
                      {message}
                    </div>
                  )}

                  <H2 className="form-signin-heading">Please sign in</H2>

                  <FormGroup>
                    <Label htmlFor="inputEmail" className="sr-only">
                      Username
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      name="username"
                      value={username}
                      onChange={this.onChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="inputPassword" className="sr-only">
                      Password
                    </Label>
                    <Input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                      required
                    />
                  </FormGroup>

                  <button
                    disabled={!username || !password}
                    className="btn btn-lg btn-primary btn-block"
                    onClick={this.onSubmit}
                    type="button"
                  >
                    Login
                  </button>
                </Form>
              </PanelBody>
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;

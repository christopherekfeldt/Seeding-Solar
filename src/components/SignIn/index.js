import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button} from 'reactstrap';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <center>
      <h3>Sign In</h3>
      <SignInForm history={history} />
      <div style={paddingStyles}>
      <PasswordForgetLink />
      <SignUpLink />
      </div>
    </center>
  </div>

const paddingStyles = {
  marginTop: 20
};

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
        <form onSubmit={this.onSubmit}>
          <center>
          <div>
          <input 
            value={email}
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            type="text"
            style={inputWindowStyles}
            placeholder="Email Address"
          />
          </div>
          <div>
          <input
            value={password}
            onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
            type="password"
            style={inputWindowStyles}
            placeholder="Password"
          />
          </div>
          </center>
          <div>
            <Button disabled={isInvalid} type="submit" style={buttonStyles}>
              Sign In
            </Button>
          </div>
          { error && <p>{error.message}</p> }
        </form>
      
    );
  }
}

const buttonStyles = {
  marginLeft: 230,
  marginTop: 20,
  textColor: 'white',
  backgroundColor: 'orange',
  width: 120
};

const inputWindowStyles = {
  marginTop: 20,
  width: 320,
  height: 40    
};

export default withRouter(SignInPage);

export {
  SignInForm,
};

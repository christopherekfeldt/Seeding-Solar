import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <center>
      <h3>SignIn</h3>
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
    </center>
  </div>

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
      <center>
        <form onSubmit={this.onSubmit}>
          <div>
          <input
            value={email}
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          </div>
          <div>
          <input
            value={password}
            onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
            type="password"
            placeholder="Password"
          />
          </div>

          <button disabled={isInvalid} type="submit">
            Sign In
          </button>


          { error && <p>{error.message}</p> }
        </form>
      </center>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button} from 'reactstrap';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

//Sign in page with links to sign up and forgot password
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



const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});
//The initial state for the form
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
  //When a user press sign in, sets the email and password to this.state
  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;
    //Checks with firebase if it is a valid user and then signs the user in.
    //The user is reasigned to the home page
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
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';
    //Returns the form for sign in
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

const paddingStyles = {
  marginTop: 20,
};
//Style of the sign in button
const buttonStyles = {
    marginTop: 20,
    textColor: 'white',
    backgroundColor: 'orange',
    width: 120
  };
  //Style of the sign in form
  const inputWindowStyles = {
    marginTop: 20,
    width: 320,
    height: 40    
  };

export default withRouter(SignInPage);

export {
  SignInForm,
};

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

//Page where you can fill in your email and get help with your forgotten password.
const PasswordForgetPage = () =>
  <div>
    <center>
    <h3>Forgot your password?</h3>
    <PasswordForgetForm />
    </center>
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

//Initial state of email == empty string.
const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    //Uses Firebase function doPasswordReset and resets password for specific email.
    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      //Form to fill in email for user that has forgotten his/her password.
      <form onSubmit={this.onSubmit}>
        <div>
        <input
          value={this.state.email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          style={inputWindowStyles}
          placeholder="Email Address"
        />
        </div>
        <Button disabled={isInvalid} type="submit" style={buttonStyles}>
          Reset my Password
        </Button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

//STYLING 

const buttonStyles = {
  marginTop: 20,
  textColor: 'white',
  backgroundColor: 'orange',
  width: 180
};

const inputWindowStyles = {
  marginTop: 20,
  width: 320,
  height: 40    
};

//Link and route to Password Forget page. Shown on sign in page!
const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};

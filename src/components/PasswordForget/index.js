import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

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

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};

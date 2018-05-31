import React, { Component } from 'react';
import {Button} from 'reactstrap';
import { auth } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

//Sets initial states of variables.
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

//PasswordChangeForm, sounds as it is.
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    //Updates password.
    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    //Checks so password is not empty or not the same as passwordTwo.
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      //Here is the form u fill in to change your password if forgotten.
      <form onSubmit={this.onSubmit}>
      <div>
        <input
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          style={inputWindowStyles}
          placeholder="New Password"
        />
        </div>
        <div>
        <input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          style={inputWindowStyles}
          placeholder="Confirm New Password"
        />
        </div>
        <Button disabled={isInvalid} type="submit" style={buttonStyles}>
          Change my Password
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

export default PasswordChangeForm;
import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import {Button} from 'reactstrap';
import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

//Renders the sign up page
const SignUpPage = ({ history }) =>
  <div>
    <center>
      <h3>Sign Up</h3>
      <SignUpForm history={history} />
    </center>
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

// The initial state for a user in the database.
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  investments: 0,
  account: 0,
  panelsPerMonth: 0,
  activePanels: 0,
  soldPanels: 0,
  reducedCO2: 0,
  error: null,
};



class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
//When a user presses the sign up button, sets the initial state to the user
  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
      investments,
      account,
      panelsPerMonth,
      activePanels,
      soldPanels,
      reducedCO2
    } = this.state;

    const {
      history,
    } = this.props;
    //Creates a user with Firebase authentication. Firebase takes care of the password for safety reasons
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email, investments, account, panelsPerMonth, activePanels, soldPanels, reducedCO2)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });
          

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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    //Checks if the user is valid 
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

      //Returns the sign up form and sets the database values equal to what the user writes for email and username...
    return (
      <form onSubmit={this.onSubmit}>
        <div>
        <input
          value={username}
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          style={inputWindowStyles}
          placeholder="Full Name"
        />
        </div>
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
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          style={inputWindowStyles}
          placeholder="Password"
        />
        </div>
        <div>
        <input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          style={inputWindowStyles}
          placeholder="Confirm Password"
        />
        </div>
        <Button disabled={isInvalid} type="submit" style={buttonStyles}>
              Sign Up
        </Button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

//Style on the button
const buttonStyles = {
  marginTop: 20,
  textColor: 'white',
  backgroundColor: 'orange',
  width: 120
};
//Style on the form
const inputWindowStyles = {
  marginTop: 20,
  width: 320,
  height: 40    
};

//Link to sign up from sign in
const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
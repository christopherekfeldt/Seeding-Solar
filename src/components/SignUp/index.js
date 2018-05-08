import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import {Button} from 'reactstrap';
import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
//import { INITIAL_INVESTMENT } from '../Account';

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

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

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

const buttonStyles = {
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


import React, {Component} from 'react';
import NavBar from '../NavBar';
import firebase, {auth} from '../firebase';
import {withRouter} from 'react-router-dom';
import {SignUp, SignUpLink} from './SignUp';

const SignInPage = ({history}) =>
    <div>
      <h1>Sign In</h1>
      <SignIn history={history} />
      <SignUpLink />  
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {... INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            email,
            password
        } = this.state;

        const {
            history
        } = this.props;

    event.preventDefault();
    }
        
    render(){
        const {
            email,
            password,
            error
        } = this.state;

        const isInvalid = 
            password === '' ||
            email === '';

        return (
            <div className="App">
            <NavBar/>
            <form onSubmit={this.onSubmit}>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                { error && <p>{error.message}</p> }
                
            </form>
            </div>
        );
    }
} 

export default withRouter(SignInPage);

export {
    SignIn
};
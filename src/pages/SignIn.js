import React, {Component} from 'react';
import NavBar from '../NavBar';
import firebase, {auth} from '../firebase';
import {withRouter} from 'react-router-dom';
import {SignUp, SignUpLink} from './SignUp';

const SignInPage = ({history}) =>
    <div>
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

        this.state = {...INITIAL_STATE};
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
            <h1> Sign In </h1>
            <form onSubmit={this.onSubmit}>
                <div>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                </div>
                <div>
                <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                </div>
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
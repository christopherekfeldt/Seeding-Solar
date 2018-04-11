import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import NavBar from '../NavBar';
import {auth} from '../firebase';


const SignUpPage = ({history}) =>
    <div>
        <h1>Sign up</h1>
        <SignUp history={history} />
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }
    
    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne
        } = this.state;

        const {
            history
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({ ... INITIAL_STATE}));
                history.push('/Home');
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }
    
    render(){
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;
        
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
        <div className="App">
        <NavBar/>
        <form onSubmit={this.onSubmit}>
            <input
                value={username}
                onChange={event => this.setState(byPropKey('username', event.target.value))}
                type="text"
                placeholder="Full Name"
                />
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Adress"
                />
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign up
                </button>
                
                {error && <p>{error.message}</p>}
        </form> 
        </div>
        );
    }
} 

const SignUpLink = () =>
    <p>
        Don't have an account?
        {' '}
        <Link to={'/SignUp'}> Sign up</Link>
    </p>

export default withRouter(SignUpPage);

export {
    SignUp,
    SignUpLink
};
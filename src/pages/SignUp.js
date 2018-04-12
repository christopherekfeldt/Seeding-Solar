import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import NavBar from '../NavBar';
import {auth} from '../firebase';


const SignUpPage = ({history}) =>
    <div>
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
                this.setState(() => ({...INITIAL_STATE}));
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
        <h1>Sign up</h1>
        <form onSubmit={this.onSubmit}>
            <div>
            <input
                value={username}
                onChange={event => this.setState(byPropKey('username', event.target.value))}
                type="text"
                placeholder="Full Name"
                />
                </div>
                <div>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Adress"
                />
                </div>
                <div>
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                </div>
                <div>
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />
                </div>
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
    <center>
    <p>
        Don't have an account?
        {' '}
        <Link to={'/SignUp'}> Sign up</Link>
    </p>
    </center>
export default withRouter(SignUpPage);

export {
    SignUp,
    SignUpLink
};
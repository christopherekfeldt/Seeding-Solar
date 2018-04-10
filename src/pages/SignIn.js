import React, {Component} from 'react';
import NavBar from '../NavBar';
import firebase, {auth, provider} from '../firebase';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            user: null //
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if(user) {
                this.setState({ user });
            }
        });
    }
    handleChange(e) {

    }
    logout() {
        auth.signOut()
        .then(() => {
            this.setState({
                user: null
            });
        });
    }

    login() {
        auth.signInWithEmailAndPassword(this.username, this.password)
            .then((result) => {
                const username = result.username;
                const password = result.password;
                this.setState({
                    username,
                    password
                });
            });
    }

    render(){
        return (
            <div className="App">
            <NavBar/>
            <div><input type="text" name="username" placeholder="username"/></div>
            <div><input type="text" name="password" placeholder="password"/></div>
        
            {this.state.user ?
                <button onClick={this.logout}>Log out</button>
                :
                <button onClick={this.login}>Log in</button>
            }
            </div>
        );
    }
} 

export default SignIn;
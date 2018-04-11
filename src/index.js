import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Projects from './pages/Projects';
import * as auth from './auth';
import * as firebase from './firebase';
import SignOutButton from './pages/SignOut';
var Router = require('react-router-dom').BrowserRouter
var Route = require('react-router-dom').Route
var path = require('react-router-dom').Link
/*var database = firebase.database();*/

export {
    auth,
    firebase,
};

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/Home" component={Home}/>
            <Route path="/Contact" component={Contact}/>
            <Route path="/Projects" component={Projects}/>
            <Route path="/SignIn" component={SignIn}/>
            <Route path="/SignUp" component={SignUp}/>
            <li><SignOutButton /></li>
        </div>
    </Router>,
     document.getElementById('root'));
registerServiceWorker();

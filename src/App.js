import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import firebase from './firebase';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  /*componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser}))
        : this.setState(() => ({ authUser: null}));
    });
  }*/

  render() {
    return (
      <div className="App">
      <NavBar authUser={this.state.authUser}/>
      </div>
    );
  }
}


export default App;

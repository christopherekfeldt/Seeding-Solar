import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
var Router = require('react-router').Router
var Route = require('react-router').Route
var Switch = require('react-router').Switch
var firebase = require("firebase");

class App extends Component {
  constructor() {
    super();
    this.state = {
      speed: 10
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      });
    });
  }
  
  render() {
    return (
      <div className="App">
      <NavBar/>
        <h1>{this.state.speed}</h1>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyDPj0BZVQebAYww_VUFXhbEXPP-n2gq120",
    authDomain: "seeding-solar.firebaseapp.com",
    databaseURL: "https://seeding-solar.firebaseio.com",
    projectId: "seeding-solar",
    storageBucket: "seeding-solar.appspot.com",
    messagingSenderId: "1066950282834"
  };
  firebase.initializeApp(config);

var database = firebase.database();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

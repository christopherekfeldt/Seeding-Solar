import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import SignOutButton from '../SignOut';

//Home Page
const HomePage = () =>
    <div>
        <center>
          <h1>Home</h1> 
          <p>The Home Page is accessible by every signed in user.</p> 
      </center>
      </div>

export default HomePage;

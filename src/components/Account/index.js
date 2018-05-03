import { connect } from 'react-redux';
import { compose } from 'recompose';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import { auth, db, firebase } from '../../firebase';
import * as routes from '../../constants/routes';
import * as realFirebase from 'firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});


class Account extends Component {
  constructor(props) {
    super(props);
    this.MakeInvestment = this.MakeInvestment.bind(this);

    this.state = {
      investment: 0
    };
  }

  MakeInvestment() {
    let uid = realFirebase.auth().currentUser.uid;
    console.log('uid');
    console.log(uid);

    firebase.db.ref('users/' + uid).once('value',function(snapshot) {
      var updates = {};
      var temp = snapshot.val().account;
      console.log(temp);
      updates[snapshot.key + '/account'] = temp + this.state.account;
      
    firebase.db.ref('users/' + uid).update(updates);
    });
  }

  onSubmit = (event) => {
    this.MakeInvestment;
}
    
  
  render() {
    const isInvalid = 
      this.state.investment === '' ||
      this.state.investment === 0;

    return(
      <div>
        <center>
        <h4>Account</h4>  
        <form onSubmit={this.onSubmit}>
            <input
              value={this.state.investment}
              onChange={event => this.setState(updateByPropertyName('investment', event.target.value))}
              type="text"
              style={inputWindowStyles}
              placeholder="Investment"
            />
            <div>
            <Button disabled={isInvalid} type="submit" style={buttonStyles}>
              Make Donation
            </Button>
            </div>
          </form>
        </center>
    </div>
    );
  }
  
}

const buttonStyles = {
  marginTop: 20,
  textColor: 'white',
  backgroundColor: 'orange',
  width: 180
};

const inputWindowStyles = {
  marginTop: 20,
  width: 320,
  height: 40    
};


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(Account);
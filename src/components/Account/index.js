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
import { isNumber } from 'util';


const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

/*export const INITIAL_INVESTMENT = {
  investment: '',
  date: ''
};*/

/*const doCreateInvestment = (uid, investment, date) => db.ref('users/' + uid + '/investments').set({
  investment,
  date,
})*/

class Account extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      account: 0,
      formeraccount: 0
    
    };
  }

  handleChange(event) {
    this.setState({account: event.target.value});
  }

  onSubmit = (event) => {
    let uid = realFirebase.auth().currentUser.uid;
    var account = this.state.account;
    var formeraccount = this.state.formeraccount;
    var sum = account -(-formeraccount);
    firebase.db.ref('users/' + uid).update({account: sum});
    var dateOfInvestment = getTodaysDate(); 
    var investment = account;
    firebase.db.ref('users/' + uid + '/investments').push().set({investment, dateOfInvestment});
  }

  componentDidMount() {
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid).once('value').then(function(snapshot){
      var formeraccount = (snapshot.val() && snapshot.val().account);
      this.setState({formeraccount});
    }.bind(this));
  }
  
  render() {
    const isInvalid = 
      this.state.account === '' ||
      this.state.account === 0 ||
      this.state.account < 1;

    return(
      <div>
        <center>
        <h4>Account</h4>  
        <form onSubmit={this.onSubmit}>
            <input
              value={this.state.account}
              onChange = {this.handleChange} 
              type="number"
              min="0"
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

function getTodaysDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10){
      dd = '0' + dd;
  }
  if (mm < 10){
      mm = '0' + mm;
  }
return today = dd + '-' + mm + '-' + yyyy;
}
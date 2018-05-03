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


class Account extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      investment: 0,
      formerInvestment: 0, 
      value: 0
    };
  }

  handleChange(event) {
    this.setState({investment: event.target.value});
  }

  onSubmit = (event) => {
    let uid = realFirebase.auth().currentUser.uid;
    var temp = this.state.investment;
    var temp2 = this.state.formerInvestment;
    var temp3 = temp -(-temp2);
    firebase.db.ref('users/' + uid).update({account: temp3});

}

  componentDidMount() {
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid).once('value').then(function(snapshot){
      var formerInvestment = (snapshot.val() && snapshot.val().account);
      this.setState({formerInvestment});
    }.bind(this));
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
              onChange = {this.handleChange} 
              type="number"
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
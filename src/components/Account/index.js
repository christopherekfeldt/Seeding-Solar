import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {firebase } from '../../firebase';
import * as realFirebase from 'firebase';
import * as fontAwsome from 'react-icons/lib/fa';
import icon from '../../carbon.ico';


/*const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});*/

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
      formeraccount: 0,
      carbonEmission: 0,
      peopleWithElectricity: 0,
      formerInvestments: []
    
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
    this.showFormerInvestments()
    this.showCarbonDioxideEmission()
    this.showUserInformation()
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid).once('value').then(function(snapshot){
      var formeraccount = (snapshot.val() && snapshot.val().account);
      this.setState({formeraccount});
    }.bind(this));
  }

  showFormerInvestments() {
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid + '/investments' ).once('value').then(function(snapshot){
      let formerInvestments = [];
      snapshot.forEach(function(childSnapshot){
       var key = childSnapshot.key;
       formerInvestments.push(childSnapshot.val());
       console.log(childSnapshot.val())
      })
      this.setState({formerInvestments});
      console.log(formerInvestments);
    }.bind(this));
  }


  showCarbonDioxideEmission() {
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid).once('value').then(function(snapshot){
      var carbonEmission = (snapshot.val()) && snapshot.val().reducedCO2;
      var peopleWithElectricity = (snapshot.val()) && snapshot.val().soldPanels;
      console.log(peopleWithElectricity);
      this.setState({peopleWithElectricity});
      this.setState({carbonEmission});
    }.bind(this));
  }
  showUserInformation() {
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid).once('value').then(function(snapshot){
      var username  = (snapshot.val()) && snapshot.val().username;
      var email = (snapshot.val()) && snapshot.val().email;
    });
  }

  /*showInvestments() {
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid).once('value').then(function(snapshot){
    var investment = (snapshot.val()) && snapshot.val().investment;
    if (investment === 0){
      return null
    }
    else {
    
    }
    });
  }*/

  
  render() {


    const isInvalid = 
      this.state.account === '' ||
      this.state.account === 0 ||
      this.state.account < 1;

    return(
    <div class="container">
      <div class="row">
        <div class="col" style={boxStyle}>
        <center>
            <h4>Impact</h4>
          </center>
          <div class="row">
            <div class="col">
              <center>
              <img style={imgStyle} src={icon}></img>
              <h6>{this.state.carbonEmission}</h6>
              <h6>Tons reduced carbon dioxide </h6>
              </center>
            </div>
            <div class="col">
              <center>
              <h4><fontAwsome.FaHome style={houseStyle}/></h4>
              <h6>{this.state.peopleWithElectricity}</h6>
              <h6>Households provided with electricity</h6>
              </center>
            </div>
          
          
          </div>  
          
       
       
       
       
        </div>

          
          <div class="col">
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
                  Make Investment
                </Button>
                </div>
            </form>
            </center>
        </div>
        <div class="col">
          <div id="openweathermap-widget-22"></div>
        </div>
        
        
        </div>
        
        
        <div class="row" >
          <div class="col" style={boxStyle}>
          <center>
          <h4>Investments</h4>
          </center>
          <div class="row">
            <div class="col">
            <center>
            <h5>Date</h5>
            </center>
            <ul>
            {this.state.formerInvestments.map(function(item, i){
            return (
              <center>
               <li key={i}> <h6> {item.dateOfInvestment}</h6></li>
              </center>
              )
            })
            }
            </ul>
            </div>
            
            <div class="col">
            <center>
            <h5>Amount</h5>
            </center>
            <ul>
            {this.state.formerInvestments.map(function(item, i){
            return (
              
                <h6 key={i} style={paddingStyle}>{item.investment} €</h6>
  
              )
            })
            }
            </ul>         
            </div>
          </div>
          </div>
          <div class="col">
          </div>
          <div class="col">  
          </div>

          </div>





      </div>
    );
  }
  
}


const paddingStyle= {
  marginTop:12.5
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

const houseStyle= {
  height: 85,
  width: 85,
  paddingBottom: 15
}

const imgStyle= {
  height: 95,
  width: 75,
  paddingBottom: 20
}

const boxStyle = {
  background: 'white',
  border: 2,
  borderStyle: 'solid',
  marginBottom: 16,
  paddingTop: 16,
  paddingRight: 16,
  paddingLeft: 16,
  paddingBottom: 32
}


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
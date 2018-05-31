import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {firebase } from '../../firebase';
import * as realFirebase from 'firebase';
import * as fontAwsome from 'react-icons/lib/fa';
import icon from '../../carbon.ico';

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

  //Updates account value after button press.
  handleChange(event) {
    this.setState({account: event.target.value});
  }
  
  //Sets variables to specifik values. Updates Account and sets new investments.
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

  //Runs after page is rendered.
  componentDidMount() {
    this.showFormerInvestments()
    this.showImpact()
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid).once('value').then(function(snapshot){
      var formeraccount = (snapshot.val() && snapshot.val().account);
      this.setState({formeraccount});
    }.bind(this));
  }
  
  //Shows all former investments
  showFormerInvestments() {
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid + '/investments' ).once('value').then(function(snapshot){
      let formerInvestments = [];
      snapshot.forEach(function(childSnapshot){
       var key = childSnapshot.key;
       formerInvestments.push(childSnapshot.val());
      })
      this.setState({formerInvestments});
    }.bind(this));
  }

  //Shows impact in form of Reduced Carbon dioxide emissions and households provided electricity.
  showImpact() {
    let uid = realFirebase.auth().currentUser.uid;
    firebase.db.ref('users/' + uid).once('value').then(function(snapshot){
      var carbonEmission = (snapshot.val()) && snapshot.val().reducedCO2;
      var peopleWithElectricity = (snapshot.val()) && snapshot.val().soldPanels;
      console.log(peopleWithElectricity);
      this.setState({peopleWithElectricity});
      this.setState({carbonEmission});
    }.bind(this));
  }


  //Renders all HTML code.
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

//STYLING

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

//Sets this sessions user to Authorized user.
const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

//Checks if User is logged in.
const authCondition = (authUser) => !!authUser;

//Exports functions above to different files.
export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(Account);

//Shows todays date.
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
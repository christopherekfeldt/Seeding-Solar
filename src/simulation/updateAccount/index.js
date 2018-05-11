import react from 'react';
import {firebase, db} from '../../firebase/index';
import { defaultCipherList } from 'constants';


function updateAccount (){
    firebase.db.ref('users/').once('value', function(snapshot) {
        var updates = {};
        snapshot.forEach(function(childSnapshot) {
            var account = childSnapshot.val().account;
            var investments = childSnapshot.val().investments;
            updates[childSnapshot.key + '/account'] = account;// -(-investments);
            firebase.db.ref('/users').update(updates);
        });
    });
    firebase.db.ref('users/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            console.log(childSnapshot.val().account);
            getTodaysDate();
        });
    });
}

function getTodaysDate(){
    var today = new Date();
    /*var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10){
        '0' + dd;
    }
    if (mm < 10){
        '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;*/
    console.log(today);
}

function updatePanelsPerMonth (){
    firebase.db.ref('users/').once('value', function(snapshot) {
        var updates = {};
        snapshot.forEach(function(childSnapshot) {

        }) 
    })
}

/*function updateSoldPanels () {
    firebase.db.ref('users/').once('value', function(snapshot) {
        var updates = {};
        snapshot.forEach(function(childSnapshot){

        })
    })
}*/



export default updateAccount;

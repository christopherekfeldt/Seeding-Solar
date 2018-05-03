import react from 'react';
import {firebase, db} from '../../firebase/index';
import { defaultCipherList } from 'constants';


function updateAccount (){
    firebase.db.ref('users/').once('value', function(snapshot) {
        var updates = {};
        snapshot.forEach(function(childSnapshot) {
            var temp = childSnapshot.val().test;
            updates[childSnapshot.key + '/test'] = temp + 3;
            firebase.db.ref('/users').update(updates);

            
        });
    });
    firebase.db.ref('users/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            console.log(childSnapshot.val().test);
        });
    });
}



export default updateAccount;

import * as firebase from 'firebase';
import updateAccount from '../simulation/updateAccount';
import SetInterval from 'set-interval';

const config = {
  apiKey: "AIzaSyDPj0BZVQebAYww_VUFXhbEXPP-n2gq120",
  authDomain: "seeding-solar.firebaseapp.com",
  databaseURL: "https://seeding-solar.firebaseio.com",
  projectId: "seeding-solar",
  storageBucket: "seeding-solar.appspot.com",
  messagingSenderId: "1066950282834"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
 //SetInterval.start(updateAccount, 20000, 'updateAccount');
}



const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};

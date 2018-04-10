import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDPj0BZVQebAYww_VUFXhbEXPP-n2gq120",
    authDomain: "seeding-solar.firebaseapp.com",
    databaseURL: "https://seeding-solar.firebaseio.com",
    projectId: "seeding-solar",
    storageBucket: "seeding-solar.appspot.com",
    messagingSenderId: "1066950282834"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.EmailAuthProvider();
  export const auth = firebase.auth();
  export default firebase;
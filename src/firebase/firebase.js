import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyDPj0BZVQebAYww_VUFXhbEXPP-n2gq120",
  authDomain: "seeding-solar.firebaseapp.com",
  databaseURL: "https://seeding-solar.firebaseio.com",
  projectId: "seeding-solar",
  storageBucket: "seeding-solar.appspot.com",
  messagingSenderId: "1066950282834"
};

const devConfig = {
  apiKey: "AIzaSyDPj0BZVQebAYww_VUFXhbEXPP-n2gq120",
  authDomain: "seeding-solar.firebaseapp.com",
  databaseURL: "https://seeding-solar.firebaseio.com",
  projectId: "seeding-solar",
  storageBucket: "seeding-solar.appspot.com",
  messagingSenderId: "1066950282834"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};

import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, test) => 
  db.ref(`users/${id}`).set({
    username,
    email,
    test
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...

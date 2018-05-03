import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, investments, account, panelsPerMonth, activePanels, soldPanels, reducedCO2) => 
  db.ref(`users/${id}`).set({
    username,
    email,
    investments,
    account,
    panelsPerMonth,
    activePanels,
    soldPanels,
    reducedCO2
    
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...

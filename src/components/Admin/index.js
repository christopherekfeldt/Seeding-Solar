var admin = require('firebase-admin');

var serviceAccount = require('/Users/User/Documents/test/Seeding-Solar/src/components/Admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://seeding-solar.firebaseio.com'
});

// Use the shorthand notation to retrieve the default app's services
var adminAuth = admin.auth();
var adminDatabase = admin.database();

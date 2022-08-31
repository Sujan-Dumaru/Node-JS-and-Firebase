var admin = require("firebase-admin");

var serviceAccount = require("../files/api-demo-b55d8-firebase-adminsdk-qrjwm-cc4cc3daae.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = {admin, db };
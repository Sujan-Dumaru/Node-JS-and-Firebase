const { getAuth } = require('firebase/auth');
const firebase = require('firebase/app');
// const firebaseAuth = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDNPc1hSFkehGQQFS7ryJMpZ9aKf-_NK8Q",
    authDomain: "api-demo-b55d8.firebaseapp.com",
    projectId: "api-demo-b55d8",
    storageBucket: "api-demo-b55d8.appspot.com",
    messagingSenderId: "159245383119",
    appId: "1:159245383119:web:2a7aafa943f67c6ec58eba",
    measurementId: "G-0Y41JQRTH2"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

module.exports = { firebase, auth };
import firebase from 'firebase';

const firebaseConfig = {
  // Your credentials
  apiKey: "AIzaSyDwefo6GTHoWs5j4L9T_oF9NzwSUNsPoNY",
  authDomain: "project-authentication-3bae3.firebaseapp.com",
  projectId: "project-authentication-3bae3",
  storageBucket: "project-authentication-3bae3.appspot.com",
  messagingSenderId: "1056908411974",
  appId: "1:1056908411974:web:2a56de0fed82ffa624f647"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();
export { auth, firebase, db };

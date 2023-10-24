import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDIwmKuKyCb7ftSvdxflGgWFDu9EKajZFs",
  authDomain: "finalproject-76203.firebaseapp.com",
  databaseURL: "https://finalproject-76203-default-rtdb.firebaseio.com",
  projectId: "finalproject-76203",
  storageBucket: "finalproject-76203.appspot.com",
  messagingSenderId: "48583842863",
  appId: "1:48583842863:web:4fe5bf2ac0556a29207ada"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
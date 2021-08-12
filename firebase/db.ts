import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDfmoNvvppvsrmbCV7ZlI3R2pBq6sNMB4Q",
    authDomain: "nextjs-whatsapp-ec6db.firebaseapp.com",
    projectId: "nextjs-whatsapp-ec6db",
    storageBucket: "nextjs-whatsapp-ec6db.appspot.com",
    messagingSenderId: "46374281499",
    appId: "1:46374281499:web:035619a97d05b2a5ff33be",
    measurementId: "G-EC9CW87C9R"
  };
// Initialize Firebase

let app: firebase.app.App;

if(!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
  // app.analytics();
}  else {
  app = firebase.app();
}

export const db = app.firestore();
export const auth = app.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from "../config";

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
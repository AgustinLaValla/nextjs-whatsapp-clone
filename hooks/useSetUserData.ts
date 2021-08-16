import React from "react"
import { db } from "../firebase/db"
import firebase from "firebase"

export const useSetUserData = (user: firebase.User | null | undefined) => {

  React.useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .get()
        .then(resp => {
          if (!resp.data()) {
            db.collection('users').doc(user.uid).set({
              id: user.uid,
              username: user.displayName,
              email: user.email,
              lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
              photoURL: user.photoURL
            }, { merge: true });
          } else {
            db.collection('users').doc(user.uid).update({
              lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
              photoURL: user.photoURL
            });
          }
        })
    }
  }, [user])
}
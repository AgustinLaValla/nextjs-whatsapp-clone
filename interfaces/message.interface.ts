import firebase from "firebase";

export interface Message {
    id?: string;
    message: string;
    timestamp: firebase.firestore.Timestamp | number;
}
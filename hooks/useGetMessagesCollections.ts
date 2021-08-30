import React from "react";
import { db } from "../firebase/db";
import { Message } from "../interfaces/message.interface";
import firebase from "firebase";

export const useGetMessagesCollection = (id: string) => {
    const [messages, setMessage] = React.useState<Message[]>([]);
    const messagesObs$ = React.useRef<() => void>(() => {});

    const setDate = (timestamp) => {
        if(timestamp) {
            return timestamp?.toDate()?.getTime()
        }
        return 0;
    }

    React.useEffect(() => {
      messagesObs$.current = db
        .collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy('timestamp', 'asc')
        .onSnapshot((snap) => {
            const messagesCollection = snap.docs.map(
                (doc) => ({ 
                    ...doc.data(), 
                    id: doc.id,
                    timestamp: setDate(doc.data().timestamp) 
                } as Message));
            setMessage(messagesCollection);
        });

        return messagesObs$.current;
    }, []);

  return [messages];
};

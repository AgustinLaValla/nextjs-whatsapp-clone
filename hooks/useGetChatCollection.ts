import firebase from "firebase";
import React from "react";
import { db } from "../firebase/db";
import { Chat } from "../interfaces/Chat.interface";

export const useGetChatCollection = (user: firebase.User | null | undefined) => {
    const [chats, setChats] = React.useState<Chat[]>([]);
    const snapObs$ = React.useRef<() => void>(() => {});

    const getChatCollection = () => {
      snapObs$.current = db
        .collection("chats")
        .where("users", "array-contains", user?.email || "")
        .onSnapshot((snap) => {
            const chatCollection = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Chat));
            setChats(chatCollection);
          },
          (error) => console.log({ error })
        );
    };

    React.useEffect(() => {
        if(user) {
            getChatCollection();
        }

        return snapObs$.current;
    }, [user])

    return [chats];

};

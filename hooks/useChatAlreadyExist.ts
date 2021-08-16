import React from "react";
import { Chat } from "../interfaces/Chat.interface";
import firebase from "firebase";

export const useChatAlreadyExist = (
  user: firebase.User | null | undefined,
  receipientUser: string,
  chats: Chat[] = []
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [chatExists, setChatExist] = React.useState<boolean>(true);
  const snapObs$ = React.useRef<() => void>(() => {});

  const setChatExistValue = () => {
    if(!chats.length) {
      setChatExist(false);
      return;
    } 
    const chat = chats.find((chat) => chat.users.find((user) => user === receipientUser));
    setChatExist(!!chat);
  };

  React.useEffect(() => {
    if (user && receipientUser) {
      setChatExistValue();
    }

    return snapObs$.current;
  }, [receipientUser]);

  return [chatExists, setChatExist];
};

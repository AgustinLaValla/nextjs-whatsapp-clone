import firebase from "firebase";
import React from "react";
import { db } from "../firebase/db";

export const useCreateChat = (
    user: firebase.User | null | undefined,
    receipientUser: string,
    chatAlreadyExist: boolean,
    setChatExist: React.Dispatch<React.SetStateAction<boolean>>
) => {
    React.useEffect(() => {
        if(!chatAlreadyExist && receipientUser && user) {
            db.collection('chats')
            .add({
                users: [user?.email, receipientUser],
    
            })
            .then(() => {
                console.log('Created');
                setChatExist(true);
            })
            .catch(console.log)
        }
        
        () => {}
        
    }, [chatAlreadyExist])
};

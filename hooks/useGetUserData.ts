import React from "react";
import { db } from "../firebase/db"
import { User } from "../interfaces/User";

export const useGetUserData = (userId: string) => {
    const [userDoc, setUserDoc] = React.useState<User>();
    const userObs$ = React.useRef<() => void>(() => {});

    const getUserDoc = () => {
        userObs$.current = db.collection('users').doc(userId).onSnapshot(snap => {
            setUserDoc(({...snap.data(), id: snap.id} as User));
        })
    }

    React.useEffect(() => {
        if(userId) {
            getUserDoc();
        }

        return userObs$.current;
    },[userId])

    return [userDoc];
}
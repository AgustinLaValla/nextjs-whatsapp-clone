import React from "react";
import { db } from "../firebase/db";
import { User } from "../interfaces/User";

export const useGetRecipientData = (recipientEmail: string | undefined) => {
  const [recipientData, setRecipientData] = React.useState<User>();
  const recipientObs$ = React.useRef<() => void>(() => {});

  const getRecipientData = () => {
    recipientObs$.current = db.collection("users")
        .where("email", "==", recipientEmail)
        .onSnapshot((snap) =>
            setRecipientData({ ...snap.docs?.[0]?.data(), id: snap.docs?.[0].id } as
                | User
                | undefined
            )
        );
  } 

    React.useEffect(() => {
        if(recipientEmail) {
            getRecipientData();
        }

        return recipientObs$.current;
    }, [recipientEmail])

    return [recipientData];
};

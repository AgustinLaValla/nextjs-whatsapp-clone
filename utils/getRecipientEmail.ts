import firebase from "firebase";

export const getRecipientEmail = (
    users: [string, string],
    userLoggedIn: firebase.User | null | undefined
) => {
  return users?.find((user) => user !== userLoggedIn?.email);
};

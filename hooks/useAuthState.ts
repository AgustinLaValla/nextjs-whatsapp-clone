import React from "react";
import { auth } from "../firebase/db";
import firebase from "firebase";

export const useAuthState = (): [
  firebase.User | null | undefined,
  boolean | undefined,
  firebase.auth.Error | null | undefined
] => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<firebase.auth.Error | null>();

  React.useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(
      (userState) => {
        setUser(userState);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, []);

  return [user, loading, error];
};

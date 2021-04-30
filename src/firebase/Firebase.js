import React, { useContext, useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCeeBRcdqKKR1goFtZ3CazY_ynqKnkOGZo",
    authDomain: "listingreproduction.firebaseapp.com",
    projectId: "listingreproduction",
    storageBucket: "listingreproduction.appspot.com",
    messagingSenderId: "524067399148",
    appId: "1:524067399148:web:3e70524e9137e0abeb8cc9",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
export const storage = firebase.storage();

const UserContext = createContext();

export function useAuth() {
  return useContext(UserContext);
}

function signup(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function logout() {
  return firebase.auth().signOut();
}

function resetPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsub;
  }, []);

  // Gets functions and assigns them as values for the provider.

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    database,
    storage,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

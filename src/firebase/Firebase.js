import React, { useContext, useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5oY0ASfeBj_MpuaI2iX0gQdUDzyvJmHQ",
  authDomain: "listingreactfirebase.firebaseapp.com",
  projectId: "listingreactfirebase",
  storageBucket: "listingreactfirebase.appspot.com",
  messagingSenderId: "530552083886",
  appId: "1:530552083886:web:18a1f0b10c16ec9202e43f",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();

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
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

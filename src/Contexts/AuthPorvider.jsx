import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import Loading from "../Shared/Loading/Loading";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log("user in the auth state change", currentUser);
  });

  return () => unsubscribe();
}, []);


  const authInfo = {
    createUser,
    signInUser,
    signOutUser,
    googleSignIn,
    user,
    loading,
    setLoading,
  };

  // ✅ Corrected Provider usage here
  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

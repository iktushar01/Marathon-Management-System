import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase.init'
const AuthPorvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading();
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const authInfo = {
    createUser,
    loading,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthPorvider;

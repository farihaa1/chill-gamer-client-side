import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase.init";

const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updatedUserProfile = ({ displayName, photoURL }) => {
    if (auth.currentUser) {
      setLoading(true);
      return updateProfile(auth.currentUser, { displayName, photoURL })
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error updating profile: ", error);
          setLoading(false);
        });
    } else {
      return Promise.reject(new Error("No user is currently logged in."));
    }
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const userInfo = {
    user,
    loading,
    setUser,
    createUser,
    loginUser,
    logout,
    updatedUserProfile
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProviders;

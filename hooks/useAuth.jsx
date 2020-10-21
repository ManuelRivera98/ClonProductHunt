import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index';

function useAuth () {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAuth(user);
      } else { 
        setUserAuth(null);
      }
    });
    return () => unsubscribe();
  }, [])

  return userAuth;
}


export default useAuth;

import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from 'prop-types';
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photoUrl
    })
}

  // useEffect(() => {
  //   const unsubscribe = () => {
  //       onAuthStateChanged(auth, async (currentUser) => {
  //           setUser(currentUser)
  //           if(currentUser){
  //             const userInfo = { email: currentUser.email}
  //             axiosPublic.post(`/jwt`, userInfo)
  //             .then(res => {
  //               if(res.data.token) {
  //                 localStorage.setItem('access-token', res.data.token)
  //                 setLoading(false);
  //               }
                
  //             })
  //           }
  //           else {
  //             localStorage.removeItem('access-token')
  //             setLoading(false);
  //           }
  //           console.log('current user ', currentUser);
  //       })
  //   }
  //   return () => {
  //       return unsubscribe();
  //   }
  // },[axiosPublic])
  useEffect(() => {
    const unsubscribe = () => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser) {
                const userInfo = {email : currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token) {
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false);
                    }
                })
            }
            else {
                //
                localStorage.removeItem('access-token')
                setLoading(false);
            }
            console.log('current user', currentUser);
            
        })
    }
    return () => {
        return unsubscribe()
    }
},[axiosPublic])

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;
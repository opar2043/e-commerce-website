
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
export const AuthContex = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart , setCart] = useState([])

  const provider = new GoogleAuthProvider()
    function handleGoogle() {
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  function handleLogout(){
    setLoading(true);
    return signOut(auth)
  }

  function handleRegister(email , pass){
      setLoading(true)
      return createUserWithEmailAndPassword(auth , email , pass)
  }

  function handleLogin(email , pass){
     setLoading(true)
     return signInWithEmailAndPassword(auth , email , pass)
  }

  function resetPass (email){
       setLoading(true)
       return sendPasswordResetEmail(auth, email)
  }

  useEffect(()=>{
     const unsub = onAuthStateChanged(auth , currentUser => {
          if(currentUser){
               setLoading(false)
               setUser(currentUser)
          }else{
               setLoading(true)
               setUser(null)
          }
     })

     return ()=> unsub()
  },[])

  const obj = {
    user,
    setUser,
    loading,
    setLoading,
    handleGoogle ,
    handleLogout,
    handleRegister,
    resetPass,
    handleLogin,
    cart,
    setCart
  };

  return <AuthContex.Provider value={obj}>{children}</AuthContex.Provider>;
};

export default AuthProvider;
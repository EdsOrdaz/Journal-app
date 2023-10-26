import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth );
    const dispatch = useDispatch();
  
    useEffect(() => {
        onAuthStateChanged( FirebaseAuth, async( user ) => {
        if( !user ) return; dispatch( logout() );
  
        const { email, displayName, uid, photoURL } = user;
        dispatch( login({ email, displayName, uid, photoURL }));
  
  
      } )
    }, [])

    return{
        status
    }
}

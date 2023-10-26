import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./";

const googleProvider = new GoogleAuthProvider();

export const singInGoogle = async() => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        const credentials = GoogleAuthProvider.credentialFromResult( result );

        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    }
    catch( error ){
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async( {email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth , email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        } );

        return { 
            ok: true,
            uid, email, photoURL, displayName
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async({ email, password}) => {
  try {
        const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = user;
        return{
            ok: true,
            displayName, email, photoURL, uid
        }
  } catch (error) {
        return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}





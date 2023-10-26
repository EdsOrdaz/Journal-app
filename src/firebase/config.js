// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz7aG9HcuU6DsbhiMdSKyzi1pgxiwsWfs",
  authDomain: "react-cursos-9eb8c.firebaseapp.com",
  projectId: "react-cursos-9eb8c",
  storageBucket: "react-cursos-9eb8c.appspot.com",
  messagingSenderId: "400563132706",
  appId: "1:400563132706:web:da3817b2547559276ded7b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

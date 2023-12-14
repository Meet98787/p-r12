import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDq0HueQCl7lTHgl9o4NLk1QOfIZP7Xuyw",
  authDomain: "auth-c64fa.firebaseapp.com",
  projectId: "auth-c64fa",
  storageBucket: "auth-c64fa.appspot.com",
  messagingSenderId: "855584174582",
  appId: "1:855584174582:web:843d225fa11cfdef3cd7d7"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const authh = getAuth(app);

export { authh, GoogleAuthProvider, signInWithPopup ,app};

export const auth = firebase.auth();
export const handleLogout = () => {
  auth.signOut().then(() => {
    window.location.href = "/";
  });
};
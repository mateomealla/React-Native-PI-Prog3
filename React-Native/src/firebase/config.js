import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCKlWvZGzGsmPB9eWpEJqu7SPWyoNyS86Q",
  authDomain: "proyectointegrador-6fc5a.firebaseapp.com",
  projectId: "proyectointegrador-6fc5a",
  storageBucket: "proyectointegrador-6fc5a.firebasestorage.app",
  messagingSenderId: "1044324750089",
  appId: "1:1044324750089:web:88b7dd1cab7a74452539d8"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore(); 
export const storage = app.storage();


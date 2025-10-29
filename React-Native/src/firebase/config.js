import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCrhGUUBLEITXTT2dvoH8GovkWEHblA9Zk",
  authDomain: "my-proyect-a71d9.firebaseapp.com",
  projectId: "my-proyect-a71d9",
  storageBucket: "my-proyect-a71d9.firebasestorage.app",
  messagingSenderId: "584354493451",
  appId: "1:584354493451:web:b5f37fa8d8ab7c5853430e"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore(); 


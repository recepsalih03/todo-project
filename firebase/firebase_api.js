// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM_Wpwx1zBhKSwUuBjZBbCUkm7Svm8PTc",
  authDomain: "todo-app-b3b5b.firebaseapp.com",
  projectId: "todo-app-b3b5b",
  storageBucket: "todo-app-b3b5b.appspot.com",
  messagingSenderId: "438382493004",
  appId: "1:438382493004:web:a3408a49ef91a6fcc5a3e9",
  measurementId: "G-0GXB3PQXP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
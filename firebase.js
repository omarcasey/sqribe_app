// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL0Lx5sIYqRHp6iwzhDvMJMZiabagczUE",
  authDomain: "sqribe-app.firebaseapp.com",
  projectId: "sqribe-app",
  storageBucket: "sqribe-app.appspot.com",
  messagingSenderId: "282839036184",
  appId: "1:282839036184:web:877680c5ab0fe7e6d62e6d",
  measurementId: "G-8FVT4D4R16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

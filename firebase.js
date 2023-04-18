import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDL0Lx5sIYqRHp6iwzhDvMJMZiabagczUE",
  authDomain: "sqribe-app.firebaseapp.com",
  projectId: "sqribe-app",
  storageBucket: "sqribe-app.appspot.com",
  messagingSenderId: "282839036184",
  appId: "1:282839036184:web:877680c5ab0fe7e6d62e6d",
  measurementId: "G-8FVT4D4R16"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
export { db };
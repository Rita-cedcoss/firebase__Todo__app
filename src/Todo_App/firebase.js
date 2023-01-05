// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import{getDatabase} from "firebase/database"
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFbyYrna6KkOSlbeOCOrs1kyj6QyYAo6k",
  authDomain: "todoapp-e87ed.firebaseapp.com",
  projectId: "todoapp-e87ed",
  storageBucket: "todoapp-e87ed.appspot.com",
  messagingSenderId: "193465518388", 
  appId: "1:193465518388:web:8d0543c798e10898cdbd61",
  measurementId: "G-WZQYHTWPR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db=getFirestore(app)
// const analytics = getAnalytics(app);
export default app
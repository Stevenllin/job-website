// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC05OaMurt9yF8cWzGrAwqc0dxSBixhUVM",
  authDomain: "job-website-1dd26.firebaseapp.com",
  projectId: "job-website-1dd26",
  storageBucket: "job-website-1dd26.appspot.com",
  messagingSenderId: "322316708411",
  appId: "1:322316708411:web:73eab8af37c5dbf8dbca1e",
  measurementId: "G-FCJJGFVR51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app);
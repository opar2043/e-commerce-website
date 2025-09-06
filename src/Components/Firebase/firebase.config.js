// npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtqiRnwC4q6ujXLrHpzzBcofCAs9qeUBY",
  authDomain: "gym-project-7eb9b.firebaseapp.com",
  projectId: "gym-project-7eb9b",
  storageBucket: "gym-project-7eb9b.firebasestorage.app",
  messagingSenderId: "918238493396",
  appId: "1:918238493396:web:817b67e48484110f7d9941"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 export default auth;
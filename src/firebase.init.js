// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwGhi3ea4NYZNx69cSYimKIo0pG46vcEM",
  authDomain: "chill-gamers.firebaseapp.com",
  projectId: "chill-gamers",
  storageBucket: "chill-gamers.firebasestorage.app",
  messagingSenderId: "513540750631",
  appId: "1:513540750631:web:39883c9ec97f4f7af97d02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
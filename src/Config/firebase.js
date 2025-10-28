// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa6P9V8aJYvZb0_Ig5cSZ1ovVXUPyFeRI",
  authDomain: "ecotrack-a7c3a.firebaseapp.com",
  projectId: "ecotrack-a7c3a",
  storageBucket: "ecotrack-a7c3a.firebasestorage.app",
  messagingSenderId: "939032416083",
  appId: "1:939032416083:web:cae9b879e642db07309ba6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
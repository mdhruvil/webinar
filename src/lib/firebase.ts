// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA90AEEfK2-7iC-gwB7AIxBt7IeMQK8O7w",
  authDomain: "edusakha-events.firebaseapp.com",
  projectId: "edusakha-events",
  storageBucket: "edusakha-events.appspot.com",
  messagingSenderId: "254036139403",
  appId: "1:254036139403:web:a5ba64aa34c469586d638e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

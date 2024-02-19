// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "mern-blog-babf7.firebaseapp.com",
    projectId: "mern-blog-babf7",
    storageBucket: "mern-blog-babf7.appspot.com",
    messagingSenderId: "759600122292",
    appId: "1:759600122292:web:0d071a556cc331dceecae1"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
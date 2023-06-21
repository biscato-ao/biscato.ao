// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAjvJJlhrhrrRZ3CnqmeQ8202cHWa85UXc",
  authDomain: "biscato-ao.firebaseapp.com",
  projectId: "biscato-ao",
  storageBucket: "biscato-ao.appspot.com",
  messagingSenderId: "220765607924",
  appId: "1:220765607924:web:ae3b930e0dd89998674ba1",
  measurementId: "G-GZ15Q2T66Q"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
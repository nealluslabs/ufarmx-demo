import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";


/* BONECOLE ERP
const firebaseConfig = {
  apiKey: "AIzaSyCHhVUwhnVBc5QKuGvSfOox-bl79L9XqOo",
  authDomain: "boncole-44e56.firebaseapp.com",
  projectId: "boncole-44e56",
  storageBucket: "boncole-44e56.appspot.com",
  messagingSenderId: "765277216419",
  appId: "1:765277216419:web:74e5a4524307797ac56916",
  measurementId: "G-G0MPE3S0M3"
};*/


/**UfarmX FIREBASE */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();

export const static_img = 'https://firebasestorage.googleapis.com/v0/b/bridgetech-advance-project.appspot.com/o/profile_images%2Fprofile.jpg?alt=media&token=b3c94ada-1b08-4834-bbd1-647882c7195a';







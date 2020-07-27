import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-1g3YbVrxsJTC8vAdmbT61TZ0pt5fYX4",
  authDomain: "anvaas-43a4b.firebaseapp.com",
  databaseURL: "https://anvaas-43a4b.firebaseio.com",
  projectId: "anvaas-43a4b",
  storageBucket: "anvaas-43a4b.appspot.com",
  messagingSenderId: "994577419378",
  appId: "1:994577419378:web:7f1bacd2f99c0ace7006eb",
  measurementId: "G-TDB15FRMCB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebase;

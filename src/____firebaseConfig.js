import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBrbp6qgMQTdulFTl3oupuQa1_4G6zvBsk",
  authDomain: "lunch-booking-380210.firebaseapp.com",
  projectId: "lunch-booking-380210",
  storageBucket: "lunch-booking-380210.appspot.com",
  messagingSenderId: "1058830329036",
  appId: "1:1058830329036:web:f562cbee96fb5a4a01ce69",
  measurementId: "G-X3RHXPY5BM",
};

firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();

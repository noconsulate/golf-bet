import { firebase } from "@firebase/app";

// Required for side-effects
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDPdOcr0t55h-fxaMgkIRXHRwpkcLhhMm8",
  authDomain: "golf-bets.firebaseapp.com",
  projectId: "golf-bets",
  storageBucket: "golf-bets.appspot.com",
  messagingSenderId: "836320906622",
  appId: "1:836320906622:web:21b441405daa05f574b72f",
  measurementId: "G-WM2R9S6CXJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

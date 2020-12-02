
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  let firebaseConfig = {
  // Insert Firebase Credentials here
  apiKey: "AIzaSyDIbTLX-_jeNvd_WkOwbfcfpuMKLNTWKww",
  authDomain: "coffee-cuop.firebaseapp.com",
  databaseURL: "https://coffee-cuop.firebaseio.com",
  projectId: "coffee-cuop",
  storageBucket: "coffee-cuop.appspot.com",
  messagingSenderId: "229914810743",
  appId: "1:229914810743:web:e16cbd3f127c440cc32972"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore();

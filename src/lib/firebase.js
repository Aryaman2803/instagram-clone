import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//* Here I want to Import the seed file
// import { seedDatabase } from "../seed";
//ignorree
const config = {
  apiKey: "AIzaSyCvrIKxwTNiWu7Ip05RSbTCcXchY8LIzpk",
  authDomain: "instagram-clone-965cc.firebaseapp.com",
  projectId: "instagram-clone-965cc",
  storageBucket: "instagram-clone-965cc.appspot.com",
  messagingSenderId: "1060488058275",
  appId: "1:1060488058275:web:1de145ed64355ff9357616",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

//* here is I will call the seed.js file once
// seedDatabase(firebase);

export { firebase, FieldValue };

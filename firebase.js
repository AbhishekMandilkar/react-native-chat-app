import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBou7gwDoitaPKA7ditCFh5Dkn-iykn-Eg",
  authDomain: "signal-clone-2df8b.firebaseapp.com",
  projectId: "signal-clone-2df8b",
  storageBucket: "signal-clone-2df8b.appspot.com",
  messagingSenderId: "147735554975",
  appId: "1:147735554975:web:16150a3c84aa1a9ed12baa",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

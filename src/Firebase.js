import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDYI0fVBYpBWzRYKvD8p256BFSvzJyPpGA",
    authDomain: "netflix-clone-d466a.firebaseapp.com",
    projectId: "netflix-clone-d466a",
    storageBucket: "netflix-clone-d466a.appspot.com",
    messagingSenderId: "1018707957782",
    appId: "1:1018707957782:web:c4ce17d07b551f0f9b7d37"
  };

  // Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
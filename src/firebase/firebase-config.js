import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCw8wISqCHnwyB54jdy4WTNBkOYjVwi1BM",
    authDomain: "react-journal-app-e57bb.firebaseapp.com",
    projectId: "react-journal-app-e57bb",
    storageBucket: "react-journal-app-e57bb.appspot.com",
    messagingSenderId: "1053268806729",
    appId: "1:1053268806729:web:60931fe11a3fe2eb23c398"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}
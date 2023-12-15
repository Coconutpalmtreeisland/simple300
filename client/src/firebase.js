import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDHjqA3O8rI-E99GSzPVBPDrfc8u3rEKBE",
    authDomain: "simple200.firebaseapp.com",
    projectId: "simple200",
    storageBucket: "simple200.appspot.com",
    messagingSenderId: "1012579919298",
    appId: "1:1012579919298:web:0866fd6a27dc9c7b54a25b"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
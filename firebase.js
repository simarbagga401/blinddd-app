import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey:"AIzaSyC0o27iPv_Q8uiuKbIxUp8aAoivZniz300",
  authDomain:"blindddchat.firebaseapp.com",
  projectId:"blindddchat",
  storageBucket:"blindddchat.appspot.com",
  messagingSenderId:"471241017972",
  appId:"1:471241017972:web:d5117e089830348709df21",
  measurementId:"G-B6SDRRJ84K",
});

const db = getFirestore(app)

export{
    db
}
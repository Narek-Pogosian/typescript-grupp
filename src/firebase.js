import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsKIbwXIjtpojtuMUSWljPCmni-Py2cHw",
  authDomain: "typescript-grupp.firebaseapp.com",
  projectId: "typescript-grupp",
  storageBucket: "typescript-grupp.appspot.com",
  messagingSenderId: "658697257224",
  appId: "1:658697257224:web:976c7f70e2ba9653eb2cbd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

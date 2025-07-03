import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3dJWDxNct9BI_TIr1VXWxqkn-Fh0e-YI",
  authDomain: "lankan-travalester.firebaseapp.com",
  projectId: "lankan-travalester",
  storageBucket: "lankan-travalester.firebasestorage.app",
  messagingSenderId: "808762649847",
  appId: "1:808762649847:web:0695e91acabc252584b7f2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

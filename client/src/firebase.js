import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_6QfNz_qk4AkuROtxgTtSKSwa_CsuGv8",
    authDomain: "netflix-3fc8c.firebaseapp.com",
    projectId: "netflix-3fc8c",
    storageBucket: "netflix-3fc8c.firebasestorage.app",
    messagingSenderId: "950889774143",
    appId: "1:950889774143:web:61218aa3cbdb5397678c8a"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db, collection, getDocs };
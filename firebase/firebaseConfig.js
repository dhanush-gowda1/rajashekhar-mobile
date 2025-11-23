import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO_Rh5VsgfTSJlcqY7RUP97tqkedk9Rw4",
  authDomain: "rajashekhar-properties.firebaseapp.com",
  projectId: "rajashekhar-properties",
  storageBucket: "rajashekhar-properties.firebasestorage.app",
  messagingSenderId: "72196676872",
  appId: "1:72196676872:web:e938d77281392964a5e0bd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

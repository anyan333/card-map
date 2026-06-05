import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAL7nN84ile_HbaemQGKgJRzgPtNsscdm8",
  authDomain: "card-map-47952.firebaseapp.com",
  projectId: "card-map-47952",
  storageBucket: "card-map-47952.firebasestorage.app",
  messagingSenderId: "466076291493",
  appId: "1:466076291493:web:7d0c3fc5ca8156521d184c",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
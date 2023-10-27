import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

export const firebaseConfig = {
  // apiKey: "AIzaSyA-epGVgaQ-0gdki_uB-Dbm-qkc2pcqNo4",
  // authDomain: "uee-job-finder-project.firebaseapp.com",
  // projectId: "uee-job-finder-project",
  // storageBucket: "uee-job-finder-project.appspot.com",
  // messagingSenderId: "122421237502",
  // appId: "1:122421237502:web:0da7833527355e4e46b7af",
  // measurementId: "G-FG1JW11Z0X",
  apiKey: "AIzaSyBKI416j9NXKqT9zF4YqMe4SlzztrPgoWg",
  authDomain: "reseach-db-1.firebaseapp.com",
  projectId: "reseach-db-1",
  storageBucket: "reseach-db-1.appspot.com",
  messagingSenderId: "1033467405889",
  appId: "1:1033467405889:web:80c87061216981be4ec8c0",
  measurementId: "G-6XQJNC188L",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore(app);
export default app;

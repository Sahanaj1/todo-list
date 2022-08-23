
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD2TIy-_44Sh7Ye0P3TdoAXJ9Vcxfg551U",
  authDomain: "todo-list-3f232.firebaseapp.com",
  databaseURL: "https://todo-list-3f232-default-rtdb.firebaseio.com",
  projectId: "todo-list-3f232",
  storageBucket: "todo-list-3f232.appspot.com",
  messagingSenderId: "534259044909",
  appId: "1:534259044909:web:32d460659a97d4a0529ea4",
  measurementId: "G-HTJZ9DEJS4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();
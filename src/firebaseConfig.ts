import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdo9czH7sO4yMgq6nPc0Zatuj2kFqrPFA",
  authDomain: "phantom-4351b.firebaseapp.com",
  projectId: "phantom-4351b",
  storageBucket: "phantom-4351b.appspot.com",
  messagingSenderId: "941596853308",
  appId: "1:941596853308:web:f499bae78d29862f742f39",
  measurementId: "G-VCTR0SK3VT",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();

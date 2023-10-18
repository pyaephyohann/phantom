import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdwtJ1JxWvdasFSrenYisWgeecS6c7a2U",
  authDomain: "shwe-myint-mol-production.firebaseapp.com",
  projectId: "shwe-myint-mol-production",
  storageBucket: "shwe-myint-mol-production.appspot.com",
  messagingSenderId: "66586702497",
  appId: "1:66586702497:web:360bfe2562fe939c7276e0",
  measurementId: "G-3N2JPJC854",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();

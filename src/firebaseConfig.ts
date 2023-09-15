import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASo5RNt7YnHklTMkjZxdtsFUIHtWZNhhw",
  authDomain: "shwe-myint-mol-fashion-shop.firebaseapp.com",
  projectId: "shwe-myint-mol-fashion-shop",
  storageBucket: "shwe-myint-mol-fashion-shop.appspot.com",
  messagingSenderId: "464832731171",
  appId: "1:464832731171:web:f5f7486fed162296963996",
  measurementId: "G-P95K63KKHF",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();

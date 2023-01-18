import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDy1ktTXh8f2AW1WiAkv51rOeXan3vDlQA",
  authDomain: "fir-99ec3.firebaseapp.com",
  projectId: "fir-99ec3",
  storageBucket: "fir-99ec3.appspot.com",
  messagingSenderId: "287470494699",
  appId: "1:287470494699:web:cf8fc79dc91235ca17efae",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

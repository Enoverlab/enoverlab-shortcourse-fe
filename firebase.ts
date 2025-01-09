// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const envs = import.meta.env
const firebaseConfig = {
  apiKey: envs.VITE_FIREBASE_API_KEY,
  authDomain: envs.VITE_FIREBASE_AUTHDOMAIN,
  projectId: "enoverlab-eec5c",
  storageBucket: "enoverlab-eec5c.firebasestorage.app",
  messagingSenderId: "294018333891",
  appId: envs.VITE_FIREBASE_APPID,
  measurementId: "G-M85DZ2D3MM"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({   
  prompt : "select_account "
});

export const auth = getAuth(app);
auth.useDeviceLanguage();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

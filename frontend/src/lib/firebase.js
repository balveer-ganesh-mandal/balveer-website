import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_Cmu3_ox2JiQOyhktU9tW7JOk9ksYc4E",
    authDomain: "balveer-ganesh-mandal-e4eca.firebaseapp.com",
    projectId: "balveer-ganesh-mandal-e4eca",
    storageBucket: "balveer-ganesh-mandal-e4eca.firebasestorage.app",
    messagingSenderId: "26234764264",
    appId: "1:26234764264:web:f39888d201144afe5d825d",
    measurementId: "G-ZBQNCVVKCX"
};

// Initialize Firebase only if it hasn't been initialized yet (important for Next.js SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

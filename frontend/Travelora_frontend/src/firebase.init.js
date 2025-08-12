// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId,
// };
const firebaseConfig = {
    apiKey: "AIzaSyDqwgSpLHKZXyxnXM39qCmLvBx6Who-Ces",
    authDomain: "imtiaz-tourism-ltd.firebaseapp.com",
    projectId: "imtiaz-tourism-ltd",
    storageBucket: "imtiaz-tourism-ltd.firebasestorage.app",
    messagingSenderId: "1084650346978",
    appId: "1:1084650346978:web:075f773af36a21515ac1bb"
};






// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

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
    apiKey: "AIzaSyD5xx2jsou4az-Sli7oajqhzpb_ftNg0sk",
    authDomain: "travelora-535f0.firebaseapp.com",
    projectId: "travelora-535f0",
    storageBucket: "travelora-535f0.firebasestorage.app",
    messagingSenderId: "831670336495",
    appId: "1:831670336495:web:f108fddb74a41674d4941a"
};






// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

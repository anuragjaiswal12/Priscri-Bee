// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMCz2HwO8qcFzli8IyAHXOdfljUVX_ARE",
    authDomain: "prescribee.firebaseapp.com",
    projectId: "prescribee",
    storageBucket: "prescribee.appspot.com",
    messagingSenderId: "756743022762",
    appId: "1:756743022762:web:6946f4b1075700320888d3",
    measurementId: "G-DYKKCL6P8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
export { app, analytics, auth };
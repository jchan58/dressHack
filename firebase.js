// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth';
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbwfnwFO65E6s5kQcPhhvTlhXALxJib14",
    authDomain: "fir-authdresshacks.firebaseapp.com",
    projectId: "fir-authdresshacks",
    storageBucket: "fir-authdresshacks.appspot.com",
    messagingSenderId: "407434971428",
    appId: "1:407434971428:web:550290c587ae8432bd8bb1",
    measurementId: "G-KSSMXNBZSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export {auth, db}
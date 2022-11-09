import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaYd6xlXyzr_wV2me2ypo26s9KHZmP2r8",
  authDomain: "inventory-74861.firebaseapp.com",
  projectId: "inventory-74861",
  storageBucket: "inventory-74861.appspot.com",
  messagingSenderId: "891977384596",
  appId: "1:891977384596:web:cc8d30fcef5e7fa8206a81",
  measurementId: "G-Y39EQKQW75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
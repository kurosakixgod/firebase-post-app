// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA0renDpEZoyIU8xk0iclBmUGaSOZ_C9bA",
	authDomain: "post-app-753c7.firebaseapp.com",
	projectId: "post-app-753c7",
	storageBucket: "post-app-753c7.appspot.com",
	messagingSenderId: "673984502703",
	appId: "1:673984502703:web:220d44088e7289fd392d5a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

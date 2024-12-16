import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAygIOCdoTfBl-rTKE3ctKpd11PDvnpOIQ",
  authDomain: "travel-app-731ae.firebaseapp.com",
  projectId: "travel-app-731ae",
  storageBucket: "travel-app-731ae.appspot.com",
  messagingSenderId: "30832829227",
  appId: "1:30832829227:web:5e110064795ed3f1169b6e",
  measurementId: "G-YFN9DDR5EE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, auth, db, storage };

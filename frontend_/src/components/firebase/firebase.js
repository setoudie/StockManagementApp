// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// Vous pouvez aussi importer d'autres services Firebase (Auth, Firestore, etc.)
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf-JedCMJ_TpF-iIUhrWyysufz9dQZwx8",
  authDomain: "stockmanagementpro-5ed52.firebaseapp.com",
  projectId: "stockmanagementpro-5ed52",
  storageBucket: "stockmanagementpro-5ed52.firebasestorage.app",
  messagingSenderId: "1002728558136",
  appId: "1:1002728558136:web:3200e2e04ba7ea6715e0cd",
  measurementId: "G-LCKLN4TK8G"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firebase Storage
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Initialisation d'autres services (exemple pour Auth)
// const auth = getAuth(app);
// const db = getFirestore(app);

// Exporter les instances pour les utiliser dans d'autres fichiers
export { app, storage };
// export { app, storage, auth, db };

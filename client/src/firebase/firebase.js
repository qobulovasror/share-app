// const config = initializeApp({
//   apiKey: "AIzaSyDxAkHS6S_d47k8P9uCexw_dg3uWR1EXZ0",
//   authDomain: "shareapp-b4326.firebaseapp.com",
//   projectId: "shareapp-b4326",
//   storageBucket: "shareapp-b4326.appspot.com",
//   messagingSenderId: "695091899683",
//   appId: "1:695091899683:web:39fb60f63347b270b77096",
//   measurementId: "G-VX0J5CCZWE"
// });

 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 import { getAuth } from "firebase/auth";
 
 export const firebaseConfig = {
    apiKey: "AIzaSyDxAkHS6S_d47k8P9uCexw_dg3uWR1EXZ0",
    authDomain: "shareapp-b4326.firebaseapp.com",
    projectId: "shareapp-b4326",
    storageBucket: "shareapp-b4326.appspot.com",
    messagingSenderId: "695091899683",
    appId: "1:695091899683:web:39fb60f63347b270b77096",
    measurementId: "G-VX0J5CCZWE"
  };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
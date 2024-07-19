
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5a25R_HXOx_3q3tz_FNRGqNAR2-mbaNg",
  authDomain: "faceapp-4feac.firebaseapp.com",
  projectId: "faceapp-4feac",
  storageBucket: "faceapp-4feac.appspot.com",
  messagingSenderId: "90417094029",
  appId: "1:90417094029:web:3fcdcd7ecc117cd3dd31c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);
const db=getFirestore(app)
 
export {auth,db}


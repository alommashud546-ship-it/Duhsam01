import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMeIK4RPrJxNBXsMoxDmEckpwM3JQkn0U",
  authDomain: "duhsam.firebaseapp.com",
  projectId: "duhsam",
  storageBucket: "duhsam.firebasestorage.app",
  messagingSenderId: "44011945600",
  appId: "1:44011945600:web:193d27c735d0920d33b065"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
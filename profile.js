import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.getElementById("email");
const logout = document.getElementById("logout");

onAuthStateChanged(auth, (user) => {
  if (user) {
    email.innerHTML = user.email;
  } else {
    window.location.href = "login.html";
  }
});

logout.onclick = async () => {
  await signOut(auth);
  alert("Logged Out");
  window.location.href = "login.html";
};
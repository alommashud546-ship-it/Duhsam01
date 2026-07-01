import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const balance = document.getElementById("balance");

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);

  onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      balance.innerText = "₹" + (docSnap.data().balance || 0);
    } else {
      balance.innerText = "₹0";
    }
  });

});
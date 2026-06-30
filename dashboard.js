import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const balance = document.getElementById("balance");

onAuthStateChanged(auth, async (user) => {

  if (user) {

    const ref = doc(db, "users", user.uid);

    const snap = await getDoc(ref);

    if (snap.exists()) {
      balance.innerHTML = "₹" + snap.data().balance;
    }

  } else {

    window.location.href = "login.html";

  }

});
import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const withdrawBtn = document.getElementById("withdraw");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  currentUser = user;
});

withdrawBtn.addEventListener("click", async () => {

  const amount = Number(document.getElementById("amount").value);
  const upi = document.getElementById("upi").value;

  if (amount <= 0 || upi === "") {
    alert("Please fill all fields");
    return;
  }

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);

  const balance = userSnap.data().balance || 0;

  if (amount > balance) {
    alert("Insufficient Balance");
    return;
  }

  await addDoc(collection(db, "withdraws"), {
    uid: currentUser.uid,
    email: currentUser.email,
    amount: amount,
    upi: upi,
    status: "Pending"
  });

  alert("Withdraw Request Submitted");

  window.location.href = "dashboard.html";

});
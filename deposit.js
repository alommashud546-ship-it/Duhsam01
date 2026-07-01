import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const utr = document.getElementById("utr");
const amount = document.getElementById("amount");
const submit = document.getElementById("submit");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  currentUser = user;
});

submit.onclick = async () => {
  if (utr.value.length !== 12) {
    alert("UTR must be exactly 12 digits.");
    return;
  }

  if (!amount.value) {
    alert("Enter amount.");
    return;
  }

  await addDoc(collection(db, "deposits"), {
    uid: currentUser.uid,
    email: currentUser.email,
    utr: utr.value,
    amount: Number(amount.value),
    status: "Pending",
    createdAt: new Date()
  });

  alert("Deposit request submitted successfully!");
  utr.value = "";
  amount.value = "";
};
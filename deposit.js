import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  currentUser = user;
});

document.getElementById("submit").addEventListener("click", async () => {

  const utr = document.getElementById("utr").value;
  const amount = document.getElementById("amount").value;

  if (utr.length !== 12) {
    alert("Enter a valid 12-digit UTR");
    return;
  }

  if (!amount) {
    alert("Enter Amount");
    return;
  }

  try {

    await addDoc(collection(db, "deposits"), {
      uid: currentUser.uid,
      email: currentUser.email,
      utr: utr,
      amount: Number(amount),
      status: "Pending",
      createdAt: new Date()
    });

    alert("Deposit Request Submitted!");

    document.getElementById("utr").value = "";
    document.getElementById("amount").value = "";

  } catch (e) {

    alert(e.message);

  }

});
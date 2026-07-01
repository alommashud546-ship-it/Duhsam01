import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const requests = document.getElementById("requests");

async function loadDeposits() {

  requests.innerHTML = "";

  const snapshot = await getDocs(collection(db, "deposits"));

  snapshot.forEach((d) => {

    const data = d.data();

    const card = document.createElement("div");

    card.className = "box";

    card.innerHTML = `
      <h3>${data.email}</h3>

      <p>Amount : ₹${data.amount}</p>

      <p>UTR : ${data.utr}</p>

      <p>Status : ${data.status}</p>
    `;

    const approveBtn = document.createElement("button");
    approveBtn.textContent = "Approve";

    const rejectBtn = document.createElement("button");
    rejectBtn.textContent = "Reject";
  approveBtn.onclick = async () => {

  if (data.status === "Approved") {
    alert("Already Approved");
    return;
  }

  const userRef = doc(db, "users", data.uid);

  

  if (!userSnap.exists()) {
    alert("User not found");
    return;
  }


      const balance = Number(userSnap.data().balance || 0);

      await updateDoc(userRef, {
        balance: balance + Number(data.amount)
      });

      await updateDoc(doc(db, "deposits", d.id), {
        status: "Approved"
      });

      alert("Approved Successfully");

      loadDeposits();

    };

    rejectBtn.onclick = async () => {

      await updateDoc(doc(db, "deposits", d.id), {
        status: "Rejected"
      });

      alert("Rejected");

      loadDeposits();

    };

    card.appendChild(approveBtn);
    card.appendChild(rejectBtn);

    requests.appendChild(card);
  });

}

loadDeposits();
import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const requests = document.getElementById("requests");

async function loadDeposits() {

  requests.innerHTML = "";

  const snapshot = await getDocs(collection(db, "deposits"));

  snapshot.forEach((d) => {

    const data = d.data();

    requests.innerHTML += `
      <div class="box">
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Amount:</b> ₹${data.amount}</p>
        <p><b>UTR:</b> ${data.utr}</p>
        <p><b>Status:</b> ${data.status}</p>

        <button onclick="approve('${d.id}')">Approve</button>
        <button onclick="reject('${d.id}')">Reject</button>
      </div>
    `;

  });

}

window.approve = async function(id) {

  await updateDoc(doc(db, "deposits", id), {
    status: "Approved"
  });

  alert("Approved");
  loadDeposits();

};

window.reject = async function(id) {

  await updateDoc(doc(db, "deposits", id), {
    status: "Rejected"
  });

  alert("Rejected");
  loadDeposits();

};

loadDeposits();
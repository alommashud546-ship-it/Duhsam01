import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const requests = document.getElementById("requests");

async function loadDeposits() {

  const snapshot = await getDocs(collection(db, "deposits"));

  requests.innerHTML = "";

  snapshot.forEach((doc) => {

    const data = doc.data();

    requests.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px;">
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Amount:</b> ₹${data.amount}</p>
        <p><b>UTR:</b> ${data.utr}</p>
        <p><b>Status:</b> ${data.status}</p>
      </div>
    `;

  });

}

loadDeposits();
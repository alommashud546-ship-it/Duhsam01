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

    const card = document.createElement("div");
    card.className = "box";

    card.innerHTML = `
      <p><b>Email:</b> ${data.email || ""}</p>
      <p><b>Amount:</b> ₹${data.amount || 0}</p>
      <p><b>UTR:</b> ${data.utr || ""}</p>
      <p><b>Status:</b> ${data.status || "Pending"}</p>
    `;

    const approveBtn = document.createElement("button");
    approveBtn.textContent = "Approve";

    approveBtn.onclick = async () => {
      await updateDoc(doc(db, "deposits", d.id), {
        status: "Approved"
      });
      alert("Approved");
      loadDeposits();
    };

    const rejectBtn = document.createElement("button");
    rejectBtn.textContent = "Reject";

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
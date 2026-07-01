import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const signupBtn = document.getElementById("signup");

signupBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please fill all fields.");
    return;
  }

  try {

    await createUserWithEmailAndPassword(auth, email, password);

    alert("Account Created Successfully!");

    window.location.href = "login.html";

  } catch (e) {

    alert(e.message);

  }

});
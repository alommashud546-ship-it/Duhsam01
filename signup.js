import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const signup = document.getElementById("signup");

signup.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    alert("Account Created Successfully!");
    window.location.href = "login.html";

  } catch (e) {
    alert(e.message);
  }
});
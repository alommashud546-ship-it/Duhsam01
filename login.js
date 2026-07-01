import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");

login.addEventListener("click", async () => {
  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    alert("Login Successful!");

    window.location.href = "dashboard.html";

  } catch (e) {
    alert(e.message);
  }
});
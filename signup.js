import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.querySelector('input[type="email"]');
const password = document.querySelectorAll('input[type="password"]')[0];
const button = document.querySelector("button");

button.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    alert("Account Created Successfully!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
});
// src/services/authService.js
import { apiFetch, setSession } from "./api.js";

export function loginUser() {
  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("loginError");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (errorDiv) errorDiv.classList.add("hidden");

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // data = { mensaje, token, user }
      setSession(data.token, data.user);

      window.location.hash = data.user.role === "admin" ? "#/dashboard" : "#/";
    } catch (error) {
      if (errorDiv) {
        errorDiv.textContent = `⚠️ ${error.message || "Credenciales incorrectas."}`;
        errorDiv.classList.remove("hidden");
      } else {
        alert(`⚠️ ${error.message || "Credenciales incorrectas."}`);
      }
    }
  });
}

export function registerUser() {
  const form = document.getElementById("registerForm");
  const errorDiv = document.getElementById("registerError");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (errorDiv) errorDiv.classList.add("hidden");

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    // --- Client-side validations (kept from the original implementation) ---
    if (!name || !email || !password || !confirmPassword) {
      return showError(errorDiv, "⚠️ Todos los campos son obligatorios.");
    }
    if (password !== confirmPassword) {
      return showError(errorDiv, "⚠️ Las contraseñas ingresadas no coinciden.");
    }
    if (password.length < 8) {
      return showError(
        errorDiv,
        "⚠️ La contraseña debe contener mínimo 8 caracteres.",
      );
    }

    try {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      // data = { mensaje, token, user }
      setSession(data.token, data.user);
      window.location.hash = "#/dashboard";
    } catch (error) {
      showError(
        errorDiv,
        `⚠️ ${error.message || "No se pudo completar el registro."}`,
      );
    }
  });
}

function showError(errorDiv, message) {
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
  } else {
    alert(message);
  }
}

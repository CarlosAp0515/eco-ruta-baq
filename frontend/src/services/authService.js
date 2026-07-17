import { apiFetch, setSession } from "./api.js";

export function registerUser() {
    const form = document.getElementById("registerForm");

    if (!form) {
        console.error("No se encontró el formulario de registro");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const location = document.getElementById("location").value;

        // --- VALIDACIONES ---
        if (!name || !email || !password || !confirmPassword || !location) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (password.length < 8) {
            alert("La contraseña debe tener mínimo 8 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const data = await apiFetch("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password, location })
            });

            setSession(data.token, data.user);
            alert(`🌱 ¡Registro exitoso! Bienvenido a EcoRuta BAQ, ${data.user.name}.`);
            window.location.hash = "#/dashboard";
        } catch (error) {
            alert(`❌ ${error.message}`);
        }
    });
}

export function loginUser() {
    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        try {
            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            setSession(data.token, data.user);
            alert(`🌱 ¡Bienvenido a EcoRuta BAQ, ${data.user.name}!`);
            window.location.hash = "#/dashboard";
        } catch (error) {
            alert(`❌ ${error.message}`);
        }
    });
}

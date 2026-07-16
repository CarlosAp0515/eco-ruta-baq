import { loginPage } from "../pages/login";

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

        const newUser = {
            name,
            email,
            password,
            location
        };

        console.log("Intentando conectar con el Backend...", newUser);

        // --- INTEGRACIÓN / SIMULACIÓN ---
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Registro exitoso en la API del Backend!");
                window.location.hash = "#/login";
            } else {
                alert(`Error en el registro: ${data.message || "Inténtalo de nuevo."}`);
            }

        } catch (error) {
            console.warn("⚠️ Servidor Backend no detectado. Activando base de datos local temporal (localStorage)...");
            
            // 1. Obtener usuarios ya registrados localmente o crear un array vacío
            const localUsers = JSON.parse(localStorage.getItem("eco_users")) || [];

            // 2. Verificar si el correo ya existe localmente
            const userExists = localUsers.some(u => u.email === newUser.email);
            if (userExists) {
                alert("❌ Este correo ya está registrado en la base de datos local.");
                return;
            }

            // 3. Guardar el nuevo usuario
            localUsers.push(newUser);
            localStorage.setItem("eco_users", JSON.stringify(localUsers));

            alert("🎉 ¡Registro exitoso (Simulado)! Usuario guardado en el navegador.");
            window.location.hash = "#/login"; // Te manda al login de una
        }
    });
}

// Servicio de loginPage



export function loginUser() {
    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        // Buscar en la base de datos local (localStorage)
        const localUsers = JSON.parse(localStorage.getItem("eco_users")) || [];
        const userFound = localUsers.find(u => u.email === email && u.password === password);

        if (userFound) {
            // Guardar sesión activa temporal para saber quién está logueado
            localStorage.setItem("current_user", JSON.stringify(userFound));
            
            alert(`🌱 ¡Bienvenido a EcoRuta BAQ, ${userFound.name}!`);
            window.location.hash = "#/dashboard";
        } else {
            // Mensaje de fallback si no encuentra el usuario local
            alert("❌ Credenciales incorrectas o usuario no registrado.");
        }
    });
}
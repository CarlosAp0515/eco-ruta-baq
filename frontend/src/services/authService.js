

export function loginUser() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users_db")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("current_user", JSON.stringify(user));
            window.location.hash = '#/';
        } else {
            alert("⚠️ Credenciales incorrectas o usuario no registrado.");
        }
    });
}

export function registerUser() {
    const form = document.getElementById("registerForm");
    const errorDiv = document.getElementById("registerError");

    if (!form) return;

    // --- PROCESAMIENTO DEL REGISTRO ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (errorDiv) errorDiv.classList.add("hidden");

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("regConfirmPassword").value;

        // Validaciones del lado del cliente
        if (!name || !email || !password || !confirmPassword) {
            if (errorDiv) {
                errorDiv.textContent = "⚠️ Todos los campos son obligatorios.";
                errorDiv.classList.remove("hidden");
            }
            return;
        }

        if (password !== confirmPassword) {
            if (errorDiv) {
                errorDiv.textContent = "⚠️ Las contraseñas ingresadas no coinciden.";
                errorDiv.classList.remove("hidden");
            }
            return;
        }

        if (password.length < 8) {
            if (errorDiv) {
                errorDiv.textContent = "⚠️ La contraseña de seguridad debe contener mínimo 8 caracteres.";
                errorDiv.classList.remove("hidden");
            }
            return;
        }

        const users = JSON.parse(localStorage.getItem("users_db")) || [];
        const userExists = users.find(u => u.email === email);

        if (userExists) {
            if (errorDiv) {
                errorDiv.textContent = "⚠️ Este correo ya se encuentra registrado.";
                errorDiv.classList.remove("hidden");
            }
            return;
        }

        // Crear usuario con ROL "user" POR DEFECTO
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role: "user" // Todos los nuevos usuarios se registran como recicladores
        };

        users.push(newUser);
        localStorage.setItem("users_db", JSON.stringify(users));
        localStorage.setItem("current_user", JSON.stringify(newUser));

        window.location.hash = '#/dashboard';
    });
}
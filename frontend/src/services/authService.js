// src/services/authService.js

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
    
    // Elementos de la interfaz
    const cardUser = document.getElementById("roleCardUser");
    const cardAdmin = document.getElementById("roleCardAdmin");
    const roleInput = document.getElementById("regRole");
    const submitBtn = document.getElementById("registerSubmitBtn");

    if (!form) return;

    // --- MANEJO DINÁMICO DE TARJETAS Y CAMBIO DE COLOR DEL BOTÓN ---
    if (cardUser && cardAdmin && roleInput && submitBtn) {
        
        // Clic en Reciclador (Verde)
        cardUser.addEventListener("click", () => {
            roleInput.value = "user";
            
            // 1. Estilos de la Tarjeta Reciclador (Activa en verde)
            cardUser.className = "cursor-pointer border-2 border-green-600 bg-green-50/50 rounded-2xl p-4 text-center transition-all duration-200 shadow-md flex flex-col items-center justify-center gap-2 ring-2 ring-green-600/20";
            
            // Desactivar Tarjeta Admin
            cardAdmin.className = "cursor-pointer border-2 border-slate-200 bg-white rounded-2xl p-4 text-center transition-all duration-200 hover:border-blue-500 shadow-sm flex flex-col items-center justify-center gap-2 opacity-60";
            
            // 2. Habilitar y pintar botón en VERDE
            submitBtn.disabled = false;
            submitBtn.textContent = "Registrarse como Reciclador 🌱";
            submitBtn.className = "w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 cursor-pointer";
        });

        // Clic en Administrador (Azul)
        cardAdmin.addEventListener("click", () => {
            roleInput.value = "admin";
            
            // 1. Estilos de la Tarjeta Administrador (Activa en azul)
            cardAdmin.className = "cursor-pointer border-2 border-blue-600 bg-blue-50/50 rounded-2xl p-4 text-center transition-all duration-200 shadow-md flex flex-col items-center justify-center gap-2 ring-2 ring-blue-600/20";
            
            // Desactivar Tarjeta Reciclador
            cardUser.className = "cursor-pointer border-2 border-slate-200 bg-white rounded-2xl p-4 text-center transition-all duration-200 hover:border-green-500 shadow-sm flex flex-col items-center justify-center gap-2 opacity-60";
            
            // 2. Habilitar y pintar botón en AZUL
            submitBtn.disabled = false;
            submitBtn.textContent = "Registrarse como Administrador 💼";
            submitBtn.className = "w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer";
        });
    }

    // --- PROCESAMIENTO DEL REGISTRO ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (errorDiv) errorDiv.classList.add("hidden");

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("regConfirmPassword").value;
        const role = roleInput ? roleInput.value : "";

        // Validaciones del lado del cliente
        if (!name || !email || !password || !confirmPassword || !role) {
            if (errorDiv) {
                errorDiv.textContent = "⚠️ Todos los campos son obligatorios. Selecciona un Rol haciendo clic en una de las tarjetas.";
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

        // Crear usuario
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role
        };

        users.push(newUser);
        localStorage.setItem("users_db", JSON.stringify(users));
        localStorage.setItem("current_user", JSON.stringify(newUser));

        window.location.hash = '#/dashboard';
    });
}
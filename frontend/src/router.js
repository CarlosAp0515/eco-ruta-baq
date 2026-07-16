// src/router.js

// 1. Importación de las Vistas (HTML dinámico)
import { landingPage } from './pages/landing.js';
import { pointsDashboardPage } from './pages/points-dashboard.js';
// (Asumiendo que tienes estas vistas creadas en tu carpeta de páginas)
import { loginPage } from './pages/login.js'; 
import { registerPage } from './pages/register-page.js';

// 2. Importación de los Servicios y Lógicas (JS interactivo)
import { initLandingPage } from './services/landingService.js';
import { initPointsDashboard } from './services/pointsService.js';
import { loginUser, registerUser } from './services/authService.js';

// Definición de las rutas de la aplicación
const routes = {
    '#/': {
        view: landingPage,
        init: initLandingPage,
        requiresAuth: false
    },
    '#/login': {
        view: loginPage,
        init: loginUser,
        requiresAuth: false,
        guestOnly: true // Solo para usuarios NO logueados
    },
    '#/register': {
        view: registerPage,
        init: registerUser,
        requiresAuth: false,
        guestOnly: true // Solo para usuarios NO logueados
    },
    '#/dashboard': {
        view: pointsDashboardPage,
        init: initPointsDashboard,
        requiresAuth: true // Protegida: requiere inicio de sesión
    }
};

export function router() {
    const appContainer = document.getElementById('app'); 
    if (!appContainer) {
        console.error("No se encontró el contenedor principal con id 'app'.");
        return;
    }

    // Obtener la ruta actual del hash, por defecto es la raíz '#/'
    let hash = window.location.hash || '#/';

    // Normalizar ruta en caso de que quede vacía
    if (hash === '') hash = '#/';

    // Verificar si el usuario tiene sesión activa en localStorage
    const isAuthenticated = localStorage.getItem("current_user") !== null;

    // Buscar si la ruta existe en nuestro objeto de rutas
    let route = routes[hash];

    // Redirección por defecto si la ruta no existe (404 fallback a la Landing)
    if (!route) {
        window.location.hash = '#/';
        return;
    }

    // --- PROTECCIÓN DE RUTAS (ROUTE GUARDS) ---
    
    // Caso A: Intenta entrar a ruta protegida (Dashboard) sin estar logueado
    if (route.requiresAuth && !isAuthenticated) {
        console.warn("Acceso denegado: Se requiere inicio de sesión.");
        window.location.hash = '#/login';
        return;
    }

    // Caso B: Está logueado e intenta acceder a Login o Registro (evitar doble login)
    if (route.guestOnly && isAuthenticated) {
        window.location.hash = '#/dashboard';
        return;
    }

    // --- RENDERIZADO DE LA VISTA ---
    appContainer.innerHTML = route.view();

    // --- INICIALIZACIÓN DE LÓGICAS (MAPAS, EVENTOS, BOTONES) ---
    // Se ejecuta en un pequeño delay para asegurar que el DOM se haya pintado completamente
    setTimeout(() => {
        if (typeof route.init === 'function') {
            route.init();
        }
    }, 50);
}

// Escuchar cambios en el Hash y carga inicial del documento
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
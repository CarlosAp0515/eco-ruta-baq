import { landingPage } from './pages/landing.js';
import { loginPage } from './pages/login.js'; 
import { registerPage } from './pages/register-page.js';
import { pointsDashboardPage } from './pages/points-dashboard.js';

import { initLandingPage } from './services/landingService.js';
import { initPointsDashboard } from './services/pointsService.js';
import { loginUser, registerUser } from './services/authService.js';

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
        guestOnly: true
    },
    '#/register': {
        view: registerPage,
        init: registerUser,
        requiresAuth: false,
        guestOnly: true
    },
    '#/dashboard': {
        view: pointsDashboardPage,
        init: initPointsDashboard,
        requiresAuth: true
    }
};

export function router() {
    const appContainer = document.getElementById('app'); 
    if (!appContainer) {
        console.error("No se encontró el contenedor principal con id 'app'.");
        return;
    }

    let hash = window.location.hash || '#/';
    if (hash === '') hash = '#/';

    // --- LEER SEGURAMENTE EL USUARIO ---
    let isAuthenticated = false;
    try {
        const user = localStorage.getItem("current_user");
        isAuthenticated = user !== null && user !== "undefined" && JSON.parse(user) !== null;
    } catch (e) {
        console.error("Error al verificar estado de sesión. Limpiando almacenamiento...", e);
        localStorage.removeItem("current_user");
        isAuthenticated = false;
    }

    let route = routes[hash];

    if (!route) {
        window.location.hash = '#/';
        return;
    }

    // --- CONTROL DE ACCESO (ROUTE GUARDS) ---
    // Si ya inició sesión e intenta ir a Login/Registro, mandarlo directo al Dashboard
    if (route.guestOnly && isAuthenticated) {
        window.location.hash = '#/dashboard';
        return;
    }

    // Si la ruta requiere autorización y NO está autenticado, mandarlo inmediatamente al Login
    if (route.requiresAuth && !isAuthenticated) {
        window.location.hash = '#/login';
        return;
    }

    // Renderizar la vista correspondiente
    appContainer.innerHTML = route.view();

    // Pequeño retraso para que el navegador cree el DOM y evitar problemas con Leaflet y eventos de inputs
    setTimeout(() => {
        if (typeof route.init === 'function') {
            route.init();
        }
    }, 50);
}

// Escuchar cambios de hash y carga inicial
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    // Si no hay hash actual al cargar el navegador, forzar el landing page '#/'
    if (!window.location.hash) {
        window.location.hash = '#/';
    }
    router();
});
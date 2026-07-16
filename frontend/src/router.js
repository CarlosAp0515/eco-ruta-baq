import { landingPage } from './pages/landing.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register-page.js';
import { pointsDashboardPage } from './pages/points-dashboard.js';

import { registerUser, loginUser } from './services/authService.js'; 
import { initPointsDashboard } from './services/pointsService.js';

const routes = {
    '#/': landingPage,
    '#/login': loginPage,
    '#/register': registerPage,
    '#/dashboard': pointsDashboardPage
};

export function router() {
    const app = document.querySelector("#app");
    const hash = window.location.hash || '#/';
    
    const pageHTML = routes[hash] ? routes[hash]() : landingPage();
    app.innerHTML = pageHTML;

    // Inicializar listeners según la página activa
    if (hash === '#/register') {
        registerUser();
    }
    if (hash === '#/login') {
        loginUser(); // Inicializar el login
    }
    if (hash === '#/dashboard') {
        initPointsDashboard();
    }
}

window.addEventListener('hashchange', router);
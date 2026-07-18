import './style.css';
import { landingPage } from './pages/landing.js';
import { loginPage } from './pages/login.js'; 
import { registerPage } from './pages/register-page.js'; 
import { dashboardPage, initDashboard } from './pages/dashboard.js'; 
import { loginUser, registerUser } from './services/authService.js'; 

function router() {
  const appElement = document.getElementById('app');
  if (!appElement) return;

  const hash = window.location.hash || '#/';
  
  try {
    if (hash === '#/' || hash === '') {
      appElement.innerHTML = typeof landingPage === 'function' ? landingPage() : '';
      
      const currentUser = JSON.parse(localStorage.getItem("current_user"));
      if (currentUser) {
        const navContainer = document.querySelector('nav .max-w-7xl > div:last-child');
        if (navContainer) {
          navContainer.innerHTML = `
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium text-slate-700">
                Hola, <b class="text-green-700">${currentUser.name}</b> ${currentUser.role === 'admin' ? ' (💼 Admin)' : ''}
              </span>
              <a href="#/dashboard" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
                Mi Dashboard
              </a>
              <button id="logoutBtn" class="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold border border-red-200 transition-all cursor-pointer">
                Cerrar Sesión
              </button>
            </div>
          `;
          
          document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('current_user');
            window.location.hash = '#/login';
          });
        }
      }

      setTimeout(() => {
        if (document.getElementById('landingMap')) {
          initLandingMap();
        }
      }, 50);

    } else if (hash === '#/login') {
      appElement.innerHTML = typeof loginPage === 'function' ? loginPage() : '';
      loginUser(); 
    } else if (hash === '#/register') {
      appElement.innerHTML = registerPage();
      registerUser(); 
    } else if (hash === '#/dashboard') {
      const currentUser = JSON.parse(localStorage.getItem("current_user"));
      if (!currentUser) {
        window.location.hash = '#/login';
        return;
      }

      // Renderiza la vista horizontal completa del dashboard con mapa y guía de reciclaje
      appElement.innerHTML = typeof dashboardPage === 'function' ? dashboardPage() : '';
      
      // Inicia el CRUD, mapa interno de Barranquilla y acordeones
      initDashboard();

      // Botón cerrar sesión del panel superior
      const sidebarLogoutBtn = document.getElementById('logoutBtn');
      if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', () => {
          localStorage.removeItem('current_user');
          window.location.hash = '#/login';
        });
      }

    } else {
      appElement.innerHTML = landingPage();
    }
  } catch (error) {
    console.error("Error en la ejecución de la ruta:", error);
    appElement.innerHTML = `<div class="p-6 text-red-600 font-bold">Error en renderizado: ${error.message}</div>`;
  }
}

function initLandingMap() {
  if (typeof L === 'undefined') return;
  
  const container = L.DomUtil.get('landingMap');
  if (container != null) {
    container._leaflet_id = null;
  }

  const map = L.map('landingMap').setView([10.9685, -74.7813], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const puntos = JSON.parse(localStorage.getItem('eco_puntos')) || [];
  puntos.forEach(punto => {
    L.marker([punto.lat, punto.lng])
      .addTo(map)
      .bindPopup(`<b>${punto.nombre}</b><br>Material: ${punto.tipo}`);
  });
}

function initData() {
  if (!localStorage.getItem('eco_puntos')) {
    const puntosBarranquilla = [
      { id: 1, nombre: "EcoPunto Parque Venezuela", lat: 11.0094, lng: -74.8123, tipo: "Plásticos y Vidrio" },
      { id: 2, nombre: "Punto Verde CC Buenavista", lat: 11.0125, lng: -74.8168, tipo: "Pilas y Electrónicos RAEE" },
      { id: 3, nombre: "Centro de Acopio Prado", lat: 10.9934, lng: -74.7962, tipo: "Aceite de cocina y Cartón" }
    ];
    localStorage.setItem('eco_puntos', JSON.stringify(puntosBarranquilla));
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
  initData();
  router();
});
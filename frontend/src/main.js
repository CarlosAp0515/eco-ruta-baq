// src/main.js

import './style.css';
import { landingPage } from './pages/landing.js';
import { loginPage } from './pages/login.js'; 
import { registerPage } from './pages/register-page.js'; 
import { loginUser, registerUser } from './services/authService.js'; 

function router() {
  const appElement = document.getElementById('app');
  if (!appElement) return;

  const hash = window.location.hash || '#/';
  
  try {
    if (hash === '#/' || hash === '') {
      appElement.innerHTML = typeof landingPage === 'function' ? landingPage() : '';
      if (document.getElementById('landingMap')) {
        initLandingMap();
      }
    } else if (hash === '#/login') {
      appElement.innerHTML = typeof loginPage === 'function' ? loginPage() : '';
      loginUser(); 
    } else if (hash === '#/register') {
      // Inyección directa y segura de tu string de HTML limpio
      appElement.innerHTML = registerPage();
      
      // Listeners para y el submit
      registerUser(); 
    } else if (hash === '#/dashboard') {
      appElement.innerHTML = `
        <div class="min-h-screen bg-slate-50 p-6">
          <h1 class="text-2xl font-bold text-slate-900">Dashboard EcoRuta BAQ</h1>
          <p class="text-slate-600">Panel de control y estadísticas del usuario.</p>
          <div class="mt-4"><a href="#/" class="text-green-700 font-bold">← Volver a la Landing</a></div>
        </div>
      `;
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
      { id: 2, nombre: "Punto Verde CC Buenavista", lat: 11.0125, lng: -74.8168, tipo: "Pilas y Electrónicos RAEE" }
    ];
    localStorage.setItem('eco_puntos', JSON.stringify(puntosBarranquilla));
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
  initData();
  router();
});


import { API_BASE_URL } from "./api.js";

const FALLBACK_LOCATIONS = [
    { localidad: "Riomar", name: "Centro de Acopio Buenavista", coords: [11.0142, -74.8115], desc: "Recibe: Plásticos (PET/PEAD), Vidrio y Cartón." },
    { localidad: "Norte-Centro Histórico", name: "Punto Verde Parque Venezuela", coords: [11.0068, -74.8150], desc: "Recibe: Pilas, Baterías, Aceite de Cocina y RAEE." },
    { localidad: "Suroeste", name: "EcoPunto Parque Sagrado Corazón", coords: [10.9855, -74.7888], desc: "Recibe: Cartón, Papel de archivo y Plásticos." },
    { localidad: "Suroriente", name: "Estación de Reciclaje Simón Bolívar", coords: [10.9520, -74.7750], desc: "Recibe: Envases metálicos, Aluminio y Vidrio." },
    { localidad: "Metropolitana", name: "EcoPunto Metropolitano", coords: [10.9380, -74.8020], desc: "Recibe: Todo tipo de materiales aprovechables." }
];

async function fetchLocations() {
    try {
        const res = await fetch(`${API_BASE_URL}/spots`);
        if (!res.ok) throw new Error("API no disponible");
        const { spots } = await res.json();
        return spots.map(s => ({
            localidad: s.locality,
            name: s.name,
            coords: [s.lat, s.lng],
            desc: s.description
        }));
    } catch (error) {
        console.warn("No se pudo cargar /api/spots, usando datos de respaldo:", error.message);
        return FALLBACK_LOCATIONS;
    }
}

export function initLandingPage() {
    // ---- VERIFICACIÓN DE SESIÓN EN LA LANDING ----
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    const navActions = document.querySelector("nav .flex.items-center.gap-4");

    if (currentUser && navActions) {
        // Si ya está logueado, cambiamos "Iniciar Sesión" por "Ir a mi Panel"
        navActions.innerHTML = `
          <span class="text-sm text-slate-600 font-bold hidden sm:inline">Hola, ${currentUser.name}</span>
          <a href="#/dashboard" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all">
            Ir a mi Panel 📊
          </a>
        `;
    }

    // ---- LÓGICA DEL MAPA ----
    const landingMapContainer = document.getElementById("landingMap");
    if (!landingMapContainer) return;

    import("https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js")
        .then(async (L) => {
            const barranquillaCoords = [10.9878, -74.8000];
            const map = L.map('landingMap').setView(barranquillaCoords, 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            const locations = await fetchLocations();

            locations.forEach(loc => {
                L.marker(loc.coords)
                    .addTo(map)
                    .bindPopup(`
                        <div class="p-1">
                            <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full">${loc.localidad}</span>
                            <h4 class="text-sm font-bold text-slate-800 mt-1.5">${loc.name}</h4>
                            <p class="text-xs text-slate-600 mt-1">${loc.desc}</p>
                            ${currentUser 
                                ? `<a href="#/dashboard" class="inline-block text-[11px] text-green-700 font-bold mt-2 hover:underline">📋 Registrar entrega en mi panel &rarr;</a>`
                                : `<a href="#/register" class="inline-block text-[11px] text-green-700 font-bold mt-2 hover:underline">✨ Regístrate para sumar puntos aquí &rarr;</a>`
                            }
                        </div>
                    `);
            });
        })
        .catch(err => console.error("No se pudo cargar el mapa del landing:", err));
}
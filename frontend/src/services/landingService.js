// src/services/landingService.js

export function initLandingPage() {
  console.log("🌱 Inicializando mapa en la Landing Page con iconos modernos...");
  setupLandingMap();
}

function setupLandingMap() {
  const mapElement = document.getElementById("landingMap") || document.getElementById("map");
  if (!mapElement) {
    console.warn("⚠️ Contenedor de mapa no encontrado en el Landing.");
    return;
  }

  // Evitamos inicializaciones duplicadas
  if (mapElement._leaflet_id) {
    return;
  }

  // Coordenadas centrales estratégicas para Barranquilla
  const barranquillaCoords = [10.9639, -74.7964];

  if (typeof L === 'undefined') {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => buildLandingMapInstance(barranquillaCoords);
    document.head.appendChild(script);
  } else {
    buildLandingMapInstance(barranquillaCoords);
  }
}

function buildLandingMapInstance(coords) {
  try {
    const mapId = document.getElementById("landingMap") ? "landingMap" : "map";
    
    // Zoom ajustado a 12 para dar cobertura completa desde el Norte hasta el Estadio Metropolitano en el Sur
    const map = L.map(mapId).setView(coords, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Los 8 puntos unificados y sincronizados
    const points = [
      { name: "EcoPunto Parque Venezuela", coords: [11.0089, -74.8143], desc: "Acepta plásticos, papel y vidrio." },
      { name: "Punto Verde CC Buenavista", coords: [11.0135, -74.8219], desc: "Especializado en pilas, baterías y residuos RAEE." },
      { name: "Centro de Acopio Prado", coords: [10.9902, -74.7952], desc: "Acepta aceite de cocina usado y cartón." },
      { name: "Punto Ecológico Parque de la Electrificadora", coords: [11.0163, -74.8122], desc: "Residuos domésticos reciclables limpios." },
      { name: "EcoPunto Plaza de la Paz", coords: [10.9878, -74.7889], desc: "Punto central de recolección de botellas PET y tapitas." },
      { name: "EcoPunto Éxito Metropolitano (Sur)", coords: [10.9255, -74.7995], desc: "Punto de recolección de envases PET, latas de aluminio y cartón aplanado." },
      { name: "Centro Comunitario de Reciclaje - La Paz", coords: [10.9715, -74.8315], desc: "Proyecto de reciclaje de barrio. Acepta plásticos, papel de archivo y cartón." },
      { name: "EcoPunto Centro Comercial Paseo de la Castellana (Centro)", coords: [10.9805, -74.7795], desc: "Ideal para comerciantes. Recolección masiva de cartón, plástico film y papel." }
    ];

    // Pintar los 8 marcadores con popup de diseño minimalista
    points.forEach(p => {
      L.marker(p.coords)
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; min-width: 160px;">
            <b style="color: #15803d; font-size: 13px; display: block; margin-bottom: 2px;">${p.name}</b>
            <p style="margin: 0; font-size: 11px; color: #475569; line-height: 1.3;">${p.desc}</p>
          </div>
        `);
    });

  } catch (error) {
    console.error("Error al inicializar el mapa de la Landing Page:", error);
  }
}
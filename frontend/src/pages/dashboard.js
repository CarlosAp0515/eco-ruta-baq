// src/pages/dashboard.js

export function dashboardPage() {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  if (!currentUser) return `<p class="p-4 sm:p-8">Cargando...</p>`;

  return `
  <!-- ESTILOS INYECTADOS PARA ANIMACIONES Y AJUSTES DE LEAFLET -->
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-toast {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .leaflet-popup-content {
      font-family: ui-sans-serif, system-ui, sans-serif !important;
      font-size: 13px !important;
      line-height: 1.4 !important;
    }
  </style>

  <div class="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 relative">
    
    <!-- CONTENEDOR PARA NOTIFICACIONES FLOTANTES (RESPONSIVE TOASTS) -->
    <div id="notificationContainer" class="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-50 space-y-3 pointer-events-none"></div>

    <!-- NAVBAR SUPERIOR RESPONSIVE -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 sm:gap-6">
          <div class="flex items-center gap-2 shrink-0">
          <img src="./src/assets/IconoEcoruta.png" alt="EcoRuta BAQ Logo" class="w-20 h-20 object-contain shrink-0">    
            <span class="text-lg sm:text-2xl font-extrabold text-green-800 tracking-tight shrink-0">EcoRuta BAQ</span>
          </div>
          <nav class="hidden md:flex items-center gap-4">
            <a href="#/" class="text-sm font-bold text-slate-500 hover:text-green-700 transition-colors">← Volver al Inicio</a>
          </nav>
        </div>
        
        <div class="flex items-center gap-3 sm:gap-4 ml-auto text-right">
          <span class="text-xs sm:text-sm font-medium text-slate-700 truncate max-w-[120px] sm:max-w-none">
            Hola, <b class="text-slate-900">${currentUser.name}</b>
          </span>
          <button id="logoutBtn" class="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer shrink-0">
            Salir
          </button>
        </div>
      </div>
    </header>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 sm:pb-0 sm:border-none">
        <div>
          <div class="md:hidden mb-1">
            <a href="#/" class="text-xs font-bold text-green-700 underline">← Ir al Inicio</a>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Mi Balance de Reciclaje</h1>
          <p class="text-slate-500 mt-1 text-xs sm:text-sm">Gestiona tus entregas, mapea puntos en Barranquilla y redime premios.</p>
        </div>
        <button id="openModalBtn" class="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white font-bold px-5 py-3.5 rounded-xl sm:rounded-2xl inline-flex items-center justify-center gap-2 shadow-sm transition-all transform active:scale-98 cursor-pointer text-sm sm:text-base">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
          Registrar Entrega
        </button>
      </div>

      <!-- TARJETAS DE BALANCE RESPONSIVE CORREGIDAS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
          <div class="space-y-1">
            <p class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Mis Puntos Disponibles</p>
            <p id="userPointsDisplay" class="text-2xl sm:text-3xl font-black text-green-700">0 pts</p>
          </div>
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-green-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-green-600 shrink-0">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.151-.326.623-.326.774 0a1.714 1.714 0 002.046 1.022 1.714 1.714 0 012.12 1.258 1.714 1.714 0 001.353 1.353 1.714 1.714 0 011.258 2.12 1.714 1.714 0 001.022 2.046c.326.151.326.623 0 .774a1.714 1.714 0 00-1.022 2.046 1.714 1.714 0 01-1.258 2.12 1.714 1.714 0 00-1.353 1.353 1.714 1.714 0 01-2.12 1.258 1.714 1.714 0 00-2.046 1.022c-.151.326-.623.326-.774 0a1.714 1.714 0 00-2.046-1.022 1.714 1.714 0 01-2.12-1.258 1.714 1.714 0 00-1.353-1.353 1.714 1.714 0 01-1.258-2.12 1.714 1.714 0 00-1.022-2.046c-.326-.151-.326-.623 0-.774a1.714 1.714 0 001.022-2.046 1.714 1.714 0 011.258-2.12 1.714 1.714 0 001.353-1.353 1.714 1.714 0 012.12-1.258 1.714 1.714 0 002.046-1.022z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M12 10.5h.008v.008H12V10.5z"/></svg>
          </div>
        </div>

        <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
          <div class="space-y-1">
            <p class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Total de Material Entregado</p>
            <p id="userWeightDisplay" class="text-2xl sm:text-3xl font-black text-slate-900">0 Kg</p>
          </div>
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0-17.25a3.75 3.75 0 113.75 3.75M12 3a3.75 3.75 0 10-3.75 3.75M12 7.5h7.5M12 7.5H4.5m3.75 12h7.5"/></svg>
          </div>
        </div>

        <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 sm:col-span-2 lg:col-span-1">
          <div class="space-y-1">
            <p class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Meta de Recompensa</p>
            <p class="text-lg sm:text-xl font-extrabold text-orange-600">10% Descuento Alkosto</p>
          </div>
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-orange-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V6.75z"/></svg>
          </div>
        </div>
      </div>

      <!-- MAPA ECOLÓGICO RESPONSIVE -->
      <div class="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-900">Mapa de Puntos Verdes (Barranquilla)</h3>
          <p class="text-xs text-slate-400 mt-0.5">Visualiza todos los centros habilitados de recolección en la ciudad.</p>
        </div>
        <div id="dashboardMap" class="w-full h-64 sm:h-80 rounded-xl sm:rounded-2xl border border-slate-200 relative z-10 shadow-inner bg-slate-100"></div>
      </div>

      <!-- SECCIÓN DOS COLUMNAS -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        <!-- CRUD: TABLA HISTORIAL CON SCROLL -->
        <div class="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 class="text-base sm:text-lg font-bold text-slate-900">Historial de Entregas</h3>
          <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table class="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr class="text-[11px] sm:text-xs font-bold text-slate-400 border-b border-slate-100 pb-3">
                  <th class="pb-3 font-semibold">Fecha</th>
                  <th class="pb-3 font-semibold">Categoría</th>
                  <th class="pb-3 font-semibold">Cantidad</th>
                  <th class="pb-3 font-semibold">Puntos</th>
                  <th class="pb-3 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody id="historyTableBody" class="text-xs sm:text-sm divide-y divide-slate-100 text-slate-700 font-medium"></tbody>
            </table>
          </div>
        </div>

        <!-- RECOMPENSAS: LISTADO ABIERTO Y DIRECTO (SIN ACORDEÓN) -->
        <div id="rewardsContainer" class="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 class="text-base sm:text-lg font-bold text-slate-900">Canjear Recompensas</h3>
          <div class="space-y-4">
            
            <!-- Tarjeta Bono 1 -->
            <div class="p-4 rounded-xl border border-slate-200/60 bg-slate-50/40 space-y-3 flex flex-col justify-between">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h4 class="font-bold text-sm text-slate-900">Bono 10% Descuento</h4>
                  <div class="text-[11px] text-slate-500 mt-1 space-y-0.5">
                    <p class="font-semibold text-slate-600">Válido en:</p>
                    <p>• Electrodomésticos pequeños</p>
                    <p>• Accesorios de tecnología</p>
                  </div>
                </div>
                <span class="bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-lg shrink-0">500 pts</span>
              </div>
              <button data-cost="500" class="w-full reward-btn font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-all mt-1">Redimir Bono</button>
            </div>

            <!-- Tarjeta Bono 2 -->
            <div class="p-4 rounded-xl border border-slate-200/60 bg-slate-50/40 space-y-3 flex flex-col justify-between">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h4 class="font-bold text-sm text-slate-900">Bono 20% Descuento</h4>
                  <div class="text-[11px] text-slate-500 mt-1 space-y-0.5">
                    <p class="font-semibold text-slate-600">Válido en:</p>
                    <p>• Televisores y Audio</p>
                    <p>• Computadores y Tablets</p>
                  </div>
                </div>
                <span class="bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-lg shrink-0">1000 pts</span>
              </div>
              <button data-cost="1000" class="w-full reward-btn font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-all mt-1">Redimir Bono</button>
            </div>

          </div>
        </div>
      </div>

    </main>

    <!-- MODAL REGISTRO RESPONSIVE -->
    <div id="crudModal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 hidden z-50 transition-all">
      <div class="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-6 shadow-xl space-y-4 relative border border-slate-100 animate-toast">
        <h3 id="modalTitle" class="text-base sm:text-lg font-bold text-slate-900">Registrar Nueva Entrega</h3>
        <form id="crudForm" class="space-y-4">
          <input type="hidden" id="entryIndex" value="">
          
          <div>
            <label for="entryMaterial" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Material</label>
            <select id="entryMaterial" required class="mt-1 w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-green-500 focus:outline-none">
              <option value="Plástico">Plástico</option>
              <option value="Cartón y Papel">Cartón y Papel</option>
              <option value="Vidrio">Vidrio</option>
              <option value="Aceite Usado">Aceite Usado</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="entryWeight" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cantidad</label>
              <input id="entryWeight" type="number" min="0.1" step="any" required class="mt-1 w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-green-500 focus:outline-none" placeholder="Ej. 10">
            </div>
            <div>
              <label for="entryUnit" class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unidad</label>
              <select id="entryUnit" required class="mt-1 w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-green-500 focus:outline-none">
                <option value="Kg">Kg</option>
                <option value="Litros">Litros</option>
              </select>
            </div>
          </div>

          <div class="flex gap-3 pt-2 pb-4 sm:pb-0">
            <button type="button" id="closeModalBtn" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs sm:text-sm cursor-pointer">Cancelar</button>
            <button type="submit" class="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-sm cursor-pointer">Guardar</button>
          </div>
        </form>
      </div>
    </div>

  </div>
  `;
}

export function initDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  if (!currentUser) return;

  const tableBody = document.getElementById("historyTableBody");
  const modal = document.getElementById("crudModal");
  const form = document.getElementById("crudForm");
  const notificationContainer = document.getElementById("notificationContainer");
  const rewardsContainer = document.getElementById("rewardsContainer");
  
  let keyStorage = `records_${currentUser.email}`;
  if (!localStorage.getItem(keyStorage)) {
    const initRecords = [
      { fecha: "2026-07-16", categoria: "Plástico", peso: 25, unidad: "Kg", puntos: 500 },
      { fecha: "2026-07-01", categoria: "Cartón y Papel", peso: 12, unidad: "Kg", puntos: 180 }
    ];
    localStorage.setItem(keyStorage, JSON.stringify(initRecords));
  }

  const puntosBarranquilla = [
    { nombre: "EcoPunto Parque Venezuela", localidad: "Norte-Centro Histórico", lat: 11.0084, lng: -74.8132, info: "Cerca al Parque Venezuela. Acepta plásticos, papel y vidrio." },
    { nombre: "Punto Verde CC Buenavista", localidad: "Riomar", lat: 11.0185, lng: -74.8218, info: "Cerca al C.C. Buenavista. Especializado en pilas, baterías y residuos RAEE." },
    { nombre: "Centro de Acopio Prado", localidad: "Norte-Centro Histórico", lat: 10.9930, lng: -74.7965, info: "Cerca al sector residencial de El Prado. Acepta aceite de cocina usado y cartón." },
    { nombre: "Punto Ecológico Parque de la Electrificadora", localidad: "Riomar", lat: 11.0125, lng: -74.8090, info: "Cerca al Parque de la Electrificadora. Residuos domésticos reciclables limpios." },
    { nombre: "EcoPunto Plaza de la Paz", localidad: "Centro", lat: 10.9880, lng: -74.7895, info: "Cerca a la Plaza de la Paz. Punto central de botellas PET y tapitas." },
    { nombre: "EcoPunto Éxito Metropolitano (Sur)", localidad: "Metropolitana / Sur", lat: 10.9410, lng: -74.8010, info: "Cerca al Éxito del Estadio Metropolitano. Envases PET, latas y cartón aplanado." },
    { nombre: "Centro Comunitario de Reciclaje - La Paz", localidad: "Suroeste", lat: 10.9720, lng: -74.8290, info: "Cerca al Barrio La Paz. Proyecto de barrio. Acepta plásticos, papel de archivo y cartón." },
    { nombre: "EcoPunto CC Paseo de la Castellana", localidad: "Centro Histórico", lat: 10.9995, lng: -74.7860, info: "Cerca al C.C. Paseo de la Castellana. Ideal para comerciantes. Cartón, film y papel." }
  ];
  localStorage.setItem('eco_puntos', JSON.stringify(puntosBarranquilla));

  function showToast(message) {
    if (!notificationContainer) return;
    const toast = document.createElement("div");
    toast.className = "bg-slate-950 text-white text-xs font-semibold px-4 py-3.5 rounded-xl shadow-xl flex items-center gap-3 animate-toast pointer-events-auto border border-slate-800";
    toast.innerHTML = `<span class="text-lg">🎉</span><div>${message}</div>`;
    notificationContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  function renderAll() {
    const records = JSON.parse(localStorage.getItem(keyStorage)) || [];
    let totalPoints = records.reduce((sum, r) => sum + r.puntos, 0);
    let totalWeight = records.reduce((sum, r) => sum + r.peso, 0);

    if (document.getElementById("userPointsDisplay")) {
      document.getElementById("userPointsDisplay").innerText = `${totalPoints} pts`;
    }
    if (document.getElementById("userWeightDisplay")) {
      // Muestra claramente la métrica en Kg por defecto para el totalizador del usuario
      document.getElementById("userWeightDisplay").innerText = `${totalWeight} Kg`;
    }

    if (tableBody) {
      tableBody.innerHTML = records.map((rec, index) => `
        <tr class="hover:bg-slate-50/60 transition-colors">
          <td class="py-4 text-slate-500 whitespace-nowrap">${rec.fecha}</td>
          <td class="py-4">
            <span class="${
              rec.categoria === 'Plástico' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
              rec.categoria === 'Cartón y Papel' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
              rec.categoria === 'Canje Recompensa' ? 'bg-red-50 text-red-700 border border-red-100' :
              'bg-emerald-50 text-emerald-700 border border-emerald-100'
            } px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap">
              ${rec.categoria}
            </span>
          </td>
          <td class="py-4 text-slate-900 font-semibold whitespace-nowrap">${rec.peso > 0 ? `${rec.peso} ${rec.unidad || 'Kg'}` : '-'}</td>
          <td class="py-4 ${rec.puntos >= 0 ? 'text-green-600' : 'text-red-600'} font-bold whitespace-nowrap">
            ${rec.puntos >= 0 ? `+${rec.puntos}` : rec.puntos} pts
          </td>
          <td class="py-4 text-right space-x-2 whitespace-nowrap">
            ${rec.categoria !== 'Canje Recompensa' ? `
              <button data-index="${index}" class="edit-btn text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg border-2 border-blue-800 shadow-xs transition-all active:scale-95 cursor-pointer">
                Editar
              </button>
            ` : ''}
            <button data-index="${index}" class="delete-btn text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg border-2 border-red-800 shadow-xs transition-all active:scale-95 cursor-pointer">
              Eliminar
            </button>
          </td>
        </tr>
      `).join('');
    }

    document.querySelectorAll(".reward-btn").forEach(btn => {
      const cost = parseInt(btn.getAttribute("data-cost"));
      if (totalPoints >= cost) {
        btn.className = "w-full reward-btn bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer transition-colors";
        btn.innerText = "Redimir Bono";
        btn.disabled = false;
      } else {
        btn.className = "w-full reward-btn bg-slate-200 text-slate-400 font-bold py-2.5 rounded-xl text-xs cursor-not-allowed";
        btn.innerText = `Faltan ${cost - totalPoints} pts`;
        btn.disabled = true;
      }
    });
  }

  function renderDashboardMap() {
    if (typeof L === 'undefined' || !document.getElementById('dashboardMap')) return;
    
    const container = L.DomUtil.get('dashboardMap');
    if (container != null) { container._leaflet_id = null; }

    const map = L.map('dashboardMap').setView([10.9850, -74.8000], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const puntos = JSON.parse(localStorage.getItem('eco_puntos')) || [];
    puntos.forEach(p => {
      L.marker([p.lat, p.lng]).addTo(map).bindPopup(`
        <div class="space-y-1">
          <span class="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-md">${p.localidad}</span>
          <h4 class="font-bold text-slate-900 text-sm m-0 mt-1">${p.nombre}</h4>
          <p class="text-slate-600 text-xs m-0 pt-0.5">${p.info}</p>
        </div>
      `);
    });

    setTimeout(() => map.invalidateSize(), 300);
  }

  // EVENTOS DEL CONTENEDOR DE RECOMPENSAS
  rewardsContainer?.addEventListener("click", (e) => {
    const rewardBtn = e.target.closest(".reward-btn");
    if (rewardBtn && !rewardBtn.disabled) {
      const cost = parseInt(rewardBtn.getAttribute("data-cost"));
      const records = JSON.parse(localStorage.getItem(keyStorage)) || [];
      let totalPoints = records.reduce((sum, r) => sum + r.puntos, 0);

      if (totalPoints >= cost) {
        const today = new Date().toISOString().split('T')[0];
        records.unshift({ 
          fecha: today, 
          categoria: "Canje Recompensa", 
          peso: 0, 
          unidad: "Kg", 
          puntos: -cost 
        });
        localStorage.setItem(keyStorage, JSON.stringify(records));
        showToast(`¡Bono redimido con éxito! Se descontaron ${cost} pts.`);
        renderAll();
      }
    }
  });

  document.getElementById("openModalBtn")?.addEventListener("click", () => {
    document.getElementById("modalTitle").innerText = "Registrar Nueva Entrega";
    document.getElementById("entryIndex").value = "";
    form.reset();
    modal.classList.remove("hidden");
  });

  document.getElementById("closeModalBtn")?.addEventListener("click", () => modal.classList.add("hidden"));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const records = JSON.parse(localStorage.getItem(keyStorage)) || [];
    const index = document.getElementById("entryIndex").value;
    const mat = document.getElementById("entryMaterial").value;
    const weight = parseFloat(document.getElementById("entryWeight").value);
    const unit = document.getElementById("entryUnit").value;
    
    let factor = mat === "Plástico" ? 20 : mat === "Cartón y Papel" ? 15 : 80;
    let pointsCalculated = Math.round(weight * factor);

    if (index === "") {
      const today = new Date().toISOString().split('T')[0];
      records.unshift({ fecha: today, categoria: mat, peso: weight, unidad: unit, puntos: pointsCalculated });
      showToast(`Has agregado ${weight} ${unit} de ${mat}. ¡Sumaste +${pointsCalculated} puntos!`);
    } else {
      records[parseInt(index)].categoria = mat;
      records[parseInt(index)].peso = weight;
      records[parseInt(index)].unidad = unit;
      records[parseInt(index)].puntos = pointsCalculated;
      showToast(`Registro modificado con éxito.`);
    }

    localStorage.setItem(keyStorage, JSON.stringify(records));
    modal.classList.add("hidden");
    renderAll();
  });

  tableBody?.addEventListener("click", (e) => {
    const records = JSON.parse(localStorage.getItem(keyStorage)) || [];
    const editBtn = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");

    if (editBtn) {
      const idx = editBtn.getAttribute("data-index");
      const item = records[idx];
      document.getElementById("modalTitle").innerText = "Modificar Entrega";
      document.getElementById("entryIndex").value = idx;
      document.getElementById("entryMaterial").value = item.categoria;
      document.getElementById("entryWeight").value = item.peso;
      document.getElementById("entryUnit").value = item.unidad || "Kg";
      modal.classList.remove("hidden");
    }

    if (deleteBtn) {
      if (confirm("¿Deseas eliminar este registro?")) {
        records.splice(parseInt(deleteBtn.getAttribute("data-index")), 1);
        localStorage.setItem(keyStorage, JSON.stringify(records));
        renderAll();
        showToast("Registro eliminado.");
      }
    }
  });

  renderAll();
  setTimeout(renderDashboardMap, 350);
}
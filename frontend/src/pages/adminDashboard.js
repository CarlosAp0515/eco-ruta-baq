// src/pages/adminDashboard.js

export function adminDashboardPage() {
  return `
  <div class="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
    
    <!-- NAVBAR SUPERIOR -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <img src="./src/assets/IconoEcoruta.png" alt="EcoRuta BAQ Logo" class="w-20 h-20 object-contain shrink-0">
          <span class="text-xl font-extrabold text-green-800 tracking-tight">EcoRuta BAQ</span>
          <span class="bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ml-2">
            Panel Administrativo
          </span>
        </div>
        <nav class="flex items-center gap-4">
          <a href="#/" class="text-sm font-bold text-slate-500 hover:text-green-700 transition-colors">Volver al Inicio</a>
          <button id="logoutBtn" class="text-sm font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer">
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- SECCIÓN 1: TARJETAS DE ESTADÍSTICAS (KPIs) -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div class="bg-green-50 p-3.5 rounded-xl text-green-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Materiales</p>
            <h3 id="statTotalKg" class="text-2xl font-black text-slate-900 mt-0.5">0 kg</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div class="bg-blue-50 p-3.5 rounded-xl text-blue-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Usuarios Activos</p>
            <h3 id="statTotalUsers" class="text-2xl font-black text-slate-900 mt-0.5">0</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div class="bg-yellow-50 p-3.5 rounded-xl text-yellow-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Puntos Asignados</p>
            <h3 id="statTotalPoints" class="text-2xl font-black text-slate-900 mt-0.5">0 pts</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div class="bg-purple-50 p-3.5 rounded-xl text-purple-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Registros Totales</p>
            <h3 id="statTotalOrders" class="text-2xl font-black text-slate-900 mt-0.5">0</h3>
          </div>
        </div>
      </section>

      <!-- SECCIÓN 2: FILTROS -->
      <section class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 class="text-lg font-bold text-slate-900 tracking-tight">Filtros de Búsqueda</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Buscar Ciudadano</label>
            <input id="filterName" type="text" placeholder="Escribe un nombre..." 
                   class="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tipo de Material</label>
            <select id="filterMaterial" 
                    class="w-full p-3 text-sm rounded-xl border border-slate-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all">
              <option value="">Todos los materiales</option>
              <option value="Plástico">Plástico</option>
              <option value="Cartón">Cartón</option>
              <option value="Vidrio">Vidrio</option>
              <option value="Aceite Usado">Aceite Usado</option>
              <option value="Pilas">Pilas</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Fecha de Entrega</label>
            <input id="filterDate" type="date" 
                   class="w-full p-3 text-sm rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all">
          </div>
        </div>
      </section>

      <!-- SECCIÓN 3: TABLA CON ACCIONES -->
      <section class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900 tracking-tight">Historial General de Entregas</h2>
            <p class="text-xs text-slate-500 mt-0.5">Gestión centralizada: Edita o elimina aportes del sistema.</p>
          </div>
          <button id="clearFiltersBtn" class="text-xs font-bold text-green-700 hover:underline cursor-pointer">
            Limpiar Filtros
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th class="py-4 px-6">Usuario</th>
                <th class="py-4 px-6">Material</th>
                <th class="py-4 px-6 text-right">Cantidad (kg/L)</th>
                <th class="py-4 px-6 text-right">Puntos</th>
                <th class="py-4 px-6">Fecha</th>
                <th class="py-4 px-6">Punto de Acopio</th>
                <th class="py-4 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody id="adminTableBody" class="divide-y divide-slate-100 text-sm text-slate-700">
              <!-- Renderizado dinámico -->
            </tbody>
          </table>
        </div>
        
        <div id="emptyState" class="hidden py-16 text-center space-y-3">
          <p class="text-sm font-medium text-slate-500">No se encontraron registros.</p>
        </div>
      </section>
    </main>
  </div>
  `;
}

export function initAdminDashboard() {
  // Cargar registros globales de reciclaje o usar la mock data inicial
  let recyclingRecords = JSON.parse(localStorage.getItem("all_recycling_records")) || [
    { id: 1, userName: "Andrés Elles", material: "Plástico", quantity: 12.5, points: 125, date: "2026-07-15", acopio: "Parque Venezuela" },
    { id: 2, userName: "Kevin Alejandro", material: "Cartón", quantity: 8.0, points: 64, date: "2026-07-16", acopio: "CC Buenavista" },
    { id: 3, userName: "Laime Neyder", material: "Aceite Usado", quantity: 4.5, points: 90, date: "2026-07-17", acopio: "Centro Prado" },
    { id: 4, userName: "Elianys Mendoza", material: "Pilas", quantity: 2.0, points: 100, date: "2026-07-18", acopio: "Plaza de la Paz" }
  ];

  if (!localStorage.getItem("all_recycling_records")) {
    localStorage.setItem("all_recycling_records", JSON.stringify(recyclingRecords));
  }

  const tableBody = document.getElementById("adminTableBody");
  const emptyState = document.getElementById("emptyState");
  const filterName = document.getElementById("filterName");
  const filterMaterial = document.getElementById("filterMaterial");
  const filterDate = document.getElementById("filterDate");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  function updateStatistics(records) {
    const totalKg = records.reduce((acc, rec) => acc + parseFloat(rec.quantity), 0);
    const totalPoints = records.reduce((acc, rec) => acc + rec.points, 0);
    const uniqueUsers = [...new Set(records.map(rec => rec.userName))].length;

    document.getElementById("statTotalKg").textContent = `${totalKg.toFixed(1)} unit/kg`;
    document.getElementById("statTotalUsers").textContent = uniqueUsers;
    document.getElementById("statTotalPoints").textContent = `${totalPoints} pts`;
    document.getElementById("statTotalOrders").textContent = records.length;
  }

  function renderTable() {
    const nameVal = filterName.value.toLowerCase().trim();
    const materialVal = filterMaterial.value;
    const dateVal = filterDate.value;

    const filteredRecords = recyclingRecords.filter(rec => {
      const matchesName = rec.userName.toLowerCase().includes(nameVal);
      const matchesMaterial = materialVal === "" || rec.material === materialVal;
      const matchesDate = dateVal === "" || rec.date === dateVal;
      return matchesName && matchesMaterial && matchesDate;
    });

    updateStatistics(filteredRecords);

    if (filteredRecords.length === 0) {
      tableBody.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    tableBody.innerHTML = filteredRecords.map(rec => `
      <tr class="hover:bg-slate-50/80 transition-colors" data-id="${rec.id}">
        <td class="py-4 px-6 font-bold text-slate-900">${rec.userName}</td>
        <td class="py-4 px-6">
          <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold
            ${rec.material === 'Plástico' ? 'bg-emerald-50 text-emerald-700' : ''}
            ${rec.material === 'Cartón' ? 'bg-amber-50 text-amber-700' : ''}
            ${rec.material === 'Vidrio' ? 'bg-blue-50 text-blue-700' : ''}
            ${rec.material === 'Aceite Usado' ? 'bg-yellow-50 text-yellow-700' : ''}
            ${rec.material === 'Pilas' ? 'bg-red-50 text-red-700' : ''}
          ">
            ${rec.material}
          </span>
        </td>
        <td class="py-4 px-6 text-right font-mono font-medium text-slate-600">${rec.quantity}</td>
        <td class="py-4 px-6 text-right font-bold text-green-700">+${rec.points} pts</td>
        <td class="py-4 px-6 text-slate-500">${rec.date}</td>
        <td class="py-4 px-6 text-slate-600 font-medium">${rec.acopio}</td>
        <td class="py-4 px-6 text-center">
          <div class="inline-flex gap-2">
            <button class="edit-btn text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer">
              Editar
            </button>
            <button class="delete-btn text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer">
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    assignActionListeners();
  }

  // Lógica para manejar la edición y eliminación directamente en los renglones
  function assignActionListeners() {
    // BOTÓN ELIMINAR
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const id = parseInt(row.dataset.id);
        
        if (confirm("¿Estás seguro de que deseas eliminar este registro de reciclaje?")) {
          recyclingRecords = recyclingRecords.filter(rec => rec.id !== id);
          localStorage.setItem("all_recycling_records", JSON.stringify(recyclingRecords));
          renderTable();
        }
      });
    });

    // BOTÓN EDITAR
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const id = parseInt(row.dataset.id);
        const record = recyclingRecords.find(rec => rec.id === id);

        const newQuantity = prompt(`Editar cantidad para ${record.userName} (${record.material}):`, record.quantity);
        
        if (newQuantity !== null && !isNaN(newQuantity) && parseFloat(newQuantity) > 0) {
          record.quantity = parseFloat(newQuantity);
          
          // Recalcular puntos dinámicamente según el cambio de cantidad
          record.points = Math.round(record.quantity * (record.material === 'Plástico' ? 10 : record.material === 'Pilas' ? 50 : 20));
          
          localStorage.setItem("all_recycling_records", JSON.stringify(recyclingRecords));
          renderTable();
        }
      });
    });
  }

  filterName.addEventListener("input", renderTable);
  filterMaterial.addEventListener("change", renderTable);
  filterDate.addEventListener("change", renderTable);

  clearFiltersBtn.addEventListener("click", () => {
    filterName.value = "";
    filterMaterial.value = "";
    filterDate.value = "";
    renderTable();
  });

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("current_user");
    window.location.hash = "/login";
  });

  renderTable();
}
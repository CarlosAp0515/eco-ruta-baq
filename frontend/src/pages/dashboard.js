// src/pages/dashboard.js

export function dashboardPage() {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  if (!currentUser) return `<p class="p-8">Cargando...</p>`;

  const isAdmin = currentUser.role === "admin";

  return `
  <div class="min-h-screen bg-slate-50 flex">
    
    <!-- BARRA LATERAL (SIDEBAR) -->
    <aside class="w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between shrink-0">
      <div class="space-y-8">
        <h2 class="text-xl font-extrabold text-white flex items-center gap-2">
          <!-- Icono Planta Hojas SVG -->
          <svg class="w-6 h-6 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
          </svg>
          EcoRuta BAQ
        </h2>
        
        <div class="space-y-1">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">Menú</p>
          <a href="#/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-green-800 text-white font-semibold">
            <!-- Icono Panel/Métricas SVG -->
            <svg class="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Mi Panel
          </a>
          <a href="#/" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition">
            <!-- Icono Casa SVG -->
            <svg class="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Volver a Inicio
          </a>
        </div>
      </div>

      <!-- Información del Usuario en Sesión -->
      <div class="border-t border-slate-800 pt-4">
        <p class="text-sm font-bold text-white mb-1">${currentUser.name}</p>
        <span class="text-[10px] uppercase px-2 py-0.5 rounded-md font-bold ${isAdmin ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}">
          ${isAdmin ? 'Administrador' : 'Reciclador'}
        </span>
        <button id="logoutBtn" class="w-full mt-4 bg-red-500/10 hover:bg-red-500/20 text-white font-bold py-2 rounded-xl border border-red-500/20 transition-colors">
          Cerrar Sesión
        </button>
      </div>
    </aside>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="flex-1 p-8 overflow-y-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-extrabold text-slate-900">
          ${isAdmin ? 'Consola de Administración' : 'Panel del Reciclador'}
        </h1>
        <p class="text-slate-500">
          ${isAdmin ? 'Monitoreo global de usuarios, entregas y estadísticas en Barranquilla' : 'Registra tus materiales reciclados y acumula puntos'}
        </p>
      </header>

      <!-- CARGA DINÁMICA DE LA INTERFAZ SEGÚN EL ROL -->
      ${isAdmin ? renderAdminDashboard() : renderUserDashboard()}
    </main>
  </div>
  `;
}

// ------------------- VISTA PARA EL RECIclADOR COMÚN (USER) -------------------
function renderUserDashboard() {
  return `
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <!-- Formulario Exclusivo para el Usuario -->
    <div class="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 class="text-lg font-bold text-slate-900">Registrar Nueva Entrega</h3>
      
      <div id="deliveryMessage" class="hidden p-3 text-xs font-semibold rounded-xl border"></div>

      <form id="recordForm" class="space-y-4">
        <div>
          <label for="materialType" class="block text-xs font-bold text-slate-600 uppercase">Material a entregar</label>
          <select id="materialType" required class="mt-1 w-full p-3 rounded-xl border border-slate-300 bg-white text-sm focus:border-green-500 focus:ring-green-500">
            <option value="" disabled selected>-- Selecciona un Material --</option>
            <option value="plastic">Plástico</option>
            <option value="cardboard">Cartón</option>
            <option value="paper">Papel de archivo</option>
            <option value="glass">Vidrio</option>
            <option value="oil">Aceite Usado de Cocina</option>
            <option value="batteries">Pilas / Baterías</option>
          </select>
        </div>

        <div>
          <label for="quantity" class="block text-xs font-bold text-slate-600 uppercase">Cantidad</label>
          <input id="quantity" type="number" min="0.1" step="0.1" placeholder="0.0" required class="mt-1 w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-green-500 focus:ring-green-500">
        </div>

        <div>
          <label for="unitMeasure" class="block text-xs font-bold text-slate-600 uppercase">Unidad de Medida (Establecida)</label>
          <input id="unitMeasure" type="text" readonly placeholder="Selecciona un material arriba" 
            class="mt-1 w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 text-sm font-bold cursor-not-allowed focus:outline-none">
        </div>

        <button type="submit" class="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md">
          Subir Registro de Entrega
        </button>
      </form>
    </div>

    <!-- Guía de Apoyo Visual para el Usuario -->
    <div class="lg:col-span-2 bg-gradient-to-br from-green-800 to-green-950 text-white p-8 rounded-3xl shadow-lg space-y-6 flex flex-col justify-between">
      <div>
        <span class="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Manual Express</span>
        <h3 class="text-2xl font-extrabold mt-4 flex items-center gap-2">
          ¿Cómo entregar tus materiales?
          <!-- Icono Libro Abierto SVG -->
          <svg class="w-6 h-6 text-green-300 inline shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </h3>
        <ul class="mt-4 space-y-3.5 text-green-100 text-sm">
          <li class="flex items-start gap-3">
            <!-- Check Circular Verde SVG -->
            <svg class="w-5 h-5 text-green-400 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>Plásticos, Cartón y Vidrio:</strong> Deben estar totalmente secos y limpios. Aplasta las cajas y botellas para optimizar su espacio de transporte.</span>
          </li>
          <li class="flex items-start gap-3">
            <!-- Check Circular Verde SVG -->
            <svg class="w-5 h-5 text-green-400 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>Aceite de Cocina Usado:</strong> Fíltralo frío para retirar residuos de comida y viértelo en una botella plástica limpia con tapa segura.</span>
          </li>
          <li class="flex items-start gap-3">
            <!-- Check Circular Verde SVG -->
            <svg class="w-5 h-5 text-green-400 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>Pilas y Electrónicos (RAEE):</strong> Entrégalas sin fisuras ni corrosión para evitar accidentes químicos en los centros de acopio.</span>
          </li>
        </ul>
      </div>
      <div class="border-t border-white/20 pt-4 flex justify-between items-center text-xs text-green-300">
        <span>EcoRuta Barranquilla — Riwi 2026</span>
        <span>Aporte al Desarrollo Sostenible</span>
      </div>
    </div>
  </div>
  `;
}

// ------------------- VISTA PARA EL ADMINISTRADOR (ADMIN) -------------------
function renderAdminDashboard() {
  return `
  <div class="space-y-8">
    <!-- Tarjetas de Métricas Estadísticas Globales -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Recicladores Registrados</p>
        <p id="totalUsersCount" class="text-3xl font-extrabold text-slate-900 mt-2">0</p>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Peso Total (Kilos)</p>
        <p id="totalWeightCount" class="text-3xl font-extrabold text-green-600 mt-2">0.0 kg</p>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Material Más Reciclado</p>
        <p id="topMaterialCount" class="text-xl font-extrabold text-blue-600 mt-3 truncate">Ninguno</p>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Entregas Totales</p>
        <p id="totalDeliveriesCount" class="text-3xl font-extrabold text-indigo-600 mt-2">0</p>
      </div>
    </div>

    <!-- Barra de Búsquedas y Filtros -->
    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div class="relative w-full sm:w-72">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <!-- Icono Lupa SVG -->
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </span>
        <input id="adminSearchInput" type="text" placeholder="Buscar por nombre o correo..." 
          class="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
      </div>
      
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <label for="adminMaterialFilter" class="text-xs font-bold text-slate-500 uppercase shrink-0">Filtrar Material:</label>
        <select id="adminMaterialFilter" class="w-full sm:w-48 p-2 text-sm rounded-xl border border-slate-200 bg-white">
          <option value="all">Todos los materiales</option>
          <option value="plastic">Plástico</option>
          <option value="cardboard">Cartón</option>
          <option value="paper">Papel de archivo</option>
          <option value="glass">Vidrio</option>
          <option value="oil">Aceite de Cocina</option>
          <option value="batteries">Pilas / Baterías</option>
        </select>
      </div>
    </div>

    <!-- Tabla Maestra de Gestión -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 class="text-lg font-bold text-slate-900">Control General de Usuarios</h3>
          <p class="text-xs text-slate-400 mt-0.5">Filtra, busca y visualiza los datos, puntos y materiales entregados por los recicladores</p>
        </div>
        <span class="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold border border-blue-100">Consola de Control</span>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th class="p-4">Nombre de Usuario</th>
              <th class="p-4">Correo Electrónico</th>
              <th class="p-4 text-center">Puntos Acumulados</th>
              <th class="p-4 text-center">Material Favorito</th>
              <th class="p-4 text-center">Registros Realizados</th>
              <th class="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody id="adminUsersTableBody" class="divide-y divide-slate-100 text-sm text-slate-700">
            <!-- Filas inyectadas de forma dinámica con JavaScript -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}
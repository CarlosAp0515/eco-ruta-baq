// src/pages/points-dashboard.js

export function pointsDashboardPage() {
  return `
  <!-- Estilos de Leaflet para el Mapa (Inyección rápida) -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

  <div class="min-h-screen bg-slate-50 flex flex-col relative">
    <!-- NAVBAR -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <a href="#/" class="text-2xl font-bold text-green-700 hover:opacity-80 transition flex items-center gap-2">
          <!-- Icono de Hoja SVG -->
          <svg class="w-7 h-7 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18M3 12h18M12 3a9 9 0 0 1 9 9M12 21a9 9 0 0 1-9-9" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 12c2.5-2.5 5-2.5 5 0s-2.5 5-5 5-5-2.5-5-5 2.5-2.5 5-2.5z" />
          </svg>
          EcoRuta BAQ
        </a>
        <div class="flex items-center gap-4">
          <span id="userNameDisplay" class="text-sm text-slate-600 font-bold">Hola, Usuario</span>
          <button id="btnLogout" class="text-sm text-red-600 hover:underline font-semibold">Cerrar Sesión</button>
        </div>
      </div>
    </nav>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="flex-grow max-w-7xl w-full mx-auto p-6 space-y-8">
      
      <!-- ENCABEZADO -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 class="text-3xl font-extrabold text-slate-800">Mi Balance de Reciclaje</h2>
          <p class="text-slate-500">Acumula puntos entregando tus residuos en Barranquilla.</p>
        </div>
        
        <button 
          id="btnOpenModal" 
          class="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
        >
          <!-- Icono de Añadir / Plus SVG -->
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Registrar Entrega
        </button>
      </div>

      <!-- TARJETAS DE MÉTRICAS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Tarjeta Puntos -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Mis Puntos Disponibles</p>
            <h3 id="totalPointsDisplay" class="text-4xl font-bold text-green-700 mt-2">0 pts</h3>
          </div>
          <div class="bg-green-50 p-4 rounded-xl text-green-600">
            <!-- Icono de Estrella SVG -->
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.172-.46.82-.46.992 0l2.4 4.861 5.362.779c.507.074.71.7.345 1.058l-3.882 3.784.917 5.34c.087.507-.45.898-.901.658l-4.79-2.518-4.79 2.518c-.451.24-.938-.15-.851-.658l.917-5.34-3.882-3.784c-.365-.358-.162-.984.345-1.058l5.362-.779 2.4-4.861z" />
            </svg>
          </div>
        </div>

        <!-- Tarjeta Peso -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Peso Reciclado (Este Periodo)</p>
            <h3 id="totalWeightDisplay" class="text-4xl font-bold text-slate-800 mt-2">0 kg</h3>
            <p class="text-xs text-slate-400 mt-1">Plástico, cartón y vidrio</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-xl text-blue-600">
            <!-- Icono de Balanza / Escala SVG -->
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17m0-17L4 9h16L12 3zm0 17H4M12 20h8M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
          </div>
        </div>

        <!-- Tarjeta Bono -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Bono más cercano</p>
            <h3 class="text-2xl font-bold text-orange-600 mt-2">10% Dcto Alkosto</h3>
            <p class="text-xs text-slate-400 mt-1">Requiere 500 puntos</p>
          </div>
          <div class="bg-orange-50 p-4 rounded-xl text-orange-600">
            <!-- Icono de Ticket / Cupón SVG -->
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h12a2.25 2.25 0 012.25 2.25V15a2.25 2.25 0 01-2.25 2.25H7.5A2.25 2.25 0 015.25 15V8.25A2.25 2.25 0 017.5 6z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- GUÍA DETALLADA DE RECICLAJE -->
      <section class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <div class="border-b pb-3 flex items-center gap-3">
          <div class="p-2 bg-green-50 rounded-lg text-green-700">
            <!-- Icono de Libro Abierto SVG -->
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-800">Guía de Preparación de Residuos</h3>
            <p class="text-sm text-slate-500">Asegura tus puntos preparando tus materiales correctamente antes de llevarlos al punto físico.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 hover:border-green-300 transition-all duration-300">
            <div class="text-green-600">
              <!-- Icono de Gotas / Limpieza SVG -->
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.046.824-.028 1.673-.24 2.495L18.41 17.5a2.25 2.25 0 01-2.183 1.5H7.773a2.25 2.25 0 01-2.183-1.5l-1.6-6.494c-.212-.822-.286-1.67-.24-2.495m16.5 0a9.003 9.003 0 00-16.5 0m16.5 0c-.267-.035-.539-.05-.812-.047M3.75 8.511c.267-.035.539-.05.812-.047m11.188-4.51c.361.353.64.778.82 1.25m-11.188-1.25c-.361.353-.64.778-.82 1.25m11.188-1.25H4.562" />
              </svg>
            </div>
            <h4 class="font-bold text-slate-800 text-base">1. Limpiar y Secar</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              Enjuaga envases plásticos, frascos de vidrio y cajas de tetrapak. Los residuos con grasa u hongos arruinan lotes enteros de reciclaje. ¡Déjalos secar completamente!
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 hover:border-green-300 transition-all duration-300">
            <div class="text-blue-600">
              <!-- Icono de Paquete / Caja Plana SVG -->
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <h4 class="font-bold text-slate-800 text-base">2. Reducir Espacio</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              Compacta las botellas de plástico sacándoles el aire y vuelve a taparlas. Desarma y aplana las cajas de cartón. Optimizar el espacio facilita el transporte en Barranquilla.
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 hover:border-green-300 transition-all duration-300">
            <div class="text-yellow-600">
              <!-- Icono de Escudo / Protección SVG (Guardado Seguro) -->
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h4 class="font-bold text-slate-800 text-base">3. Separar y Envasar</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              No mezcles materiales. Envasa el aceite usado de cocina en botellas plásticas bien selladas (nunca de vidrio). Guarda pilas y baterías en bolsas secas de forma independiente.
            </p>
          </div>
        </div>
      </section>

      <!-- SECCIÓN DEL MAPA INTERACTIVO -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <!-- Icono de Ubicación SVG -->
            <svg class="w-5 h-5 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25gC4.5 4.87 8.13 3 12 3s7.5 1.87 7.5 7.5z" />
            </svg>
            Puntos de Recolección Cercanos
          </h3>
          <span class="text-xs text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full">Barranquilla, Atlántico</span>
        </div>
        <!-- Contenedor donde se dibujará el mapa -->
        <div id="map" class="w-full h-80 rounded-xl border border-slate-200 z-10"></div>
      </div>

      <!-- TABLA Y CANJE -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- TABLA DE ENTREGAS -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h3 class="text-xl font-bold text-slate-800">Historial de Entregas (Últimos 30 días)</h3>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 text-slate-400 text-sm">
                  <th class="pb-3 font-semibold">Fecha</th>
                  <th class="pb-3 font-semibold">Categoría</th>
                  <th class="pb-3 font-semibold">Peso / Cantidad</th>
                  <th class="pb-3 font-semibold">Puntos</th>
                  <th class="pb-3 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody id="historyTableBody" class="divide-y divide-slate-100 text-slate-600 text-sm">
                <!-- Dinámico -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- REDIMIR BONOS -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
          <h3 class="text-xl font-bold text-slate-800">Canjear Recompensas</h3>
          <div class="space-y-4">
            <div class="border border-slate-100 p-4 rounded-xl space-y-3 hover:border-green-300 transition">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-slate-800">Bono 10% Descuento</h4>
                  <p class="text-sm text-slate-500">Válido en Alkosto</p>
                </div>
                <span class="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full">500 pts</span>
              </div>
              <button id="btnRedeem10" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Redimir Bono
              </button>
            </div>

            <div class="border border-slate-100 p-4 rounded-xl space-y-3 hover:border-green-300 transition">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-slate-800">Bono 20% Descuento</h4>
                  <p class="text-sm text-slate-500">Válido en Alkosto</p>
                </div>
                <span class="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full">1000 pts</span>
              </div>
              <button id="btnRedeem20" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Redimir Bono
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- MODAL REGISTRAR/EDITAR ENTREGA -->
    <div id="deliveryModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6">
        <div class="flex justify-between items-center border-b pb-3">
          <h3 id="modalTitle" class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <!-- Icono de Reciclaje SVG -->
            <svg class="w-6 h-6 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Registrar Nueva Entrega
          </h3>
          <button id="btnCloseModal" class="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>

        <form id="deliveryForm" class="space-y-4">
          <input type="hidden" id="editIndex" value="">

          <div>
            <label class="block mb-1.5 text-sm font-semibold text-slate-700">Material de Reciclaje</label>
            <select id="deliveryCategory" class="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600 bg-white" required>
              <option value="" disabled selected>Selecciona un material</option>
              <option value="Plástico">Plástico (PET, PEAD)</option>
              <option value="Cartón y Papel">Cartón y Papel</option>
              <option value="Vidrio">Vidrio</option>
              <option value="Pilas / Baterías">Pilas / Baterías</option>
              <option value="Aceite Usado">Aceite de Cocina Usado</option>
              <option value="Electrónicos (RAEE)">Aparatos Electrónicos (RAEE)</option>
            </select>
          </div>

          <div>
            <label class="block mb-1.5 text-sm font-semibold text-slate-700">Cantidad o Peso</label>
            <div class="flex gap-2">
              <input 
                id="deliveryQuantity" 
                type="number" 
                min="1" 
                placeholder="Ej: 5" 
                class="w-2/3 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600" 
                required
              >
              <select id="deliveryUnit" class="w-1/3 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600 bg-white" required>
                <option value="Kg">Kg</option>
                <option value="Litros">Litros</option>
                <option value="Unidades">Unid.</option>
              </select>
            </div>
          </div>

          <button id="btnSubmitForm" type="submit" class="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold transition">
            Guardar Entrega y Sumar Puntos
          </button>
        </form>
      </div>
    </div>

    <!-- MODAL DE PRODUCTOS APLICABLES PARA CANJE -->
    <div id="redeemModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6">
        <div class="flex justify-between items-center border-b pb-3">
          <h3 id="redeemModalTitle" class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <!-- Icono de Ticket / Cupón SVG -->
            <svg class="w-6 h-6 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h12a2.25 2.25 0 012.25 2.25V15a2.25 2.25 0 01-2.25 2.25H7.5A2.25 2.25 0 015.25 15V8.25A2.25 2.25 0 017.5 6z" />
            </svg>
            Recompensa Alkosto
          </h3>
          <button id="btnCloseRedeemModal" class="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>
        
        <div class="space-y-4">
          <p class="text-sm text-slate-600">
            Este cupón de descuento aplica exclusivamente para los siguientes productos seleccionados en las sedes físicas de Barranquilla:
          </p>
          
          <ul id="redeemProductList" class="space-y-2 text-sm font-semibold text-slate-700 bg-slate-50 p-4 rounded-xl border">
            <!-- Dinámico -->
          </ul>

          <div class="bg-green-50 border border-green-100 p-3 rounded-xl text-xs text-green-800 flex flex-col gap-1">
            <span class="font-bold">¿Cómo redimirlo?</span>
            <span>Presenta el código generado en la caja del almacén junto con tu documento de identidad.</span>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <button id="btnCancelRedeem" class="px-4 py-2 border rounded-xl font-semibold text-slate-500 hover:bg-slate-50 text-sm">
            Cancelar
          </button>
          <button id="btnConfirmRedeem" class="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold text-sm">
            Confirmar Canje
          </button>
        </div>
      </div>
    </div>

  </div>
  `;
}
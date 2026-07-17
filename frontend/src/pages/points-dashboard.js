// src/pages/points-dashboard.js

export function pointsDashboardPage() {
  return `
  <!-- Estilos de Leaflet para el Mapa (Inyección rápida) -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

  <div class="min-h-screen bg-slate-50 flex flex-col relative">
    <!-- NAVBAR -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <a href="#/" class="text-2xl font-bold text-green-700 hover:opacity-80 transition">🌱 EcoRuta BAQ</a>
        <div class="flex items-center gap-4">
          <span id="userNameDisplay" class="text-sm text-slate-600 font-bold">Hola, Usuario</span>
          <button id="btnLogout" class="bg-red-600 hover:bg-red-900 rounded-xl px-5 py-1 text-m text-white font-bold cursor-pointer">Cerrar Sesión</button>
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
          ➕ Registrar Entrega
        </button>
      </div>

      <!-- TARJETAS DE MÉTRICAS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Mis Puntos Disponibles</p>
            <h3 id="totalPointsDisplay" class="text-4xl font-bold text-green-700 mt-2">0 pts</h3>
          </div>
          <div class="text-4xl bg-green-50 p-4 rounded-xl">⭐</div>
        </div>

        <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Peso Reciclado (Este Periodo)</p>
            <h3 id="totalWeightDisplay" class="text-4xl font-bold text-slate-800 mt-2">0 kg</h3>
            <p class="text-xs text-slate-400 mt-1">Plástico, cartón y vidrio</p>
          </div>
          <div class="text-4xl bg-blue-50 p-4 rounded-xl">⚖️</div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Bono más cercano</p>
            <h3 class="text-2xl font-bold text-orange-600 mt-2">10% Dcto Alkosto</h3>
            <p class="text-xs text-slate-400 mt-1">Requiere 500 puntos</p>
          </div>
          <div class="text-4xl bg-orange-50 p-4 rounded-xl">🎟️</div>
        </div>
      </div>

      <!-- GUÍA DETALLADA DE RECICLAJE (NUEVA SECCIÓN) -->
      <section class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <div class="border-b pb-3">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">📖 Guía de Preparación de Residuos</h3>
          <p class="text-sm text-slate-500">Asegura tus puntos preparando tus materiales correctamente antes de llevarlos al punto físico.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <span class="text-2xl">🧼</span>
            <h4 class="font-bold text-slate-800 text-base">1. Limpiar y Secar</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              Enjuaga envases plásticos, frascos de vidrio y cajas de tetrapak. Los residuos con grasa u hongos arruinan lotes enteros de reciclaje. ¡Déjalos secar completamente!
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <span class="text-2xl">📦</span>
            <h4 class="font-bold text-slate-800 text-base">2. Reducir Espacio</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              Compacta las botellas de plástico sacándoles el aire y vuelve a taparlas. Desarma y aplana las cajas de cartón. Optimizar el espacio facilita el transporte en Barranquilla.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <span class="text-2xl">🔒</span>
            <h4 class="font-bold text-slate-800 text-base">3. Separar y Envasar</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              No mezcles materiales. Envasa el aceite usado de cocina en botellas plásticas bien selladas (nunca de vidrio). Guarda pilas y baterías en bolsas secas de forma independiente.
            </p>
          </div>
        </div>
      </section>

      <!-- SECCIÓN DEL MAPA INTERACTIVO (BARRANQUILLA) -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold text-slate-800">📍 Puntos de Recolección Cercanos</h3>
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
          <h3 id="modalTitle" class="text-xl font-bold text-slate-800">♻️ Registrar Nueva Entrega</h3>
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

    <!-- MODAL DE PRODUCTOS APLICABLES PARA CANJE (NUEVO) -->
    <div id="redeemModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6">
        <div class="flex justify-between items-center border-b pb-3">
          <h3 id="redeemModalTitle" class="text-xl font-bold text-slate-800">🎟️ Recompensa Alkosto</h3>
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
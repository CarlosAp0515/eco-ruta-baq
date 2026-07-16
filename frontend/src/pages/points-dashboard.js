// src/pages/points-dashboard.js

export function pointsDashboardPage() {
  return `
  <div class="min-h-screen bg-slate-50 flex flex-col relative">
    <!-- NAVBAR DEL DASHBOARD -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <!-- Enlace para volver a la Landing haciendo click en el Logo -->
        <a href="#/" class="text-2xl font-bold text-green-700 hover:opacity-80 transition">🌱 EcoRuta BAQ</a>
        <div class="flex items-center gap-4">
          <!-- El nombre se inyectará dinámicamente aquí -->
          <span id="userNameDisplay" class="text-sm text-slate-600 font-bold">Hola, Usuario</span>
          <button id="btnLogout" class="text-sm text-red-600 hover:underline font-semibold">Cerrar Sesión</button>
        </div>
      </div>
    </nav>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="flex-grow max-w-7xl w-full mx-auto p-6 space-y-8">
      
      <!-- ENCABEZADO Y RESUMEN -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 class="text-3xl font-extrabold text-slate-800">Mi Balance de Reciclaje</h2>
          <p class="text-slate-500">Acumula puntos entregando tus residuos y redímelos en bonos de descuento.</p>
        </div>
        
        <!-- BOTÓN PARA REGISTRAR NUEVO RECICLAJE -->
        <button 
          id="btnOpenModal" 
          class="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
        >
          ➕ Registrar Entrega
        </button>
      </div>

      <!-- TARJETAS DE MÉTRICAS (KPIs) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Tarjeta 1: Puntos Totales -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Mis Puntos Disponibles</p>
            <h3 id="totalPointsDisplay" class="text-4xl font-bold text-green-700 mt-2">0 pts</h3>
          </div>
          <div class="text-4xl bg-green-50 p-4 rounded-xl">⭐️</div>
        </div>

        <!-- Tarjeta 2: Peso Reciclado -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Peso Reciclado (Este Periodo)</p>
            <h3 id="totalWeightDisplay" class="text-4xl font-bold text-slate-800 mt-2">0 kg</h3>
            <p class="text-xs text-slate-400 mt-1">Plástico, cartón y vidrio acumulados</p>
          </div>
          <div class="text-4xl bg-blue-50 p-4 rounded-xl">⚖️</div>
        </div>

        <!-- Tarjeta 3: Próximo Descuento -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Bono más cercano</p>
            <h3 class="text-2xl font-bold text-orange-600 mt-2">10% Dcto Alkosto</h3>
            <p class="text-xs text-slate-400 mt-1">Requiere 500 puntos</p>
          </div>
          <div class="text-4xl bg-orange-50 p-4 rounded-xl">🎟️</div>
        </div>
      </div>

      <!-- CONTENIDO: TABLA Y CANJE -->
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
                  <th class="pb-3 font-semibold">Puntos Obtenidos</th>
                </tr>
              </thead>
              <tbody id="historyTableBody" class="divide-y divide-slate-100 text-slate-600 text-sm">
                <!-- Se llena dinámicamente -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- REDIMIR BONOS -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
          <h3 class="text-xl font-bold text-slate-800">Canjear Recompensas</h3>
          <div class="space-y-4">
            <!-- Bono 10% -->
            <div class="border border-slate-100 p-4 rounded-xl space-y-3 hover:border-green-300 transition">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-slate-800">Bono 10% Descuento</h4>
                  <p class="text-sm text-slate-500">Válido en Alkosto Barranquilla</p>
                </div>
                <span class="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full">500 pts</span>
              </div>
              <button id="btnRedeem10" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Redimir Bono
              </button>
            </div>

            <!-- Bono 20% -->
            <div class="border border-slate-100 p-4 rounded-xl space-y-3 hover:border-green-300 transition">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-slate-800">Bono 20% Descuento</h4>
                  <p class="text-sm text-slate-500">Válido en Alkosto Barranquilla</p>
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

    <!-- ================= MODAL REGISTRAR ENTREGA (OCULTO POR DEFECTO) ================= -->
    <div id="deliveryModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6">
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="text-xl font-bold text-slate-800">♻️ Registrar Nueva Entrega</h3>
          <button id="btnCloseModal" class="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>

        <form id="deliveryForm" class="space-y-4">
          <!-- Categoría -->
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

          <!-- Cantidad -->
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

          <button type="submit" class="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold transition">
            Guardar Entrega y Sumar Puntos
          </button>
        </form>
      </div>
    </div>

  </div>
  `;
}
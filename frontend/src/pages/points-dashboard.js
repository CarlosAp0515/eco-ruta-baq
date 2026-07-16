// src/pages/points-dashboard.js

export function pointsDashboardPage() {
  return `
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-green-700">🌱 EcoRuta BAQ</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-slate-600 font-medium">Hola, Coder</span>
          <a href="#/" class="text-sm text-red-600 hover:underline">Cerrar Sesión</a>
        </div>
      </div>
    </nav>

    <main class="flex-grow max-w-7xl w-full mx-auto p-6 space-y-8">
      
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 class="text-3xl font-extrabold text-slate-800">Mi Balance de Reciclaje</h2>
          <p class="text-slate-500">Acumula puntos entregando tus residuos y redímelos en bonos de descuento.</p>
        </div>
        <div class="bg-green-100 text-green-800 px-4 py-3 rounded-xl border border-green-200 flex items-center gap-2">
          <span>📅</span>
          <span class="font-semibold text-sm">Próximo corte mensual: En 15 días</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Mis Puntos Disponibles</p>
            <h3 id="totalPointsDisplay" class="text-4xl font-bold text-green-700 mt-2">0 pts</h3>
          </div>
          <div class="text-4xl bg-green-50 p-4 rounded-xl">⭐️</div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Peso Reciclado (Este Periodo)</p>
            <h3 id="totalWeightDisplay" class="text-4xl font-bold text-slate-800 mt-2">0 kg</h3>
            <p class="text-xs text-slate-400 mt-1">Plástico, cartón y vidrio acumulados</p>
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
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
                </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
          <h3 class="text-xl font-bold text-slate-800">Canjear Recompensas</h3>
          
          <div class="space-y-4">
            <div class="border border-slate-100 p-4 rounded-xl space-y-3 hover:border-green-300 transition">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-slate-800">Bono 10% Descuento</h4>
                  <p class="text-sm text-slate-500">Válido en Alkosto Barranquilla</p>
                </div>
                <span class="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full">500 pts</span>
              </div>
              <button 
                id="btnRedeem10" 
                class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Redimir Bono
              </button>
            </div>

            <div class="border border-slate-100 p-4 rounded-xl space-y-3 hover:border-green-300 transition">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-slate-800">Bono 20% Descuento</h4>
                  <p class="text-sm text-slate-500">Válido en Alkosto Barranquilla</p>
                </div>
                <span class="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full">1000 pts</span>
              </div>
              <button 
                id="btnRedeem20" 
                class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Redimir Bono
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
  `;
}
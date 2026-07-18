// src/pages/landing.js

export function landingPage() {
  return `
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

  <div class="min-h-screen bg-slate-50 flex flex-col font-sans">
    
    <!-- NAVBAR (Logo unificado con el Dashboard) -->
    <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <span class="text-xl font-extrabold text-slate-900 flex items-center gap-2">
        
          <img src="./src/assets/IconoEcoruta.png" alt="EcoRuta BAQ Logo" class="w-20 h-20 object-contain shrink-0">    
          EcoRuta BAQ
        </span>
        <div class="flex items-center gap-4">
          <a href="#/login" class="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Iniciar Sesión</a>
          <a href="#/register" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all">
            Registrarse
          </a>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <header class="bg-gradient-to-b from-green-50 to-slate-50 py-20 px-6 border-b border-slate-100">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <span class="bg-yellow-400 text-white font-bold uppercase text-xs tracking-wider px-3.5 py-1.5 rounded-full">
          ¡Hola, Barranquilla!
        </span>
        <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Recicla tus residuos cotidianos y <span class="text-green-700">gana recompensas</span>
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          EcoRuta BAQ te ayuda a gestionar plástico, cartón, pilas y aceite usado desde tu localidad. ¡Acumula puntos y redímelos en tus marcas favoritas!
        </p>
        <div class="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <a href="#/register" class="bg-green-700 hover:bg-green-800 text-white text-base font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            Empezar a Reciclar
          </a>
          <a href="#/dashboard" class="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-base font-bold px-8 py-4 rounded-2xl transition-all">
            Ver Mi Dashboard
          </a>
        </div>
      </div>
    </header>

    <!-- CÓMO FUNCIONA -->
    <section class="py-20 px-6 max-w-7xl mx-auto w-full">
      <div class="text-center space-y-3 mb-16">
        <h2 class="text-3xl font-extrabold text-slate-900">¿Cómo funciona EcoRuta BAQ?</h2>
        <p class="text-slate-500 max-w-xl mx-auto">Sigue estos tres simples pasos para transformar tus desechos en valor real.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div class="bg-green-50 w-12 h-12 flex items-center justify-center rounded-xl">
            <svg class="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900">1. Separa tus Residuos</h3>
          <p class="text-slate-600">Reúne plástico, cartón, vidrio, aceite o pilas. Clasifícalos fácilmente en tu hogar o negocio.</p>
        </div>

        <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div class="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-xl">
            <svg class="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900">2. Entrega en Acopios</h3>
          <p class="text-slate-600">Ubica tu punto de recolección en el mapa interactivo y lleva tus materiales para ser pesados.</p>
        </div>

        <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div class="bg-orange-50 w-12 h-12 flex items-center justify-center rounded-xl">
            <svg class="w-6 h-6 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18M5.25 6h13.5A2.25 2.25 0 0121 8.25v7.5A2.25 2.25 0 0118.75 18H5.25A2.25 2.25 0 013 15.75v-7.5A2.25 2.25 0 015.25 6z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900">3. ¡Gana Recompensas!</h3>
          <p class="text-slate-600">Por cada kilogramo o unidad de desecho, sumas puntos directos a tu cuenta canjeables por bonos de descuento.</p>
        </div>
      </div>
    </section>

    <!-- GUÍA DE PREPARACIÓN DE RESIDUOS -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center space-y-2 mb-16">
          <span class="bg-green-100 text-green-800 font-bold uppercase text-xs tracking-wider px-3 py-1 rounded-full">Manual Práctico</span>
          <h2 class="text-3xl font-extrabold text-slate-900">¿Cómo preparar tus residuos para entrega?</h2>
          <p class="text-slate-500 max-w-xl mx-auto">Sigue estos lineamientos ecológicos para asegurar que tus materiales clasifiquen para ganar puntos.</p>
        </div>
    
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-3 border-l-2 border-green-500 pl-4">
            <h4 class="font-bold text-lg text-slate-800">1. Botellas de Plástico</h4>
            <p class="text-sm text-slate-600">Vacía el contenido, enjuágalas para retirar azúcares, aplástalas para ahorrar espacio y colócales su tapa.</p>
          </div>
          <div class="space-y-3 border-l-2 border-blue-500 pl-4">
            <h4 class="font-bold text-lg text-slate-800">2. Cartones y Papel</h4>
            <p class="text-sm text-slate-600">Desarma las cajas para dejarlas planas. Asegúrate de que no tengan grasa de comida, pintura o aceites.</p>
          </div>
          <div class="space-y-3 border-l-2 border-yellow-500 pl-4">
            <h4 class="font-bold text-lg text-slate-800">3. Aceite Usado</h4>
            <p class="text-sm text-slate-600">Espera que se enfríe, pásalo por un colador para quitarle residuos de comida y almacénalo en una botella plástica limpia.</p>
          </div>
          <div class="space-y-3 border-l-2 border-red-500 pl-4">
            <h4 class="font-bold text-lg text-slate-800">4. Pilas y Electrónicos</h4>
            <p class="text-sm text-slate-600">Recubre las terminales con cinta adhesiva transparente si están deterioradas para evitar corrosión química cruzada.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN DEL MAPA INTERACTIVO -->
    <section class="py-20 bg-slate-100 border-t border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 text-center space-y-8">
        <div class="space-y-3">
          <span class="text-green-700 font-bold uppercase text-xs tracking-widest bg-green-50 px-3 py-1 rounded-full">
            Cobertura Urbana
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900">Mapa Ecológico de Barranquilla</h2>
          <p class="text-slate-500 max-w-2xl mx-auto">
            Explora las ubicaciones exactas de nuestros 8 puntos autorizados distribuidos de manera estratégica.
          </p>
        </div>

        <div class="bg-white p-4 rounded-3xl shadow-xl border border-slate-200 max-w-5xl mx-auto">
          <div id="landingMap" class="w-full h-[500px] rounded-2xl border border-slate-100 z-10"></div>
        </div>

        <!-- DIRECTORIO VISUAL COMPLEMENTARIO (Mapeado con referencias "Cerca a...") -->
        <div class="max-w-5xl mx-auto mt-12 text-left">
          <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-slate-700 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Directorio de Red de Acopios Oficiales
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- 1. EcoPunto Parque Venezuela -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Norte-Centro Histórico</span>
                <h4 class="text-base font-bold text-slate-800 mt-3">EcoPunto Parque Venezuela</h4>
                <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación: Cerca al Parque Venezuela
                </p>
              </div>
              <p class="text-sm text-slate-600 mt-4">Acepta plásticos, papel y vidrio.</p>
            </div>

            <!-- 2. Punto Verde CC Buenavista -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Riomar</span>
                <h4 class="text-base font-bold text-slate-800 mt-3">Punto Verde CC Buenavista</h4>
                <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación: Cerca al C.C. Buenavista (Riomar)
                </p>
              </div>
              <p class="text-sm text-slate-600 mt-4">Especializado en pilas, baterías y residuos RAEE.</p>
            </div>

            <!-- 3. Centro de Acopio Prado -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Norte-Centro Histórico</span>
                <h4 class="text-base font-bold text-slate-800 mt-3">Centro de Acopio Prado</h4>
                <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación: Cerca al sector residencial de El Prado
                </p>
              </div>
              <p class="text-sm text-slate-600 mt-4">Acepta aceite de cocina usado y cartón.</p>
            </div>

            <!-- 4. Punto Ecológico Parque de la Electrificadora -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Riomar</span>
                <h4 class="text-base font-bold text-slate-800 mt-3">Punto Ecológico Parque de la Electrificadora</h4>
                <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación: Cerca al Parque de la Electrificadora
                </p>
              </div>
              <p class="text-sm text-slate-600 mt-4">Residuos domésticos reciclables limpios.</p>
            </div>

            <!-- 5. EcoPunto Plaza de la Paz -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">Centro</span>
                <h4 class="text-base font-bold text-slate-800 mt-3">EcoPunto Plaza de la Paz</h4>
                <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación: Cerca a la Plaza de la Paz (Zona Central)
                </p>
              </div>
              <p class="text-sm text-slate-600 mt-4">Punto central de recolección de botellas PET y tapitas.</p>
            </div>

            <!-- 6. EcoPunto Éxito Metropolitano (Sur) -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full">Metropolitana / Sur</span>
                <h4 class="text-base font-bold text-slate-800 mt-3">EcoPunto Éxito Metropolitano (Sur)</h4>
                <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación: Cerca al Éxito del Estadio Metropolitano
                </p>
              </div>
              <p class="text-sm text-slate-600 mt-4">Punto de recolección de envases PET, latas de aluminio y cartón aplanado.</p>
            </div>

            <!-- 7. Centro Comunitario de Reciclaje - La Paz -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full">Suroeste</span>
                <h4 class="text-base font-bold text-slate-800 mt-3">Centro Comunitario de Reciclaje - La Paz</h4>
                <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación: Cerca al Barrio La Paz (Sector Comunitario)
                </p>
              </div>
              <p class="text-sm text-slate-600 mt-4">Proyecto de reciclaje de barrio. Acepta plásticos, papel de archivo y cartón.</p>
            </div>

            <!-- 8. EcoPunto CC Paseo de la Castellana (Centro) -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">Centro Histórico</span>
                <h4 class="text-base font-bold text-slate-800 mt-3">EcoPunto CC Paseo de la Castellana</h4>
                <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Ubicación: Cerca al C.C. Paseo de la Castellana
                </p>
              </div>
              <p class="text-sm text-slate-600 mt-4">Ideal para comerciantes. Recolección masiva de cartón, plástico film y papel.</p>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION FINAL -->
    <section class="py-20 px-6 text-center bg-green-900 text-white">
      <div class="max-w-3xl mx-auto space-y-6">
        <h2 class="text-3xl md:text-4xl font-extrabold">¿Listo para marcar la diferencia en Barranquilla?</h2>
        <p class="text-green-100 text-lg">
          Únete a la comunidad de EcoRuta BAQ. Registra tus entregas, mantén limpia tu localidad y aprovecha los mejores beneficios comerciales.
        </p>
        <div class="pt-4">
          <a href="#/register" class="bg-white hover:bg-slate-100 text-green-950 font-extrabold text-base px-8 py-4 rounded-2xl shadow-lg transition-all inline-block">
            Crear mi Cuenta Gratis
          </a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© 2026 EcoRuta BAQ. Proyecto académico para Riwi.</span>
        <div class="flex gap-4">
          <span class="hover:text-white transition-colors cursor-pointer">Términos y condiciones</span>
          <span class="hover:text-white transition-colors cursor-pointer">Contacto</span>
        </div>
      </div>
    </footer>

  </div>
  `;
}
// src/pages/landing.js

export function landingPage() {
  return `
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

  <div class="min-h-screen bg-slate-50 flex flex-col font-sans">
    
    <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <span class="text-2xl font-bold text-green-700 flex items-center gap-2">🌱 EcoRuta BAQ</span>
        <div class="flex items-center gap-4">
          <a href="#/login" class="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Iniciar Sesión</a>
          <a href="#/register" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all">
            Registrarse
          </a>
        </div>
      </div>
    </nav>

    <header class="bg-gradient-to-b from-green-50 to-slate-50 py-20 px-6 border-b border-slate-100">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <span class="bg-green-100 text-green-800 font-bold uppercase text-xs tracking-wider px-3.5 py-1.5 rounded-full">
          ¡Hola, Barranquilla! 🇨🇴
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
          <a href="#/login" class="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-base font-bold px-8 py-4 rounded-2xl transition-all">
            Ver Mi Dashboard
          </a>
        </div>
      </div>
    </header>

    <section class="py-20 px-6 max-w-7xl mx-auto w-full">
      <div class="text-center space-y-3 mb-16">
        <h2 class="text-3xl font-extrabold text-slate-900">¿Cómo funciona EcoRuta BAQ?</h2>
        <p class="text-slate-500 max-w-xl mx-auto">Sigue estos tres simples pasos para transformar tus desechos en valor real.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div class="text-3xl bg-green-50 w-12 h-12 flex items-center justify-center rounded-xl">📦</div>
          <h3 class="text-xl font-bold text-slate-900">1. Separa tus Residuos</h3>
          <p class="text-slate-600">Reúne plástico, cartón, vidrio, aceite o pilas. Clasifícalos fácilmente en tu hogar o negocio.</p>
        </div>

        <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div class="text-3xl bg-blue-50 w-12 h-12 flex items-center justify-center rounded-xl">📍</div>
          <h3 class="text-xl font-bold text-slate-900">2. Entrega en Acopios</h3>
          <p class="text-slate-600">Ubica tu punto de recolección en el mapa interactivo y lleva tus materiales para ser pesados.</p>
        </div>

        <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div class="text-3xl bg-orange-50 w-12 h-12 flex items-center justify-center rounded-xl">🎟️</div>
          <h3 class="text-xl font-bold text-slate-900">3. ¡Gana Recompensas!</h3>
          <p class="text-slate-600">Por cada kilogramo o unidad de desecho, sumas puntos directos a tu cuenta canjeables por bonos de descuento.</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-100 border-t border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 text-center space-y-8">
        <div class="space-y-3">
          <span class="text-green-700 font-bold uppercase text-xs tracking-widest bg-green-50 px-3 py-1 rounded-full">
            Cobertura Total
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900">EcoRuta en las 5 Localidades de BAQ</h2>
          <p class="text-slate-500 max-w-2xl mx-auto">
            Identifica tu punto de acopio más cercano. Tenemos estaciones estratégicas en Riomar, Suroeste, Suroriente, Metropolitana y Norte-Centro Histórico.
          </p>
        </div>

        <div class="bg-white p-4 rounded-3xl shadow-xl border border-slate-200 max-w-5xl mx-auto">
          <div id="landingMap" class="w-full h-[500px] rounded-2xl border border-slate-100 z-10"></div>
        </div>

        <div class="max-w-5xl mx-auto mt-12 text-left">
          <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            📋 Directorio de Puntos de Acopio Autorizados
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Riomar</span>
              <h4 class="text-base font-bold text-slate-800 mt-3">Centro de Acopio Buenavista</h4>
              <p class="text-xs text-slate-500 mt-1">📍 Cerca al C.C. Buenavista</p>
              <p class="text-sm text-slate-600 mt-2"><strong>Acepta:</strong> Plásticos (PET/PEAD), Vidrio y Cartón.</p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Norte-Centro Histórico</span>
              <h4 class="text-base font-bold text-slate-800 mt-3">Punto Verde Parque Venezuela</h4>
              <p class="text-xs text-slate-500 mt-1">📍 Parque Venezuela</p>
              <p class="text-sm text-slate-600 mt-2"><strong>Acepta:</strong> Pilas, Baterías, Aceite de Cocina Usado y RAEE.</p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Suroeste</span>
              <h4 class="text-base font-bold text-slate-800 mt-3">EcoPunto Parque Sagrado Corazón</h4>
              <p class="text-xs text-slate-500 mt-1">📍 Parque Sagrado Corazón</p>
              <p class="text-sm text-slate-600 mt-2"><strong>Acepta:</strong> Cartón, Papel de archivo y Plásticos.</p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Suroriente</span>
              <h4 class="text-base font-bold text-slate-800 mt-3">Estación Simón Bolívar</h4>
              <p class="text-xs text-slate-500 mt-1">📍 Sector Canchas Simón Bolívar</p>
              <p class="text-sm text-slate-600 mt-2"><strong>Acepta:</strong> Envases metálicos, Aluminio y Vidrio.</p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition col-span-1 md:col-span-2 lg:col-span-1">
              <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">Metropolitana</span>
              <h4 class="text-base font-bold text-slate-800 mt-3">EcoPunto Metropolitano</h4>
              <p class="text-xs text-slate-500 mt-1">📍 Cerca al Estadio Metropolitano</p>
              <p class="text-sm text-slate-600 mt-2"><strong>Acepta:</strong> Todo tipo de materiales aprovechables.</p>
            </div>

          </div>
        </div>
      </div>
    </section>

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
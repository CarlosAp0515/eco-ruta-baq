

export function loginPage() {
  return `
  <div class="min-h-screen w-full flex bg-slate-50 font-sans antialiased text-slate-800">
    
    <!-- LADO IZQUIERDO: IMAGEN DE BACKGROUND (Oculta en móviles, visible desde pantallas lg) -->
    <div class="hidden lg:block lg:w-1/2 bg-cover bg-center relative" 
         style="background-image: url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200');">
      <!-- Capa de superposición para mejorar el contraste visual -->
      <div class="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-slate-900/20 backdrop-blur-[1px]"></div>
      
      <!-- Contenido opcional sobre la imagen -->
      <div class="absolute bottom-12 left-12 right-12 z-10 text-white space-y-2">
        <h2 class="text-3xl font-black tracking-tight">EcoRuta BAQ</h2>
        <p class="text-sm text-emerald-100/90 font-medium max-w-md">
          Conecta con los puntos de recolección autorizados y transforma tus residuos en beneficios para ti y para Barranquilla.
        </p>
      </div>
    </div>
    <!-- LADO DERECHO: FORMULARIO DE LOGIN -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
          <div class="max-w-md w-full space-y-8">

            <!-- ENCABEZADO DEL FORMULARIO CON TU LOGO -->
            <div class="text-center lg:text-left space-y-2">
              <div class="inline-flex lg:flex items-center justify-center lg:justify-start gap-2">
                
                <img src="./src/assets/IconoEcoruta.png" alt="EcoRuta BAQ Logo" class="w-30 h-30 object-contain shrink-0">
                <span class="text-2xl font-black text-green-800 tracking-tight">EcoRuta BAQ</span>
              </div>
              <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight pt-2">Ingresar a tu cuenta</h1>
              <p class="text-sm text-slate-500">Digita tus credenciales para acceder a tu panel de reciclaje.</p>
            </div>

        <!-- FORMULARIO -->
        <form id="loginForm" class="space-y-5">
          <div>
            <label for="loginEmail" class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Correo Electrónico</label>
            <input id="loginEmail" type="email" required 
                   class="mt-1.5 w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all placeholder:text-slate-400" 
                   placeholder="ejemplo@correo.com">
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="loginPassword" class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Contraseña</label>
            </div>
            <input id="loginPassword" type="password" required 
                   class="mt-1.5 w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all placeholder:text-slate-400" 
                   placeholder="••••••••••••">
          </div>

          <button type="submit" 
                  class="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl text-sm shadow-sm transition-all transform active:scale-98 cursor-pointer mt-2">
            Iniciar Sesión
          </button>
        </form>

        <!-- ENLACE DE REGISTRO / NAVEGACIÓN -->
        <div class="text-center lg:text-left border-t border-slate-100 pt-6">
          <p class="text-xs text-slate-500">
            ¿No tienes una cuenta aún? 
            <a href="#/register" class="text-green-700 font-bold hover:underline transition-all">Regístrate aquí</a>
          </p>
        </div>

      </div>
    </div>

  </div>
  `;
}

export function initLogin() {
  const form = document.getElementById("loginForm");
  
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    // Aquí va tu lógica actual de autenticación con localStorage
    // ...
  });
}
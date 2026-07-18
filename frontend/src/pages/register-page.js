

export function registerPage() {
  return `
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <a href="#/" class="text-3xl font-extrabold text-green-700"> EcoRuta BAQ</a>
      <h2 class="mt-6 text-3xl font-extrabold text-slate-900">Crea tu cuenta</h2>
      <p class="mt-2 text-sm text-slate-600">
        ¿Ya tienes cuenta?
        <a href="#/login" class="font-medium text-green-600 hover:text-green-500">Inicia sesión aquí</a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-md sm:rounded-2xl sm:px-10 border border-slate-100">
        
        <div id="registerError" class="hidden mb-4 p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-100"></div>

        <form id="registerForm" class="space-y-5" novalidate>
          <div>
            <label for="regName" class="block text-sm font-medium text-slate-700">Nombre Completo <span class="text-red-500">*</span></label>
            <input id="regName" name="name" type="text" placeholder="Ej. Paco Osuna" required 
              class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 text-sm">
          </div>

          <div>
            <label for="regEmail" class="block text-sm font-medium text-slate-700">Correo Electrónico <span class="text-red-500">*</span></label>
            <input id="regEmail" name="email" type="email" placeholder="correo@ejemplo.com" required 
              class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 text-sm">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="regPassword" class="block text-sm font-medium text-slate-700">Contraseña <span class="text-red-500">*</span></label>
              <input id="regPassword" name="password" type="password" placeholder="Mínimo 8 caracteres" required minlength="6"
                class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 text-sm">
            </div>
            
            <div>
              <label for="regConfirmPassword" class="block text-sm font-medium text-slate-700">Confirmar Contraseña <span class="text-red-500">*</span></label>
              <input id="regConfirmPassword" name="confirmPassword" type="password" placeholder="Repite tu contraseña" required
                class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 text-sm">
            </div>
          </div>

          <div>
            <span class="block text-sm font-medium text-slate-700 mb-2">Selecciona tu Rol <span class="text-red-500">*</span></span>
            
            <input type="hidden" id="regRole" name="role" value="">

            <div class="grid grid-cols-2 gap-4">
              <div id="roleCardUser" class="cursor-pointer border-2 border-slate-200 rounded-2xl p-4 text-center transition-all duration-200 hover:border-green-500 bg-white shadow-sm flex flex-col items-center justify-center gap-2">
                <span class="text-3xl">♻️</span>
                <span class="font-bold text-sm text-slate-800">Reciclador</span>
                <span class="text-[10px] text-slate-500 leading-tight">Registra tus entregas y gana puntos</span>
              </div>

              <div id="roleCardAdmin" class="cursor-pointer border-2 border-slate-200 rounded-2xl p-4 text-center transition-all duration-200 hover:border-blue-500 bg-white shadow-sm flex flex-col items-center justify-center gap-2">
                <span class="text-3xl">💼</span>
                <span class="font-bold text-sm text-slate-800">Administrador</span>
                <span class="text-[10px] text-slate-500 leading-tight">Gestiona acopios, entregas y usuarios</span>
              </div>
            </div>
          </div>

          <button type="submit" id="registerSubmitBtn" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-all duration-300 cursor-not-allowed" disabled>
            Selecciona un rol para continuar
          </button>
        </form>
      </div>
    </div>
  </div>
  `;
}
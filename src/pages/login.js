export function loginPage() {
  return `

  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div class="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

          <div class="text-center mb-8">

              <h1 class="text-4xl font-bold text-green-700">
                  🌱 EcoRuta BAQ
              </h1>

              <p class="text-gray-500 text-2xl mt-2">
                  Bienvenido
              </p>

          </div>

          <form class="space-y-5">

              <div>

                  <label class="block mb-2 font-medium">
                      Correo electrónico
                  </label>

                  <input
                      type="email"
                      placeholder="ejemplo@mail.com"
                      class="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600"
                  >

              </div>

              <div>

                  <label class="block mb-2 font-medium">
                      Contraseña
                  </label>

                  <input
                      type="password"
                      placeholder="********"
                      class="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600"
                  >

              </div>

              <button
                  type="submit"
                  class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
              >

                  Iniciar sesión

              </button>

          </form>

          <div class="text-center mt-6">

              <p class="text-gray-500">

                  ¿No tienes cuenta?

                  <a
                      href="#"
                      class="text-green-700 font-semibold"
                  >

                      Crear cuenta

                  </a>

              </p>

          </div>

      </div>

  </div>

`;
}
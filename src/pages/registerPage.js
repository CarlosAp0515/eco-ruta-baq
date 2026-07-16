export function registerPage() {
  return `

<div class="min-h-screen bg-slate-100 flex items-center justify-center p-6">

  <div class="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

      <div class="text-center mb-8">

          <h1 class="text-4xl font-bold text-green-700">
              🌱 EcoRuta BAQ
          </h1>

          <p class="text-gray-500 mt-2">
              Crea tu cuenta
          </p>

      </div>


      <form id="registerForm" class="space-y-5">


          <div>

              <label class="block mb-2 font-medium">
                  Nombre completo
              </label>

              <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Juanito Pérez"
                  class="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600"
              >

          </div>


          <div>

              <label class="block mb-2 font-medium">
                  Correo electrónico
              </label>

              <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  class="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600"
              >

          </div>


          <div>

              <label class="block mb-2 font-medium">
                  Contraseña
              </label>

              <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  class="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600"
              >

          </div>


          <div>

              <label class="block mb-2 font-medium">
                  Confirmar contraseña
              </label>

              <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  class="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600"
              >

          </div>


          <div>

              <label class="block mb-2 font-medium">
                  Localidad
              </label>

              <select
                  id="location"
                  name="location"
                  class="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600"
              >

                  <option value="">
                      Seleccione una localidad
                  </option>

                  <option value="Norte">
                      Norte - Centro Histórico
                  </option>

                  <option value="Riomar">
                      Riomar
                  </option>

                  <option value="Metropolitana">
                      Metropolitana
                  </option>

                  <option value="SurOccidente">
                      Sur Occidente
                  </option>

                  <option value="SurOriente">
                      Sur Oriente
                  </option>

              </select>

          </div>


          <button
              type="submit"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
          >

              Registrarme

          </button>


      </form>


      <div class="text-center mt-6">

          <p class="text-gray-500">

              ¿Ya tienes una cuenta?

              <a href="#" class="text-green-700 font-semibold">

                  Inicia sesión

              </a>

          </p>

      </div>


  </div>

</div>

`;
}
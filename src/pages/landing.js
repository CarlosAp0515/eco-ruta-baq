export function landingPage() {
  return `

  <div class="bg-white min-h-screen">

    <!-- NAVBAR -->

    <nav class="fixed top-0 w-full bg-white shadow-md z-50">

      <div class="max-w-7xl mx-auto px-6">

        <div class="flex justify-between items-center h-20">

          <h1 class="text-3xl font-bold text-green-700">
            🌱 EcoRuta BAQ
          </h1>

          <ul class="hidden md:flex gap-8 font-medium">

            <li><a href="#inicio" class="hover:text-green-700">Inicio</a></li>
            <li><a href="#problema" class="hover:text-green-700">Problema</a></li>
            <li><a href="#funciona" class="hover:text-green-700">Cómo funciona</a></li>
            <li><a href="#guia" class="hover:text-green-700">Guía</a></li>
            <li><a href="#mapa" class="hover:text-green-700">Mapa</a></li>

          </ul>

        </div>

      </div>

    </nav>

    <!-- HERO -->

    <section
      id="inicio"
      class="
      min-h-screen
      bg-gradient-to-br
      from-green-50
      to-green-100
      flex
      items-center
      "
    >

      <div
        class="
        max-w-7xl
        mx-auto
        px-6
        grid
        md:grid-cols-2
        gap-12
        items-center
        "
      >

        <div>

          <span
            class="
            bg-green-200
            text-green-800
            px-4
            py-2
            rounded-full
            font-semibold
            "
          >
            ♻️ Barranquilla sostenible
          </span>

          <h1
            class="
            text-5xl
            md:text-7xl
            font-extrabold
            text-slate-800
            mt-6
            leading-tight
            "
          >
            Aprende dónde y cómo reciclar correctamente en Barranquilla
          </h1>

          <p
            class="
            text-lg
            text-slate-600
            mt-6
            max-w-xl
            "
          >
            Consulta guías de disposición de residuos,
            encuentra puntos de recolección cercanos
            y contribuye a una ciudad más sostenible.
          </p>

          <div class="flex gap-4 mt-8">

            <button
              class="
              bg-green-700
              hover:bg-green-800
              text-white
              px-8
              py-4
              rounded-xl
              font-semibold
              transition
              "
            >
              Explorar rutas
            </button>

          </div>

        </div>

        <div class="flex justify-center">

          <div
            class="
            w-80
            h-80
            md:w-96
            md:h-96
            rounded-full
            bg-green-300
            flex
            items-center
            justify-center
            text-8xl
            shadow-2xl
            "
          >
            ♻️
          </div>

        </div>

      </div>

    </section>

    <!-- PROBLEMA -->

    <section
      id="problema"
      class="py-24 bg-white"
    >

      <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-16">

          <h2
            class="
            text-4xl
            md:text-5xl
            font-bold
            text-slate-800
            "
          >
            ¿Por qué existe EcoRuta BAQ?
          </h2>

          <p
            class="
            mt-4
            text-slate-600
            max-w-2xl
            mx-auto
            "
          >
            Miles de ciudadanos desconocen cómo clasificar
            residuos especiales y dónde llevarlos para una
            disposición adecuada.
          </p>

        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div class="bg-red-50 p-6 rounded-2xl shadow">
            <div class="text-4xl mb-4">🔋</div>
            <h3 class="font-bold mb-2">Pilas</h3>
            <p class="text-slate-600">
              Muchas terminan en la basura común.
            </p>
          </div>

          <div class="bg-red-50 p-6 rounded-2xl shadow">
            <div class="text-4xl mb-4">💻</div>
            <h3 class="font-bold mb-2">Electrónicos</h3>
            <p class="text-slate-600">
              Requieren disposición especializada.
            </p>
          </div>

          <div class="bg-red-50 p-6 rounded-2xl shadow">
            <div class="text-4xl mb-4">🛢️</div>
            <h3 class="font-bold mb-2">Aceite usado</h3>
            <p class="text-slate-600">
              Puede contaminar miles de litros de agua.
            </p>
          </div>

          <div class="bg-red-50 p-6 rounded-2xl shadow">
            <div class="text-4xl mb-4">❓</div>
            <h3 class="font-bold mb-2">Desinformación</h3>
            <p class="text-slate-600">
              No existe una guía centralizada.
            </p>
          </div>

        </div>

      </div>

    </section>

    <!-- COMO FUNCIONA -->

    <section
      id="funciona"
      class="py-24 bg-green-50"
    >

      <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-16">

          <h2
            class="
            text-4xl
            md:text-5xl
            font-bold
            text-slate-800
            "
          >
            ¿Cómo funciona?
          </h2>

        </div>

        <div class="grid md:grid-cols-3 gap-8">

          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">

            <div class="text-6xl mb-4">🗂️</div>

            <h3 class="text-xl font-bold mb-3">
              Identifica tu residuo
            </h3>

            <p class="text-slate-600">
              Selecciona el tipo de residuo que deseas desechar.
            </p>

          </div>

          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">

            <div class="text-6xl mb-4">📚</div>

            <h3 class="text-xl font-bold mb-3">
              Consulta la guía
            </h3>

            <p class="text-slate-600">
              Aprende cómo almacenarlo y transportarlo correctamente.
            </p>

          </div>

          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">

            <div class="text-6xl mb-4">📍</div>

            <h3 class="text-xl font-bold mb-3">
              Encuentra una ruta cercana
            </h3>

            <p class="text-slate-600">
              Ubica puntos autorizados para entregar tus residuos.
            </p>

          </div>

        </div>

      </div>

    </section>

    <!-- GUIA -->

    <section id="guia" class="py-24 bg-white">

      <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-16">

          <h2 class="text-4xl md:text-5xl font-bold text-slate-800">
            Guía de disposición de residuos
          </h2>

          <p class="mt-4 text-slate-600">
            Aprende cómo manejar correctamente cada residuo.
          </p>

        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div class="bg-green-50 p-6 rounded-2xl shadow">
            <div class="text-5xl mb-4">🔋</div>
            <h3 class="font-bold mb-2">Pilas</h3>
            <p class="text-slate-600">
              No deben mezclarse con residuos comunes.
            </p>
          </div>

          <div class="bg-green-50 p-6 rounded-2xl shadow">
            <div class="text-5xl mb-4">💻</div>
            <h3 class="font-bold mb-2">Electrónicos</h3>
            <p class="text-slate-600">
              Deben entregarse en puntos RAEE.
            </p>
          </div>

          <div class="bg-green-50 p-6 rounded-2xl shadow">
            <div class="text-5xl mb-4">🛢️</div>
            <h3 class="font-bold mb-2">Aceite usado</h3>
            <p class="text-slate-600">
              Nunca debe desecharse en el desagüe.
            </p>
          </div>

          <div class="bg-green-50 p-6 rounded-2xl shadow">
            <div class="text-5xl mb-4">💊</div>
            <h3 class="font-bold mb-2">Medicamentos</h3>
            <p class="text-slate-600">
              Deben llevarse a puntos especializados.
            </p>
          </div>

        </div>

      </div>

    </section>

    <!-- MAPA -->

    <section
      id="mapa"
      class="py-24 bg-green-50"
    >

      <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-16">

          <h2
            class="
            text-4xl
            md:text-5xl
            font-bold
            text-slate-800
            "
          >
            Ruta de recolección más cercana
          </h2>

          <p
            class="
            mt-4
            text-slate-600
            "
          >
            Encuentra rápidamente el punto autorizado más cercano.
          </p>

        </div>

        <div
          class="
          bg-white
          rounded-3xl
          shadow-xl
          overflow-hidden
          "
        >

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62667.499226517815!2d-74.85926039728835!3d10.984592317685653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d44d12ae605%3A0x2633844581b917b2!2sBarranquilla%2C%20Atl%C3%A1ntico!5e0!3m2!1ses-419!2sco!4v1782356964442!5m2!1ses-419!2sco"
            width="100%"
            height="500"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          >
          </iframe>

        </div>

      </div>

    </section>

    <!-- IMPACTO -->

    <section class="py-24 bg-white">

      <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-16">

          <h2 class="text-4xl md:text-5xl font-bold text-slate-800">
            Nuestro impacto ambiental
          </h2>

        </div>

        <div class="grid md:grid-cols-4 gap-8">

          <div class="bg-green-50 p-8 rounded-2xl text-center shadow">
            <h3 class="text-5xl font-bold text-green-700">1200</h3>
            <p class="mt-4 text-slate-600">Usuarios</p>
          </div>

          <div class="bg-green-50 p-8 rounded-2xl text-center shadow">
            <h3 class="text-5xl font-bold text-green-700">4800kg</h3>
            <p class="mt-4 text-slate-600">Reciclados</p>
          </div>

          <div class="bg-green-50 p-8 rounded-2xl text-center shadow">
            <h3 class="text-5xl font-bold text-green-700">35</h3>
            <p class="mt-4 text-slate-600">Puntos ecológicos</p>
          </div>

          <div class="bg-green-50 p-8 rounded-2xl text-center shadow">
            <h3 class="text-5xl font-bold text-green-700">820</h3>
            <p class="mt-4 text-slate-600">Entregas</p>
          </div>

        </div>

      </div>

    </section>

    <!-- FOOTER -->

    <footer class="bg-slate-900 text-white py-12">

      <div class="max-w-7xl mx-auto px-6 text-center">

        <h3 class="text-2xl font-bold mb-4">
          🌱 EcoRuta BAQ
        </h3>

        <p class="text-slate-300">
          Plataforma educativa para la correcta disposición
          de residuos y localización de rutas de recolección
          en Barranquilla.
        </p>

        <p class="mt-6 text-slate-400 text-sm">
          EcoRuta BAQ  2026.
        </p>

      </div>

    </footer>

  </div>

  `;
}

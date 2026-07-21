export function guidePage() {
    return `
    <div class="min-h-screen bg-slate-50 flex flex-col font-sans">

        <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <a href="#/" class="text-2xl font-bold text-green-700 flex items-center gap-2"> EcoRuta BAQ</a>
                <div class="flex items-center gap-4">
                    <a href="#/" class="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Inicio</a>
                    <a href="#/guia" class="text-sm font-semibold text-green-700 border-b-2 border-green-700 pb-1">Guia de Reciclaje</a>
                    <a href="#/login" class="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Iniciar Sesion</a>
                    <a href="#/register" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all">Registrarse</a>
                </div>
            </div>
        </nav>

        <header class="bg-gradient-to-br from-green-700 via-green-800 to-emerald-500 text-white py-16 px-6">
            <div class="max-w-4xl mx-auto text-center space-y-4">
                <span class="bg-white/20 text-white font-bold uppercase text-xs tracking-wider px-3.5 py-1.5 rounded-full">Aprende a Reciclar</span>
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">Guia Completa de Reciclaje</h1>
                <p class="text-green-100 text-lg max-w-2xl mx-auto">
                    Aprende a separar y reciclar cada tipo de residuo correctamente. 
                    Pequenas acciones generan un gran impacto en Barranquilla.
                </p>
            </div>
        </header>

        <section class="py-16 px-6 max-w-7xl mx-auto w-full">
            <div class="text-center space-y-3 mb-12">
                <h2 class="text-3xl font-extrabold text-slate-900">Tipos de Residuos</h2>
                <p class="text-slate-500 max-w-xl mx-auto">Selecciona una categoria para aprender a reciclar correctamente.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                    <div class="bg-yellow-50 p-6 flex items-center gap-4 border-b border-yellow-100">
                        <span class="text-4xl">🥤</span>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Plastico</h3>
                            <span class="text-xs font-bold uppercase text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">PET, PEAD, PP</span>
                        </div>
                    </div>
                    <div class="p-6 space-y-3">
                        <div class="flex items-start gap-3">
                            <span class="text-green-600 font-bold mt-0.5">✅</span>
                            <p class="text-sm text-slate-600"><strong>Si se recicla:</strong> Botellas de agua y gaseosa, envases de shampoo, tapas, garrafas, bolsas plasticas limpias.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-red-500 font-bold mt-0.5">❌</span>
                            <p class="text-sm text-slate-600"><strong>No se recicla:</strong> Pañales, icopor, plastico de un solo uso sucio, cepillos de dientes, pitillos.</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-xl space-y-1">
                            <p class="text-xs font-bold text-green-800 uppercase tracking-wider">Como prepararlo</p>
                            <p class="text-sm text-green-900">Enjuaga los envases, quita las tapas y aplastalos para ahorrar espacio. Separa por colores si es posible.</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-xl flex items-center gap-2">
                            <span class="text-lg">💡</span>
                            <p class="text-xs text-blue-800">Una botella de plastico tarda hasta <strong>450 anos</strong> en degradarse. Reciclarla evita que contamine nuestro entorno.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                    <div class="bg-blue-50 p-6 flex items-center gap-4 border-b border-blue-100">
                        <span class="text-4xl">📦</span>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Carton y Papel</h3>
                            <span class="text-xs font-bold uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">Papel, Carton, Periodico</span>
                        </div>
                    </div>
                    <div class="p-6 space-y-3">
                        <div class="flex items-start gap-3">
                            <span class="text-green-600 font-bold mt-0.5">✅</span>
                            <p class="text-sm text-slate-600"><strong>Si se recicla:</strong> Cajas de carton, periodicos, revistas, hojas de papel, cuadernos usados, folletos.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-red-500 font-bold mt-0.5">❌</span>
                            <p class="text-sm text-slate-600"><strong>No se recicla:</strong> Papel encerado, papel higienico usado, servilletas sucias, facturas termicas, papel contac.</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-xl space-y-1">
                            <p class="text-xs font-bold text-green-800 uppercase tracking-wider">Como prepararlo</p>
                            <p class="text-sm text-green-900">Dobla las cajas para que ocupen menos espacio. Retira cintas adhesivas y grapas. Mantenlo seco y limpio.</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-xl flex items-center gap-2">
                            <span class="text-lg">💡</span>
                            <p class="text-xs text-blue-800">Reciclar 1 tonelada de papel salva <strong>17 arboles</strong> y ahorra 26,000 litros de agua.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                    <div class="bg-emerald-50 p-6 flex items-center gap-4 border-b border-emerald-100">
                        <span class="text-4xl">🫙</span>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Vidrio</h3>
                            <span class="text-xs font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Botellas, Frascos</span>
                        </div>
                    </div>
                    <div class="p-6 space-y-3">
                        <div class="flex items-start gap-3">
                            <span class="text-green-600 font-bold mt-0.5">✅</span>
                            <p class="text-sm text-slate-600"><strong>Si se recicla:</strong> Botellas de vidrio, frascos de alimentos y bebidas, envases de vidrio en general.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-red-500 font-bold mt-0.5">❌</span>
                            <p class="text-sm text-slate-600"><strong>No se recicla:</strong> Ceramica, loza, espejos, bombillos, vidrio templado (ventanas), cristal de automovil.</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-xl space-y-1">
                            <p class="text-xs font-bold text-green-800 uppercase tracking-wider">Como prepararlo</p>
                            <p class="text-sm text-green-900">Enjuaga los envases, quita las tapas metalicas o plasticas. No es necesario quitar las etiquetas.</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-xl flex items-center gap-2">
                            <span class="text-lg">💡</span>
                            <p class="text-xs text-blue-800">El vidrio es <strong>100% reciclable</strong> y puede reciclarse infinitas veces sin perder calidad.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                    <div class="bg-orange-50 p-6 flex items-center gap-4 border-b border-orange-100">
                        <span class="text-4xl">🔋</span>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Pilas y Baterias</h3>
                            <span class="text-xs font-bold uppercase text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Residuos Peligrosos</span>
                        </div>
                    </div>
                    <div class="p-6 space-y-3">
                        <div class="flex items-start gap-3">
                            <span class="text-green-600 font-bold mt-0.5">⚠️</span>
                            <p class="text-sm text-slate-600"><strong>Manejo especial:</strong> Pilas AA, AAA, baterias recargables, baterias de celular, pilas de boton.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-red-500 font-bold mt-0.5">❌</span>
                            <p class="text-sm text-slate-600"><strong>Nunca:</strong> Las tires a la basura comun, las quemes, las abras ni las expongas al sol directo.</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-xl space-y-1">
                            <p class="text-xs font-bold text-green-800 uppercase tracking-wider">Como desecharlas</p>
                            <p class="text-sm text-green-900">Cubre los bornes con cinta adhesiva para evitar cortocircuitos. Llevalas a un punto de recoleccion autorizado.</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-xl flex items-center gap-2">
                            <span class="text-lg">💡</span>
                            <p class="text-xs text-blue-800">Una sola pila puede contaminar <strong>600,000 litros de agua</strong>. Nunca las mezcles con residuos ordinarios.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                    <div class="bg-red-50 p-6 flex items-center gap-4 border-b border-red-100">
                        <span class="text-4xl">🖥️</span>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Electronicos (RAEE)</h3>
                            <span class="text-xs font-bold uppercase text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Residuos Electronicos</span>
                        </div>
                    </div>
                    <div class="p-6 space-y-3">
                        <div class="flex items-start gap-3">
                            <span class="text-green-600 font-bold mt-0.5">✅</span>
                            <p class="text-sm text-slate-600"><strong>Si se recicla:</strong> Computadores, celulares, tablets, electrodomesticos, cables, cargadores, impresoras.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-red-500 font-bold mt-0.5">❌</span>
                            <p class="text-sm text-slate-600"><strong>No se recicla:</strong> Bombillos fluorescentes (son manejo especial), electrodomesticos con refrigerante (neveras).</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-xl space-y-1">
                            <p class="text-xs font-bold text-green-800 uppercase tracking-wider">Como prepararlos</p>
                            <p class="text-sm text-green-900">Borra tu informacion personal de los dispositivos. Retira las baterias si es posible. Entrega completos y sin desarmar.</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-xl flex items-center gap-2">
                            <span class="text-lg">💡</span>
                            <p class="text-xs text-blue-800">Los RAEE contienen metales valiosos como oro, plata y cobre que pueden recuperarse mediante reciclaje.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                    <div class="bg-amber-50 p-6 flex items-center gap-4 border-b border-amber-100">
                        <span class="text-4xl">🫒</span>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Aceite Usado</h3>
                            <span class="text-xs font-bold uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Aceite de Cocina</span>
                        </div>
                    </div>
                    <div class="p-6 space-y-3">
                        <div class="flex items-start gap-3">
                            <span class="text-green-600 font-bold mt-0.5">✅</span>
                            <p class="text-sm text-slate-600"><strong>Si se recicla:</strong> Aceite vegetal usado de cocina (frituras, alimentos), aceite de cocina vencido.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-red-500 font-bold mt-0.5">❌</span>
                            <p class="text-sm text-slate-600"><strong>Nunca:</strong> Lo viertas por el desague, lo mezcles con agua, o lo arrojes al suelo. Contamina rios y mares.</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-xl space-y-1">
                            <p class="text-xs font-bold text-green-800 uppercase tracking-wider">Como almacenarlo</p>
                            <p class="text-sm text-green-900">Dejalo enfriar, filtralo con un colador y guardalo en una botella plastica bien cerrada. Llevalo a tu punto de acopio.</p>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-xl flex items-center gap-2">
                            <span class="text-lg">💡</span>
                            <p class="text-xs text-blue-800">1 litro de aceite puede contaminar <strong>1,000 litros de agua</strong>. Reciclarlo permite crear biodiesel.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <section class="py-16 px-6 bg-gradient-to-b from-green-50 to-slate-50">
            <div class="max-w-7xl mx-auto">
                <div class="text-center space-y-3 mb-12">
                    <h2 class="text-3xl font-extrabold text-slate-900">Impacto de tu Reciclaje</h2>
                    <p class="text-slate-500 max-w-xl mx-auto">Cada material que reciclas genera un impacto positivo en el medio ambiente.</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition">
                        <span class="text-4xl">🌳</span>
                        <h4 class="text-2xl font-bold text-green-700 mt-3">17</h4>
                        <p class="text-sm text-slate-600">Arboles salvados por tonelada de papel reciclado</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition">
                        <span class="text-4xl">💡</span>
                        <h4 class="text-2xl font-bold text-green-700 mt-3">60%</h4>
                        <p class="text-sm text-slate-600">Menos energia al producir vidrio reciclado</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition">
                        <span class="text-4xl">🌊</span>
                        <h4 class="text-2xl font-bold text-green-700 mt-3">1,000L</h4>
                        <p class="text-sm text-slate-600">Agua contaminada por 1L de aceite sin reciclar</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition">
                        <span class="text-4xl">♻️</span>
                        <h4 class="text-2xl font-bold text-green-700 mt-3">100%</h4>
                        <p class="text-sm text-slate-600">Del vidrio es reciclable infinitamente</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 px-6 max-w-7xl mx-auto w-full">
            <div class="text-center space-y-3 mb-12">
                <h2 class="text-3xl font-extrabold text-slate-900">Consejos Practicos</h2>
                <p class="text-slate-500 max-w-xl mx-auto">Incorporar el reciclaje en tu dia a dia es mas facil de lo que crees.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                    <span class="text-3xl bg-green-50 w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0">🗑️</span>
                    <div>
                        <h4 class="font-bold text-slate-800">Usa 3 canecas en casa</h4>
                        <p class="text-sm text-slate-600 mt-1">Una para organicos, otra para reciclables (plastico, vidrio, metal, papel) y otra para residuos no aprovechables.</p>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                    <span class="text-3xl bg-blue-50 w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0">🧼</span>
                    <div>
                        <h4 class="font-bold text-slate-800">Limpia antes de reciclar</h4>
                        <p class="text-sm text-slate-600 mt-1">Los envases sucios contaminan lotes enteros de reciclaje. Un rapido enjuague hace la diferencia.</p>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                    <span class="text-3xl bg-orange-50 w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0">📱</span>
                    <div>
                        <h4 class="font-bold text-slate-800">Identifica los simbolos</h4>
                        <p class="text-sm text-slate-600 mt-1">Busca el triangulo de reciclaje en los envases. El numero dentro indica el tipo de plastico (1=PET, 2=PEAD, etc).</p>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                    <span class="text-3xl bg-amber-50 w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0">📦</span>
                    <div>
                        <h4 class="font-bold text-slate-800">Reduce y Reusa primero</h4>
                        <p class="text-sm text-slate-600 mt-1">Antes de reciclar, preguntate si puedes reducir su consumo o darle un segundo uso al objeto.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 px-6 text-center bg-green-900 text-white">
            <div class="max-w-3xl mx-auto space-y-6">
                <h2 class="text-3xl font-extrabold">Comienza a Reciclar Hoy</h2>
                <p class="text-green-100 text-lg">
                    Registra tus entregas de reciclaje, acumula puntos y canjealos por recompensas. 
                    Juntos hacemos de Barranquilla una ciudad mas sostenible.
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
                <span>© 2026 EcoRuta BAQ. Proyecto academico para Riwi.</span>
                <div class="flex gap-4">
                    <a href="#/" class="hover:text-white transition-colors cursor-pointer">Inicio</a>
                    <a href="#/guia" class="hover:text-white transition-colors cursor-pointer">Guia de Reciclaje</a>
                </div>
            </div>
        </footer>

    </div>
    `;
}

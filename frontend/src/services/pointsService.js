// src/services/pointsService.js

const POINTS_CONFIG = {
    "Plástico": 20,
    "Cartón y Papel": 15,
    "Vidrio": 10,
    "Pilas / Baterías": 50,
    "Electrónicos (RAEE)": 120,
    "Aceite Usado": 80
};

let userDeliveriesKey = "";
let deliveries = [];

export function initPointsDashboard() {
    // ---- 1. IDENTIFICAR AL USUARIO ACTIVO ----
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    const userNameDisplay = document.getElementById("userNameDisplay");

    if (currentUser) {
        userNameDisplay.textContent = `Hola, ${currentUser.name}`;
        // Clave única por usuario para que no se mezclen las entregas
        userDeliveriesKey = `eco_deliveries_${currentUser.email}`;
    } else {
        userNameDisplay.textContent = "Hola, Coder";
        userDeliveriesKey = "eco_deliveries_guest";
    }

    // ---- 2. CARGAR ENTREGAS DE ESTE USUARIO ESPECÍFICO (Nuevos empiezan en blanco []) ----
    deliveries = JSON.parse(localStorage.getItem(userDeliveriesKey)) || [];

    // ---- 3. CERRAR SESIÓN ----
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.onclick = () => {
            localStorage.removeItem("current_user");
            window.location.hash = "#/";
        };
    }

    // ---- 4. RENDERIZAR INTERFAZ ----
    renderDashboardData();

    // ---- 5. CONTROLADORES DEL MODAL (REGISTRAR/EDITAR) ----
    const modal = document.getElementById("deliveryModal");
    const btnOpenModal = document.getElementById("btnOpenModal");
    const btnCloseModal = document.getElementById("btnCloseModal");
    const deliveryForm = document.getElementById("deliveryForm");
    const modalTitle = document.getElementById("modalTitle");
    const editIndexInput = document.getElementById("editIndex");

    if (btnOpenModal) {
        btnOpenModal.onclick = () => {
            modalTitle.textContent = "♻️ Registrar Nueva Entrega";
            editIndexInput.value = ""; // Vacío significa "Crear"
            deliveryForm.reset();
            modal.classList.remove("hidden");
        };
    }

    if (btnCloseModal) {
        btnCloseModal.onclick = () => modal.classList.add("hidden");
    }

    // ---- 6. FORMULARIO GUARDAR / ACTUALIZAR (CREATE & UPDATE) ----
    if (deliveryForm) {
        deliveryForm.onsubmit = (e) => {
            e.preventDefault();

            const category = document.getElementById("deliveryCategory").value;
            const quantityVal = parseFloat(document.getElementById("deliveryQuantity").value);
            const unit = document.getElementById("deliveryUnit").value;
            const editIndex = editIndexInput.value;

            const factor = POINTS_CONFIG[category] || 10;
            const pointsObtained = quantityVal * factor;

            const deliveryData = {
                date: new Date().toISOString().split('T')[0],
                category,
                quantity: `${quantityVal} ${unit}`,
                points: pointsObtained
            };

            if (editIndex === "") {
                // ACCIÓN: CREAR (CREATE)
                deliveries.unshift(deliveryData);
                alert(`✅ ¡Entrega registrada! Sumaste +${pointsObtained} puntos.`);
            } else {
                // ACCIÓN: EDITAR (UPDATE)
                deliveries[parseInt(editIndex)] = deliveryData;
                alert("✏️ ¡Entrega actualizada correctamente!");
            }

            localStorage.setItem(userDeliveriesKey, JSON.stringify(deliveries));
            renderDashboardData();
            modal.classList.add("hidden");
            deliveryForm.reset();
        };
    }

    // ---- 7. CONFIGURAR EL MAPA EN BARRANQUILLA (SIMULADO)
    initSimulatedMap();

    // ---- 8. REDIMIR BONOS ----
    setupRedemptionHandlers();
}

// ---- FUNCIÓN DE RENDERIZACIÓN (READ) ----
function renderDashboardData() {
    const tableBody = document.getElementById("historyTableBody");
    const totalPointsDisplay = document.getElementById("totalPointsDisplay");
    const totalWeightDisplay = document.getElementById("totalWeightDisplay");

    if (!tableBody) return;

    let accumulatedPoints = 0;
    let totalKilos = 0;
    tableBody.innerHTML = "";

    deliveries.forEach((delivery, index) => {
        accumulatedPoints += delivery.points;

        if (delivery.quantity.includes("Kg")) {
            totalKilos += parseFloat(delivery.quantity);
        }

        let badgeColor = "bg-emerald-50 text-emerald-700";
        if (delivery.category === "Plástico") badgeColor = "bg-yellow-50 text-yellow-700";
        if (delivery.category === "Cartón y Papel") badgeColor = "bg-blue-50 text-blue-700";
        if (delivery.category === "Aceite Usado") badgeColor = "bg-amber-50 text-amber-700";

        const row = `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="py-4 font-medium text-slate-800">${delivery.date}</td>
                <td class="py-4">
                    <span class="${badgeColor} px-3 py-1 rounded-full font-semibold text-xs tracking-wide">
                        ${delivery.category}
                    </span>
                </td>
                <td class="py-4 font-medium text-slate-600">${delivery.quantity}</td>
                <td class="py-4 font-bold text-green-700">${delivery.points > 0 ? '+' : ''}${delivery.points} pts</td>
                <td class="py-4 text-center flex justify-center gap-2">
                    <!-- Botón Editar: Azul Eléctrico con texto blanco -->
                    <button class="btn-edit text-white hover:bg-blue-700 font-bold text-xs bg-blue-600 px-3 py-1.5 rounded-lg transition-colors shadow-sm" data-index="${index}">
                        Editar
                    </button>
                    <!-- Botón Eliminar: Rojo Puro con texto blanco -->
                    <button class="btn-delete text-white hover:bg-red-700 font-bold text-xs bg-red-600 px-3 py-1.5 rounded-lg transition-colors shadow-sm" data-index="${index}">
                        Borrar
                    </button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });

    totalPointsDisplay.textContent = `${accumulatedPoints} pts`;
    totalWeightDisplay.textContent = `${totalKilos} Kg`;

    // AGREGAR EVENTOS DINÁMICOS A LOS BOTONES DE EDITAR Y BORRAR
    document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.onclick = (e) => {
            const index = e.target.getAttribute("data-index");
            openEditModal(index);
        };
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.onclick = (e) => {
            const index = e.target.getAttribute("data-index");
            deleteDelivery(index);
        };
    });
}

// ---- FUNCIÓN EDITAR (UPDATE - ABRIR MODAL) ----
function openEditModal(index) {
    const modal = document.getElementById("deliveryModal");
    const modalTitle = document.getElementById("modalTitle");
    const editIndexInput = document.getElementById("editIndex");
    const categorySelect = document.getElementById("deliveryCategory");
    const quantityInput = document.getElementById("deliveryQuantity");
    const unitSelect = document.getElementById("deliveryUnit");

    const delivery = deliveries[index];

    modalTitle.textContent = "✏️ Editar Entrega";
    editIndexInput.value = index; // Guardamos el index para saber cuál editar al enviar
    categorySelect.value = delivery.category;
    
    const qtyParts = delivery.quantity.split(" ");
    quantityInput.value = parseFloat(qtyParts[0]);
    unitSelect.value = qtyParts[1];

    modal.classList.remove("hidden");
}

// ---- FUNCIÓN BORRAR (DELETE) ----
function deleteDelivery(index) {
    if (confirm("⚠️ ¿Estás seguro de que quieres eliminar este registro? Se recalcularán tus puntos.")) {
        deliveries.splice(index, 1);
        localStorage.setItem(userDeliveriesKey, JSON.stringify(deliveries));
        renderDashboardData();
    }
}

// ---- 📍 MAPA EN BARRANQUILLA USANDO LEAFLET.JS ----
// ---- 📍 MAPA EN BARRANQUILLA USANDO LEAFLET.JS (DASHBOARD) ----
function initSimulatedMap() {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    // Importamos Leaflet de forma dinámica desde su CDN
    import("https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js")
        .then((L) => {
            // Coordenadas centrales de Barranquilla
            const barranquillaCoords = [10.9878, -74.8000];
            
            // Inicializar el mapa con un zoom un poco más amplio para ver todas las localidades
            const map = L.map('map').setView(barranquillaCoords, 12);

            // Cargar capa de mapa de OpenStreetMap (estilo limpio y moderno)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Puntos de recolección en cada una de las 5 localidades de Barranquilla
            const locations = [
                { 
                    localidad: "Riomar",
                    name: "Centro de Acopio Buenavista", 
                    coords: [11.0142, -74.8115],
                    desc: "Recibe: Plásticos (PET/PEAD), Vidrio y Cartón."
                },
                { 
                    localidad: "Norte-Centro Histórico",
                    name: "Punto Verde Parque Venezuela", 
                    coords: [11.0068, -74.8150],
                    desc: "Recibe: Pilas, Baterías, Aceite de Cocina y RAEE."
                },
                { 
                    localidad: "Suroeste",
                    name: "EcoPunto Parque Sagrado Corazón", 
                    coords: [10.9855, -74.7888],
                    desc: "Recibe: Cartón, Papel de archivo y Plásticos."
                },
                { 
                    localidad: "Suroriente",
                    name: "Estación de Reciclaje Simón Bolívar", 
                    coords: [10.9520, -74.7750],
                    desc: "Recibe: Envases metálicos, Aluminio y Vidrio."
                },
                { 
                    localidad: "Metropolitana",
                    name: "EcoPunto Metropolitano", 
                    coords: [10.9380, -74.8020],
                    desc: "Recibe: Todo tipo de materiales aprovechables."
                }
            ];

            // Renderizar los marcadores en el mapa
            locations.forEach(loc => {
                L.marker(loc.coords)
                    .addTo(map)
                    .bindPopup(`
                        <div class="p-1">
                            <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full">${loc.localidad}</span>
                            <h4 class="text-sm font-bold text-slate-800 mt-1.5">${loc.name}</h4>
                            <p class="text-xs text-slate-600 mt-1">${loc.desc}</p>
                            <p class="text-[11px] text-green-600 font-semibold mt-2">📍 ¡Trae tus residuos aquí!</p>
                        </div>
                    `);
            });
        })
        .catch(err => console.error("No se pudo cargar el mapa interactivo:", err));
}

// ---- CANJEO ----
function setupRedemptionHandlers() {
    const btn10 = document.getElementById("btnRedeem10");
    const btn20 = document.getElementById("btnRedeem20");

    const handleRedeem = (requiredPoints, rewardName) => {
        let totalPoints = deliveries.reduce((acc, d) => acc + d.points, 0);

        if (totalPoints >= requiredPoints) {
            const penaltyDelivery = {
                date: new Date().toISOString().split('T')[0],
                category: "Canje de Bono",
                quantity: rewardName,
                points: -requiredPoints
            };
            deliveries.unshift(penaltyDelivery);
            localStorage.setItem(userDeliveriesKey, JSON.stringify(deliveries));
            
            renderDashboardData();
            alert(`🎉 ¡Bono de ${rewardName} canjeado con éxito!`);
        } else {
            alert(`❌ Puntos insuficientes. Requiere ${requiredPoints} pts.`);
        }
    };

    if (btn10) btn10.onclick = () => handleRedeem(500, "10% Alkosto");
    if (btn20) btn20.onclick = () => handleRedeem(1000, "20% Alkosto");
}   
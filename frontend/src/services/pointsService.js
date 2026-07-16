// calculo los puntos de forma dinámica basándose en una matriz de categorías de residuos, calcula el total del mes y maneja la redención del bono.

// src/services/pointsService.js

const POINTS_CONFIG = {
    "Plástico": 20,           // 20 puntos por Kg
    "Cartón y Papel": 15,     // 15 puntos por Kg
    "Vidrio": 10,             // 10 puntos por Kg
    "Pilas / Baterías": 50,   // 50 puntos por lote/unidad
    "Electrónicos (RAEE)": 120,
    "Aceite Usado": 80        // 80 puntos por litro
};

// Cargar entregas iniciales de localStorage o usar datos por defecto
let deliveries = JSON.parse(localStorage.getItem("eco_deliveries")) || [
    { date: "2026-07-01", category: "Cartón y Papel", quantity: "12 Kg", points: 180 },
    { date: "2026-07-05", category: "Plástico", quantity: "5 Kg", points: 100 },
    { date: "2026-07-10", category: "Aceite Usado", quantity: "2 Litros", points: 160 }
];

export function initPointsDashboard() {
    // ---- 1. SALUDAR AL USUARIO LOGUEADO ----
    const userNameDisplay = document.getElementById("userNameDisplay");
    const currentUser = JSON.parse(localStorage.getItem("current_user"));

    if (currentUser && userNameDisplay) {
        userNameDisplay.textContent = `Hola, ${currentUser.name}`;
    } else if (userNameDisplay) {
        userNameDisplay.textContent = "Hola, Coder";
    }

    // ---- 2. MANEJAR CIERRE DE SESIÓN ----
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("current_user"); // Limpia la sesión actual
            window.location.hash = "#/"; // Redirige a la landing
        });
    }

    // ---- 3. RENDERIZAR TABLA Y TOTALES ----
    renderDashboardData();

    // ---- 4. CONTROLADORES DEL MODAL ----
    const modal = document.getElementById("deliveryModal");
    const btnOpenModal = document.getElementById("btnOpenModal");
    const btnCloseModal = document.getElementById("btnCloseModal");
    const deliveryForm = document.getElementById("deliveryForm");

    if (btnOpenModal && modal) {
        btnOpenModal.addEventListener("click", () => modal.classList.remove("hidden"));
    }
    if (btnCloseModal && modal) {
        btnCloseModal.addEventListener("click", () => modal.classList.add("hidden"));
    }

    // ---- 5. FORMULARIO REGISTRAR ENTREGA ----
    if (deliveryForm) {
        deliveryForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const category = document.getElementById("deliveryCategory").value;
            const quantityVal = parseFloat(document.getElementById("deliveryQuantity").value);
            const unit = document.getElementById("deliveryUnit").value;

            // Calcular puntos dinámicamente según la regla de negocio
            const factor = POINTS_CONFIG[category] || 10;
            const pointsObtained = quantityVal * factor;

            const newDelivery = {
                date: new Date().toISOString().split('T')[0], // Fecha de hoy (YYYY-MM-DD)
                category,
                quantity: `${quantityVal} ${unit}`,
                points: pointsObtained
            };

            // Añadir a la lista local y guardar en el navegador
            deliveries.unshift(newDelivery); // Lo pone de primero en la lista
            localStorage.setItem("eco_deliveries", JSON.stringify(deliveries));

            // Actualizar interfaz, cerrar modal y limpiar formulario
            renderDashboardData();
            modal.classList.add("hidden");
            deliveryForm.reset();

            alert(`✅ ¡Entrega registrada! Sumaste +${pointsObtained} puntos.`);
        });
    }

    // ---- 6. CONTROLADORES DE CANJEO ----
    setupRedemptionHandlers();
}

// Función auxiliar para renderizar los datos
function renderDashboardData() {
    const tableBody = document.getElementById("historyTableBody");
    const totalPointsDisplay = document.getElementById("totalPointsDisplay");
    const totalWeightDisplay = document.getElementById("totalWeightDisplay");

    if (!tableBody) return;

    let accumulatedPoints = 0;
    let totalKilos = 0;
    tableBody.innerHTML = "";

    deliveries.forEach(delivery => {
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
                <td class="py-4 font-bold text-green-700">+${delivery.points} pts</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });

    totalPointsDisplay.textContent = `${accumulatedPoints} pts`;
    totalWeightDisplay.textContent = `${totalKilos} Kg`;
}

// Función auxiliar para configurar los botones de redimir bonos
function setupRedemptionHandlers() {
    const btn10 = document.getElementById("btnRedeem10");
    const btn20 = document.getElementById("btnRedeem20");

    // Función genérica para restar puntos al redimir
    const handleRedeem = (requiredPoints, rewardName) => {
        let totalPoints = deliveries.reduce((acc, d) => acc + d.points, 0);

        if (totalPoints >= requiredPoints) {
            // Para simular la resta de puntos, insertamos una entrega "negativa" de canje
            const penaltyDelivery = {
                date: new Date().toISOString().split('T')[0],
                category: "Canje de Bono",
                quantity: rewardName,
                points: -requiredPoints
            };
            deliveries.unshift(penaltyDelivery);
            localStorage.setItem("eco_deliveries", JSON.stringify(deliveries));
            
            renderDashboardData();
            alert(`🎉 ¡Bono del ${rewardName} redimido con éxito!`);
        } else {
            alert(`❌ Puntos insuficientes. Requiere ${requiredPoints} pts.`);
        }
    };

    if (btn10) btn10.onclick = () => handleRedeem(500, "10% Alkosto");
    if (btn20) btn20.onclick = () => handleRedeem(1000, "20% Alkosto");
}
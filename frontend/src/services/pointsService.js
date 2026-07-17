// src/services/pointsService.js
import { apiFetch, getCurrentUser, clearSession } from "./api.js";

let reports = [];

export async function initPointsDashboard() {
    // ---- 1. IDENTIFICAR AL USUARIO ACTIVO ----
    const currentUser = getCurrentUser();
    const userNameDisplay = document.getElementById("userNameDisplay");

    if (currentUser) {
        userNameDisplay.textContent = `Hola, ${currentUser.name}`;
    }

    // ---- 2. CERRAR SESIÓN ----
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.onclick = () => {
            clearSession();
            window.location.hash = "#/";
        };
    }

    // ---- 3. CARGAR DATOS DEL BACKEND ----
    await Promise.all([loadReports(), loadPointsSummary()]);

    // ---- 4. CONTROLADORES DEL MODAL (REGISTRAR/EDITAR) ----
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

    // ---- 5. FORMULARIO GUARDAR / ACTUALIZAR (CREATE & UPDATE) ----
    if (deliveryForm) {
        deliveryForm.onsubmit = async (e) => {
            e.preventDefault();

            const category = document.getElementById("deliveryCategory").value;
            const quantity = document.getElementById("deliveryQuantity").value;
            const unit = document.getElementById("deliveryUnit").value;
            const evidenceInput = document.getElementById("deliveryEvidence");
            const reportId = editIndexInput.value;

            const formData = new FormData();
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("unit", unit);
            if (evidenceInput.files[0]) {
                formData.append("evidence", evidenceInput.files[0]);
            }

            try {
                if (reportId === "") {
                    // ACCIÓN: CREAR (CREATE)
                    const data = await apiFetch("/reports", { method: "POST", body: formData }, true);
                    alert(`✅ ¡Entrega registrada! Quedó pendiente de validación (+${data.report.points} pts al ser aprobada).`);
                } else {
                    // ACCIÓN: EDITAR (UPDATE)
                    await apiFetch(`/reports/${reportId}`, { method: "PUT", body: formData }, true);
                    alert("✏️ ¡Entrega actualizada correctamente!");
                }

                await Promise.all([loadReports(), loadPointsSummary()]);
                modal.classList.add("hidden");
                deliveryForm.reset();
            } catch (error) {
                alert(`❌ ${error.message}`);
            }
        };
    }

    // ---- 6. MAPA DE PUNTOS DE ACOPIO (DESDE EL BACKEND) ----
    initSpotsMap();

    // ---- 7. REDIMIR BONOS ----
    setupRedemptionHandlers();
}

// ---- CARGAR PUNTOS (confirmados/pendientes) DESDE EL BACKEND ----
async function loadPointsSummary() {
    const totalPointsDisplay = document.getElementById("totalPointsDisplay");
    const pendingPointsDisplay = document.getElementById("pendingPointsDisplay");
    const totalWeightDisplay = document.getElementById("totalWeightDisplay");

    try {
        const summary = await apiFetch("/points/me");
        totalPointsDisplay.textContent = `${summary.confirmedPoints} pts`;
        pendingPointsDisplay.textContent = summary.pendingPoints > 0
            ? `+${summary.pendingPoints} pts pendientes de validación`
            : "";
        totalWeightDisplay.textContent = `${summary.totalKg} Kg`;
    } catch (error) {
        console.error("No se pudieron cargar los puntos:", error.message);
    }
}

// ---- CARGAR MIS ENTREGAS (READ) ----
async function loadReports() {
    try {
        const data = await apiFetch("/reports/me");
        reports = data.reports;
        renderDashboardData();
    } catch (error) {
        console.error("No se pudieron cargar las entregas:", error.message);
    }
}

const STATUS_BADGES = {
    pendiente: { label: "Pendiente", classes: "bg-orange-50 text-orange-700" },
    validado: { label: "Validado", classes: "bg-green-50 text-green-700" },
    rechazado: { label: "Rechazado", classes: "bg-red-50 text-red-700" }
};

function renderDashboardData() {
    const tableBody = document.getElementById("historyTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (reports.length === 0) {
        tableBody.innerHTML = `
            <tr><td colspan="5" class="py-6 text-center text-slate-400">Aún no has registrado entregas.</td></tr>
        `;
        return;
    }

    reports.forEach((report) => {
        const date = new Date(report.created_at).toLocaleDateString("es-CO");
        const status = STATUS_BADGES[report.status] || STATUS_BADGES.pendiente;
        const canEdit = report.status === "pendiente";

        const row = `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="py-4 font-medium text-slate-800">${date}</td>
                <td class="py-4">
                    <span class="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold text-xs tracking-wide">
                        ${report.category}
                    </span>
                </td>
                <td class="py-4 font-medium text-slate-600">${report.quantity} ${report.unit}</td>
                <td class="py-4 font-bold text-green-700">
                    ${report.points} pts
                    <span class="block text-[10px] font-semibold ${status.classes} px-2 py-0.5 rounded-full w-fit mt-1">${status.label}</span>
                </td>
                <td class="py-4 text-center flex justify-center gap-2">
                    <button class="btn-edit text-white hover:bg-blue-700 font-bold text-xs bg-blue-600 px-3 py-1.5 rounded-lg transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed" data-id="${report.id}" ${canEdit ? "" : "disabled"}>
                        Editar
                    </button>
                    <button class="btn-delete text-white hover:bg-red-700 font-bold text-xs bg-red-600 px-3 py-1.5 rounded-lg transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed" data-id="${report.id}" ${canEdit ? "" : "disabled"}>
                        Borrar
                    </button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });

    document.querySelectorAll(".btn-edit:not([disabled])").forEach((btn) => {
        btn.onclick = (e) => openEditModal(e.target.getAttribute("data-id"));
    });

    document.querySelectorAll(".btn-delete:not([disabled])").forEach((btn) => {
        btn.onclick = (e) => deleteDelivery(e.target.getAttribute("data-id"));
    });
}

function openEditModal(reportId) {
    const modal = document.getElementById("deliveryModal");
    const modalTitle = document.getElementById("modalTitle");
    const editIndexInput = document.getElementById("editIndex");
    const categorySelect = document.getElementById("deliveryCategory");
    const quantityInput = document.getElementById("deliveryQuantity");
    const unitSelect = document.getElementById("deliveryUnit");

    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    modalTitle.textContent = "✏️ Editar Entrega";
    editIndexInput.value = report.id;
    categorySelect.value = report.category;
    quantityInput.value = report.quantity;
    unitSelect.value = report.unit;

    modal.classList.remove("hidden");
}

async function deleteDelivery(reportId) {
    if (!confirm("⚠️ ¿Estás seguro de que quieres eliminar este registro?")) return;

    try {
        await apiFetch(`/reports/${reportId}`, { method: "DELETE" });
        await Promise.all([loadReports(), loadPointsSummary()]);
    } catch (error) {
        alert(`❌ ${error.message}`);
    }
}

// ---- 📍 MAPA DE PUNTOS DE ACOPIO USANDO LEAFLET.JS (datos desde el backend) ----
async function initSpotsMap() {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    let spots = [];
    try {
        const data = await apiFetch("/spots");
        spots = data.spots;
    } catch (error) {
        console.error("No se pudieron cargar los puntos de acopio:", error.message);
        return;
    }

    import("https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js")
        .then((L) => {
            const barranquillaCoords = [10.9878, -74.8000];
            const map = L.map('map').setView(barranquillaCoords, 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            spots.forEach(spot => {
                L.marker([spot.lat, spot.lng])
                    .addTo(map)
                    .bindPopup(`
                        <div class="p-1">
                            <span class="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full">${spot.locality}</span>
                            <h4 class="text-sm font-bold text-slate-800 mt-1.5">${spot.name}</h4>
                            <p class="text-xs text-slate-600 mt-1">${spot.description || ""}</p>
                            <p class="text-[11px] text-green-600 font-semibold mt-2">📍 ¡Trae tus residuos aquí!</p>
                        </div>
                    `);
            });
        })
        .catch(err => console.error("No se pudo cargar el mapa interactivo:", err));
}

// ---- CANJEO (vista previa; el catálogo de recompensas aún no persiste en el backend) ----
function setupRedemptionHandlers() {
    const btn10 = document.getElementById("btnRedeem10");
    const btn20 = document.getElementById("btnRedeem20");

    const handleRedeem = async (requiredPoints, rewardName) => {
        try {
            const summary = await apiFetch("/points/me");
            if (summary.confirmedPoints >= requiredPoints) {
                alert(`🎉 ¡Tienes puntos suficientes para el bono de ${rewardName}! (Función de canje disponible próximamente).`);
            } else {
                alert(`❌ Puntos insuficientes. Tienes ${summary.confirmedPoints} pts, requiere ${requiredPoints} pts.`);
            }
        } catch (error) {
            alert(`❌ ${error.message}`);
        }
    };

    if (btn10) btn10.onclick = () => handleRedeem(500, "10% Alkosto");
    if (btn20) btn20.onclick = () => handleRedeem(1000, "20% Alkosto");
}

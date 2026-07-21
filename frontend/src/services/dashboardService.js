// src/services/dashboardService.js

export function initPointsDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  if (!currentUser) return;

  // Manejo de Cierre de Sesión
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("current_user");
    window.location.hash = '#/login';
  });

  if (currentUser.role === "admin") {
    loadAdminData();
  } else {
    setupMaterialUnitMapping();
    setupUserRegistrationForm(currentUser);
    loadUserData(currentUser); // 👈 ¡Nuevo! Carga los registros personales del usuario
  }
}

// 1. LIGAR AUTOMÁTICAMENTE EL MATERIAL CON SU UNIDAD DE MEDIDA EN LA INTERFAZ
function setupMaterialUnitMapping() {
  const materialSelect = document.getElementById("materialType");
  const unitInput = document.getElementById("unitMeasure");

  if (!materialSelect || !unitInput) return;

  const unitMapping = {
    plastic: "Kilogramos (kg)",
    cardboard: "Kilogramos (kg)",
    paper: "Kilogramos (kg)",
    glass: "Kilogramos (kg)",
    oil: "Litros (L)",
    batteries: "Unidades (u)"
  };

  materialSelect.addEventListener("change", (e) => {
    const selectedMaterial = e.target.value;
    unitInput.value = unitMapping[selectedMaterial] || "";
  });
}

// LÓGICA DE REGISTRO SEGURO PARA EL USUARIO COMÚN
function setupUserRegistrationForm(currentUser) {
  const form = document.getElementById("recordForm");
  const msgDiv = document.getElementById("deliveryMessage");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (msgDiv) msgDiv.className = "hidden";

    const material = document.getElementById("materialType").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const unit = document.getElementById("unitMeasure").value;

    if (!material || isNaN(quantity) || quantity <= 0 || !unit) {
      showMsg("⚠️ Todos los campos son obligatorios y la cantidad debe ser mayor a 0.", "red");
      return;
    }

    const safetyMapping = {
      plastic: "Kilogramos (kg)",
      cardboard: "Kilogramos (kg)",
      paper: "Kilogramos (kg)",
      glass: "Kilogramos (kg)",
      oil: "Litros (L)",
      batteries: "Unidades (u)"
    };

    if (unit !== safetyMapping[material]) {
      showMsg("⚠️ Error de consistencia: La unidad de medida no corresponde con el material seleccionado.", "red");
      return;
    }

    const deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];
    const newDelivery = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      material: material,
      quantity: quantity,
      unit: unit,
      date: new Date().toLocaleDateString()
    };

    deliveries.push(newDelivery);
    localStorage.setItem("deliveries_db", JSON.stringify(deliveries));

    showMsg("¡Entrega registrada con éxito! Tus puntos han sido cargados a tu cuenta.", "green");
    form.reset();

    // Recargar la tabla del usuario inmediatamente tras registrar una entrega
    loadUserData(currentUser);
  });

  function showMsg(text, type) {
    if (!msgDiv) return;
    msgDiv.textContent = text;
    if (type === "green") {
      msgDiv.className = "p-3 mb-4 text-xs font-semibold rounded-xl border bg-green-50 text-green-700 border-green-100";
    } else {
      msgDiv.className = "p-3 mb-4 text-xs font-semibold rounded-xl border bg-red-50 text-red-700 border-red-100";
    }
  }
}

//  CARGA DE REGISTROS PROPIOS DEL USUARIO REGISTRADO
function loadUserData(currentUser) {
  const deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];
  
  // FILTRAR: Solo las entregas que le pertenecen a este ID
  const myDeliveries = deliveries.filter(d => d.userId === currentUser.id);

  const tbody = document.getElementById("userDeliveriesTableBody");
  const totalCountSpan = document.getElementById("userTotalDeliveries");

  if (totalCountSpan) {
    totalCountSpan.textContent = myDeliveries.length;
  }

  if (!tbody) return;

  // Si el usuario es nuevo y no tiene registros, mostrar mensaje de tabla vacía
  if (myDeliveries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="p-8 text-center text-slate-400 text-sm">
          Aún no has registrado ninguna entrega. ¡Haz tu primer reciclaje arriba!  🌱
        </td>
      </tr>
    `;
    return;
  }

  // Traducción visual de materiales
  const materialNames = {
    plastic: "Plástico",
    cardboard: "Cartón",
    paper: "Papel",
    glass: "Vidrio",
    oil: "Aceite",
    batteries: "Baterías"
  };

  // Renderizar dinámicamente sus entregas reales
  tbody.innerHTML = myDeliveries.map(d => `
    <tr class="hover:bg-slate-50/50 transition-colors border-b border-slate-100">
      <td class="p-4 text-xs text-slate-500">${d.date}</td>
      <td class="p-4 font-semibold text-slate-800">${materialNames[d.material] || d.material}</td>
      <td class="p-4 text-slate-600 font-medium">${d.quantity} ${d.unit}</td>
      <td class="p-4 text-right">
        <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
          Completado
        </span>
      </td>
    </tr>
  `).join("");
}

// 🛡️ 4. CARGA DE DATOS PARA EL ADMINISTRADOR (SOLO LECTURA DE OTROS)
function loadAdminData() {
  const users = JSON.parse(localStorage.getItem("users_db")) || [];
  const deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];

  const recyclersOnly = users.filter(u => u.role !== "admin");

  const totalWeight = deliveries.reduce((acc, del) => {
    if (del.unit && del.unit.includes("kg")) {
      return acc + del.quantity;
    }
    return acc;
  }, 0);

  if (document.getElementById("totalUsersCount")) {
    document.getElementById("totalUsersCount").textContent = recyclersOnly.length;
    document.getElementById("totalWeightCount").textContent = `${totalWeight.toFixed(1)} kg`;
    document.getElementById("totalDeliveriesCount").textContent = deliveries.length;
  }

  const tbody = document.getElementById("adminUsersTableBody");
  if (!tbody) return;

  if (recyclersOnly.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="p-8 text-center text-slate-400">No hay usuarios recicladores registrados en el sistema.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = recyclersOnly.map(u => {
    const userDeliveries = deliveries.filter(d => d.userId === u.id);
    const totalQty = userDeliveries.reduce((sum, d) => sum + d.quantity, 0);

    return `
      <tr class="hover:bg-slate-50/50 transition-colors">
        <td class="p-4 font-semibold text-slate-900">${u.name}</td>
        <td class="p-4 text-slate-500">${u.email}</td>
        <td class="p-4">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
            Reciclador
          </span>
        </td>
        <td class="p-4 text-center font-bold text-slate-800">
          ${userDeliveries.length} entregas (${totalQty.toFixed(1)} items/kg)
        </td>
        <td class="p-4 text-right">
          <button onclick="deleteUser(${u.id})" class="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg border border-red-100 transition cursor-pointer">
            Eliminar Cuenta
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

// Permitir eliminación de cuentas por parte del Administrador
window.deleteUser = function(userId) {
  if (confirm("⚠️ ¿Estás completamente seguro de eliminar a este reciclador? Esta acción es irreversible y borrará sus estadísticas de reciclaje.")) {
    let users = JSON.parse(localStorage.getItem("users_db")) || [];
    users = users.filter(u => u.id !== userId);
    localStorage.setItem("users_db", JSON.stringify(users));
    
    let deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];
    deliveries = deliveries.filter(d => d.userId !== userId);
    localStorage.setItem("deliveries_db", JSON.stringify(deliveries));

    loadAdminData();
  }
};
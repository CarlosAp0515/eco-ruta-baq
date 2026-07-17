// src/services/pointsService.js

const UNIT_MAPPING = {
  "Plástico": "Kg",
  "Cartón y Papel": "Kg",
  "Vidrio": "Kg",
  "Pilas / Baterías": "Unidades",
  "Aceite Usado": "Litros",
  "Electrónicos (RAEE)": "Unidades"
};

const POINTS_MAPPING = {
  "Plástico": 10,
  "Cartón y Papel": 8,
  "Vidrio": 12,
  "Pilas / Baterías": 20,
  "Aceite Usado": 15,
  "Electrónicos (RAEE)": 18
};

// Datos para el Modal de Canje de Productos
const REDEEM_DETAILS = {
  10: {
    title: "Bono 10% Descuento Alkosto",
    pointsNeeded: 500,
    products: [
      "⚡ Pilas recargables (Duracell / Energizer)",
      "💡 Bombillos LED ahorradores de energía",
      "🔋 Powerbanks (Baterías portátiles de carga ecológica)",
      "🔌 Multitomas con supresor de picos"
    ]
  },
  20: {
    title: "Bono 20% Descuento Alkosto",
    pointsNeeded: 1000,
    products: [
      "🚲 Bicicletas convencionales y patinetas eléctricas",
      "🔋 Baterías de repuesto para vehículos híbridos",
      "🧊 Electrodomésticos con certificación energética tipo A",
      "☀️ Paneles y reflectores solares pequeños para jardín"
    ]
  }
};

let currentPendingRedeem = null; // Variable de apoyo para la transacción activa

export function initPointsDashboard() {
  console.log("🔄 Inicializando manejadores del Dashboard EcoRuta...");

  // 1. LEER USUARIO EN SESIÓN
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("current_user"));
  } catch (error) {
    console.error("Error al leer current_user:", error);
  }

  if (!currentUser) {
    console.warn("⚠️ No hay un usuario activo en sesión.");
    window.location.hash = '#/login';
    return;
  }

  // Actualizar el header de bienvenida del usuario
  const userNameDisplay = document.getElementById("userNameDisplay");
  if (userNameDisplay) {
    userNameDisplay.textContent = `Hola, ${currentUser.name}`;
  }

  // 2. LOGOUT (Cierre de sesión con id corregido a 'btnLogout')
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.onclick = function (e) {
      e.preventDefault();
      console.log("🚪 Cerrando sesión...");
      localStorage.removeItem("current_user");
      window.location.hash = '#/login';
    };
  }

  // 3. CARGAR EL MAPA INTERACTIVO DE BARRANQUILLA
  setupInteractiveMap();

  // 4. SEPARAR LÓGICA DE ROLES
  if (currentUser.role === "admin") {
    try {
      setupAdminDashboardLogic();
    } catch (err) {
      console.error("Error en Admin Dashboard:", err);
    }
  } else {
    try {
      setupUserModalHandlers();
      setupMaterialUnitAutoSelection();
      setupUserRegistrationForm(currentUser);
      renderUserMetricsAndHistory(currentUser);
      setupRedeemModalHandlers(currentUser);
    } catch (err) {
      console.error("Error en User Dashboard:", err);
    }
  }
}

// 🗺️ CONFIGURAR MAPA INTERACTIVO CON PUNTOS DE BARRANQUILLA
function setupInteractiveMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement) {
    console.warn("⚠️ Contenedor de mapa no encontrado.");
    return;
  }

  // Si ya existía un mapa cargado por Leaflet en este elemento, evitamos inicializarlo dos veces
  if (mapElement._leaflet_id) {
    return;
  }

  // Coordenadas centrales de Barranquilla
  const barranquillaCoords = [10.9639, -74.7964];

  // Cargar el script de Leaflet si no existe globalmente
  if (typeof L === 'undefined') {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => buildMapInstance(barranquillaCoords);
    document.head.appendChild(script);
  } else {
    buildMapInstance(barranquillaCoords);
  }
}

function buildMapInstance(coords) {
  try {
    const map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Puntos de recolección en Barranquilla
    const points = [
      { name: "EcoPunto Parque Venezuela", coords: [11.0089, -74.8143], desc: "Acepta plásticos, papel y vidrio." },
      { name: "Punto Verde CC Buenavista", coords: [11.0135, -74.8219], desc: "Especializado en pilas, baterías y residuos RAEE." },
      { name: "Centro de Acopio Prado", coords: [10.9902, -74.7952], desc: "Acepta aceite de cocina usado y cartón." },
      { name: "Punto Ecológico Parque de la Electrificadora", coords: [11.0163, -74.8122], desc: "Residuos domésticos reciclables limpios." }
    ];

    points.forEach(p => {
      L.marker(p.coords)
        .addTo(map)
        .bindPopup(`<b>${p.name}</b><br>${p.desc}`);
    });
  } catch (error) {
    console.error("Error inicializando mapa de Leaflet:", error);
  }
}

// 📐 ASIGNACIÓN AUTOMÁTICA DE LA UNIDAD EN EL MODAL
function setupMaterialUnitAutoSelection() {
  const categorySelect = document.getElementById("deliveryCategory");
  const unitSelect = document.getElementById("deliveryUnit");

  if (!categorySelect || !unitSelect) return;

  categorySelect.onchange = function (e) {
    const selected = e.target.value;
    const matchedUnit = UNIT_MAPPING[selected];
    if (matchedUnit) {
      unitSelect.value = matchedUnit;
    }
  };
}

// 🗂️ CONTROL DE APERTURA Y CIERRE DEL MODAL DE ENTREGAS
function setupUserModalHandlers() {
  const modal = document.getElementById("deliveryModal");
  const btnOpen = document.getElementById("btnOpenModal");
  const btnClose = document.getElementById("btnCloseModal");

  if (!modal || !btnOpen || !btnClose) return;

  btnOpen.onclick = () => {
    document.getElementById("deliveryForm").reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("modalTitle").textContent = "♻️ Registrar Nueva Entrega";
    modal.classList.remove("hidden");
  };

  btnClose.onclick = () => {
    modal.classList.add("hidden");
  };
}

// 📝 FORMULARIO DE REGISTRO DE ENTREGAS
function setupUserRegistrationForm(currentUser) {
  const form = document.getElementById("deliveryForm");
  const modal = document.getElementById("deliveryModal");

  if (!form) return;

  form.onsubmit = function (e) {
    e.preventDefault();

    const category = document.getElementById("deliveryCategory").value;
    const quantity = parseFloat(document.getElementById("deliveryQuantity").value);
    const unit = document.getElementById("deliveryUnit").value;
    const editIndexVal = document.getElementById("editIndex").value;

    if (!category || isNaN(quantity) || quantity <= 0 || !unit) {
      alert("⚠️ Todos los campos son obligatorios y la cantidad debe ser mayor a 0.");
      return;
    }

    const pointsFactor = POINTS_MAPPING[category] || 5;
    const pointsEarned = Math.round(quantity * pointsFactor);

    try {
      let deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];

      if (editIndexVal !== "") {
        const idToEdit = parseInt(editIndexVal);
        deliveries = deliveries.map(item => {
          if (item.id === idToEdit) {
            return {
              ...item,
              material: category,
              quantity: quantity,
              unit: unit,
              points: pointsEarned
            };
          }
          return item;
        });
        alert("🎉 Registro actualizado con éxito.");
      } else {
        const newDelivery = {
          id: Date.now(),
          userId: currentUser.id,
          userName: currentUser.name,
          material: category,
          quantity: quantity,
          unit: unit,
          points: pointsEarned,
          date: new Date().toLocaleDateString()
        };
        deliveries.push(newDelivery);
        alert(`🎉 ¡Entrega registrada con éxito! Sumaste +${pointsEarned} puntos.`);
      }

      localStorage.setItem("deliveries_db", JSON.stringify(deliveries));
      
      if (modal) modal.classList.add("hidden");
      form.reset();
      
      renderUserMetricsAndHistory(currentUser);
    } catch (err) {
      console.error(err);
    }
  };
}

// 🎟️ CONTROLES DEL MODAL DE REDENCIÓN (PRODUCTOS APLICABLES)
function setupRedeemModalHandlers(currentUser) {
  const btn10 = document.getElementById("btnRedeem10");
  const btn20 = document.getElementById("btnRedeem20");
  const redeemModal = document.getElementById("redeemModal");
  const closeBtn = document.getElementById("btnCloseRedeemModal");
  const cancelBtn = document.getElementById("btnCancelRedeem");
  const confirmBtn = document.getElementById("btnConfirmRedeem");

  if (!redeemModal || !confirmBtn) return;

  const openRedeem = (discountType) => {
    const data = REDEEM_DETAILS[discountType];
    currentPendingRedeem = { type: discountType, ...data };

    document.getElementById("redeemModalTitle").textContent = `🎟️ ${data.title}`;
    
    const listElement = document.getElementById("redeemProductList");
    listElement.innerHTML = data.products.map(p => `<li>${p}</li>`).join("");

    redeemModal.classList.remove("hidden");
  };

  if (btn10) btn10.onclick = () => openRedeem(10);
  if (btn20) btn20.onclick = () => openRedeem(20);

  const hideModal = () => {
    redeemModal.classList.add("hidden");
    currentPendingRedeem = null;
  };

  if (closeBtn) closeBtn.onclick = hideModal;
  if (cancelBtn) cancelBtn.onclick = hideModal;

  confirmBtn.onclick = () => {
    if (!currentPendingRedeem) return;

    // Obtener puntos del usuario actual calculándolos dinámicamente
    const deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];
    const userDeliveries = deliveries.filter(d => d.userId === currentUser.id);
    const totalPoints = userDeliveries.reduce((sum, d) => sum + (d.points || 0), 0);

    if (totalPoints < currentPendingRedeem.pointsNeeded) {
      alert(`❌ No tienes puntos suficientes. Requieres ${currentPendingRedeem.pointsNeeded} pts y tienes ${totalPoints} pts.`);
      hideModal();
      return;
    }

    // Para canjear, insertamos una "entrega negativa" con los puntos de costo del bono
    try {
      const negativeDelivery = {
        id: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        material: `Canje: ${currentPendingRedeem.title}`,
        quantity: 1,
        unit: "Unidades",
        points: -currentPendingRedeem.pointsNeeded,
        date: new Date().toLocaleDateString()
      };

      deliveries.push(negativeDelivery);
      localStorage.setItem("deliveries_db", JSON.stringify(deliveries));

      alert(`🎁 ¡Bono canjeado con éxito! Se han descontado ${currentPendingRedeem.pointsNeeded} puntos de tu saldo.`);
      hideModal();
      renderUserMetricsAndHistory(currentUser);
    } catch (err) {
      console.error(err);
    }
  };
}

// 📊 RENDERIZACIÓN DE HISTORIAL Y MÉTRICAS DEL USUARIO
function renderUserMetricsAndHistory(currentUser) {
  const deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];
  const userDeliveries = deliveries.filter(d => d.userId === currentUser.id);

  const totalPoints = userDeliveries.reduce((sum, d) => sum + (d.points || 0), 0);
  const totalWeight = userDeliveries.reduce((sum, d) => {
    if (d.unit === "Kg" && d.points > 0) return sum + d.quantity;
    return sum;
  }, 0);

  const totalPointsDisplay = document.getElementById("totalPointsDisplay");
  const totalWeightDisplay = document.getElementById("totalWeightDisplay");

  if (totalPointsDisplay) totalPointsDisplay.textContent = `${totalPoints} pts`;
  if (totalWeightDisplay) totalWeightDisplay.textContent = `${totalWeight.toFixed(1)} kg`;

  const tbody = document.getElementById("historyTableBody");
  if (!tbody) return;

  if (userDeliveries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="p-4 text-center text-slate-400">No has registrado entregas todavía.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = userDeliveries.map(d => {
    const isRedeem = d.points < 0;
    return `
      <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition">
        <td class="py-3 font-medium">${d.date}</td>
        <td class="py-3 font-semibold text-slate-700">${d.material}</td>
        <td class="py-3">${isRedeem ? '-' : d.quantity + ' ' + d.unit}</td>
        <td class="py-3 ${isRedeem ? 'text-red-600' : 'text-green-700'} font-bold">
          ${isRedeem ? '' : '+'}${d.points} pts
        </td>
        <td class="py-3 text-center flex justify-center gap-2">
          ${isRedeem ? '<span class="text-xs text-slate-400 italic">Canjeado</span>' : `
            <button onclick="editDelivery(${d.id})" class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 font-semibold transition">Editar</button>
            <button onclick="deleteDelivery(${d.id})" class="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100 font-semibold transition">Eliminar</button>
          `}
        </td>
      </tr>
    `;
  }).join("");
}

// 🗑️ ACCIONES DE EDICIÓN Y ELIMINACIÓN PARA EL USUARIO COMÚN
window.editDelivery = function(deliveryId) {
  const deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];
  const delivery = deliveries.find(d => d.id === deliveryId);
  if (!delivery) return;

  const modal = document.getElementById("deliveryModal");
  if (!modal) return;

  document.getElementById("editIndex").value = delivery.id;
  document.getElementById("deliveryCategory").value = delivery.material;
  document.getElementById("deliveryQuantity").value = delivery.quantity;
  document.getElementById("deliveryUnit").value = delivery.unit;
  document.getElementById("modalTitle").textContent = "✏️ Editar Mi Entrega";

  modal.classList.remove("hidden");
};

window.deleteDelivery = function(deliveryId) {
  if (confirm("¿Estás seguro de que deseas eliminar este registro de entrega? Se restarán los puntos correspondientes.")) {
    let deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];
    deliveries = deliveries.filter(d => d.id !== deliveryId);
    localStorage.setItem("deliveries_db", JSON.stringify(deliveries));

    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (currentUser) renderUserMetricsAndHistory(currentUser);
  }
};

// Lógica del admin permanece inalterada...
function setupAdminDashboardLogic() {
  const searchInput = document.getElementById("adminSearchInput");
  const materialFilter = document.getElementById("adminMaterialFilter");

  if (searchInput) searchInput.oninput = renderFilteredData;
  if (materialFilter) materialFilter.onchange = renderFilteredData;

  renderFilteredData();
}

function renderFilteredData() {
  try {
    const users = JSON.parse(localStorage.getItem("users_db")) || [];
    const deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];

    const searchInput = document.getElementById("adminSearchInput");
    const materialFilter = document.getElementById("adminMaterialFilter");

    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const filterVal = materialFilter ? materialFilter.value : "all";

    const recyclers = users.filter(u => u.role !== "admin");

    const totalWeight = deliveries.reduce((acc, d) => {
      if (d.unit === "Kg" && d.points > 0) return acc + d.quantity;
      return acc;
    }, 0);

    const materialCounts = {};
    deliveries.forEach(d => {
      if (d.points > 0) {
        materialCounts[d.material] = (materialCounts[d.material] || 0) + 1;
      }
    });

    let topMaterial = "Ninguno";
    let maxCount = 0;
    Object.keys(materialCounts).forEach(m => {
      if (materialCounts[m] > maxCount) {
        maxCount = materialCounts[m];
        topMaterial = m;
      }
    });

    if (document.getElementById("totalUsersCount")) {
      document.getElementById("totalUsersCount").textContent = recyclers.length;
      document.getElementById("totalWeightCount").textContent = `${totalWeight.toFixed(1)} kg`;
      document.getElementById("topMaterialCount").textContent = topMaterial;
      document.getElementById("totalDeliveriesCount").textContent = deliveries.filter(d => d.points > 0).length;
    }

    const tbody = document.getElementById("adminUsersTableBody");
    if (!tbody) return;

    const filteredRecyclers = recyclers.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchVal) || u.email.toLowerCase().includes(searchVal);
      let matchesMaterial = true;
      if (filterVal !== "all") {
        matchesMaterial = deliveries.some(d => d.userId === u.id && d.material === filterVal);
      }
      return matchesSearch && matchesMaterial;
    });

    if (filteredRecyclers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="p-4 text-center text-slate-400">Ningún usuario coincide con la búsqueda.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filteredRecyclers.map(u => {
      const userDeliveries = deliveries.filter(d => d.userId === u.id);
      const userPoints = userDeliveries.reduce((sum, d) => sum + (d.points || 0), 0);
      const userValidDeliveries = userDeliveries.filter(d => d.points > 0);

      return `
        <tr class="hover:bg-slate-50/50 transition">
          <td class="p-4 font-semibold text-slate-900">${u.name}</td>
          <td class="p-4 text-slate-500">${u.email}</td>
          <td class="p-4 text-center font-extrabold text-green-700">⭐ ${userPoints} pts</td>
          <td class="p-4 text-center font-semibold text-slate-700">${userValidDeliveries.length} entregas</td>
          <td class="p-4 text-right">
            <button onclick="deleteUser(${u.id})" class="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg border border-red-100 transition">
              Eliminar
            </button>
          </td>
        </tr>
      `;
    }).join("");

  } catch (err) {
    console.error("Error al renderizar los datos del panel de administrador:", err);
  }
}

window.deleteUser = function(userId) {
  if (confirm("⚠️ ¿Estás completamente seguro de eliminar a este reciclador?")) {
    try {
      let users = JSON.parse(localStorage.getItem("users_db")) || [];
      users = users.filter(u => u.id !== userId);
      localStorage.setItem("users_db", JSON.stringify(users));

      let deliveries = JSON.parse(localStorage.getItem("deliveries_db")) || [];
      deliveries = deliveries.filter(d => d.userId !== userId);
      localStorage.setItem("deliveries_db", JSON.stringify(deliveries));

      renderFilteredData();
    } catch (err) {
      console.error(err);
    }
  }
};
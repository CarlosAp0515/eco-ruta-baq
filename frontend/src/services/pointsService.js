// calculo los puntos de forma dinámica basándose en una matriz de categorías de residuos, calcula el total del mes y maneja la redención del bono.

// Reglas de negocio actualizadas (Puntos por unidad o por kilogramo)
const POINTS_CONFIG = {
    // Materiales comunes (por Kg)
    "Plástico": 20,           // 20 puntos por Kg
    "Cartón y Papel": 15,     // 15 puntos por Kg
    "Vidrio": 10,             // 10 puntos por Kg
    
    // Residuos especiales
    "Pilas / Baterías": 50,   // 50 puntos por unidad/lote
    "Electrónicos (RAEE)": 120, // 120 puntos por dispositivo
    "Aceite Usado": 80        // 80 puntos por Litro
};

// Datos Mockup actualizados con entregas cotidianas de plástico y cartón
const mockDeliveries = [
    { date: "2026-07-01", category: "Cartón y Papel", quantity: "12 Kg", points: 180 }, // 12 * 15 = 180
    { date: "2026-07-05", category: "Plástico", quantity: "5 Kg", points: 100 },       // 5 * 20 = 100
    { date: "2026-07-10", category: "Aceite Usado", quantity: "2 Litros", points: 160 }, // 2 * 80 = 160
    { date: "2026-07-14", category: "Plástico", quantity: "8 Kg", points: 160 }        // 8 * 20 = 160
];

export function initPointsDashboard() {
    const tableBody = document.getElementById("historyTableBody");
    const totalPointsDisplay = document.getElementById("totalPointsDisplay");
    const totalWeightDisplay = document.getElementById("totalWeightDisplay");

    if (!tableBody) return;

    // 1. Renderizar historial de entregas actualizado
    let accumulatedPoints = 0;
    let totalKilos = 0;
    tableBody.innerHTML = "";

    mockDeliveries.forEach(delivery => {
        accumulatedPoints += delivery.points;
        
        // Sumamos al contador de peso si la cantidad está expresada en "Kg"
        if (delivery.quantity.includes("Kg")) {
            const kgValue = parseFloat(delivery.quantity);
            totalKilos += kgValue;
        }

        // Definimos un color de etiqueta dinámico según el tipo de residuo para que se vea genial
        let badgeColor = "bg-emerald-50 text-emerald-700"; // Por defecto verde
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

    // Actualizar KPIs en pantalla
    totalPointsDisplay.textContent = `${accumulatedPoints} pts`;
    totalWeightDisplay.textContent = `${totalKilos} Kg`; // Ahora sí muestra los Kg reales acumulados en el mes

    // 2. Controladores de Eventos para Redimir Bonos (Igual al anterior)
    const btn10 = document.getElementById("btnRedeem10");
    const btn20 = document.getElementById("btnRedeem20");

    if (btn10 && btn20) {
        btn10.addEventListener("click", () => {
            if (accumulatedPoints >= 500) {
                accumulatedPoints -= 500;
                totalPointsDisplay.textContent = `${accumulatedPoints} pts`;
                alert("🎉 ¡Bono de 10% redimido con éxito! Código de Alkosto enviado al correo.");
            } else {
                alert(`❌ Puntos insuficientes. Necesitas 500 pts y tienes ${accumulatedPoints} pts.`);
            }
        });

        btn20.addEventListener("click", () => {
            if (accumulatedPoints >= 1000) {
                accumulatedPoints -= 1000;
                totalPointsDisplay.textContent = `${accumulatedPoints} pts`;
                alert("🎉 ¡Bono de 20% redimido con éxito! Código de Alkosto enviado al correo.");
            } else {
                alert(`❌ Puntos insuficientes. Necesitas 1000 pts y tienes ${accumulatedPoints} pts.`);
            }
        });
    }
}
// src/services/api.js
// Cliente centralizado para hablar con el backend de EcoRuta BAQ.

export const API_BASE_URL = "http://localhost:3002/api";

export function getToken() {
    return localStorage.getItem("access_token");
}

export function setSession(token, user) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("current_user", JSON.stringify(user));
}

export function clearSession() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("current_user")) || null;
}

/**
 * Wrapper de fetch que agrega la URL base, el header Authorization (si hay
 * sesión) y parsea la respuesta como JSON. Lanza un Error con el mensaje
 * del backend si la respuesta no es exitosa.
 *
 * @param {string} endpoint - ej. "/reports" (se le antepone API_BASE_URL)
 * @param {RequestInit} options
 * @param {boolean} isFormData - true si el body es un FormData (no forzar JSON)
 */
export async function apiFetch(endpoint, options = {}, isFormData = false) {
    const token = getToken();

    const headers = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    let data = null;
    try {
        data = await response.json();
    } catch (_) {
        // Respuesta sin cuerpo JSON (ej. 204)
    }

    if (!response.ok) {
        throw new Error(data?.mensaje || `Error ${response.status} al comunicarse con el servidor.`);
    }

    return data;
}

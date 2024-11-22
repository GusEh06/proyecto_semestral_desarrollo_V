// Seleccionar los elementos del DOM
const btnAgendarCita = document.getElementById("btn-agendar-cita");
const btnVerCitas = document.getElementById("btn-ver-citas");
const modalInicio = document.getElementById("modal-inicio");

// URL de la API para validar sesión
const validateTokenUrl = "api/Usuarios/validate";

// Token de sesión almacenado (en una aplicación real se guardaría en cookies o localStorage)
let sessionToken = null;

// Función para validar la sesión
async function validarSesion() {
    if (!sessionToken) {
        return false;
    }

    try {
        const response = await fetch(`${validateTokenUrl}?token=${sessionToken}`);
        if (response.ok) {
            const data = await response.json();
            console.log("Sesión válida para:", data.contacto);
            return true;
        } else {
            console.warn("Sesión no válida");
            return false;
        }
    } catch (error) {
        console.error("Error al validar la sesión:", error);
        return false;
    }
}

// Función para manejar las acciones de los botones
async function manejarBoton(action) {
    const sesionValida = await validarSesion();

    if (sesionValida) {
        // Redirigir según la acción
        if (action === "agendar") {
            window.location.href = "agendar-citas.html";
        } else if (action === "ver") {
            window.location.href = "ver-citas.html";
        }
    } else {
        // Mostrar el modal de inicio de sesión si la sesión no es válida
        modalInicio.showModal();
    }
}

// Asignar eventos a los botones
btnAgendarCita.addEventListener("click", () => manejarBoton("agendar"));
btnVerCitas.addEventListener("click", () => manejarBoton("ver"));


// Seleccionar el botón de cerrar del modal
const closeModalInicioBtn = document.getElementById("close-modal-inicio-btn");

// Cerrar el modal al hacer clic en la 'X'
closeModalInicioBtn.addEventListener("click", () => {
    modalInicio.close();
});

// Cerrar el modal al hacer clic fuera de él
modalInicio.addEventListener("click", (e) => {
    if (e.target === modalInicio) {
        modalInicio.close();
    }
});


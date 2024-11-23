document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar los elementos del DOM
    const btnAgendarCita = document.getElementById("btn-agendar-cita");
    const btnVerCitas = document.getElementById("btn-ver-citas");
    const modalInicio = document.getElementById("modal-inicio");
    const userIconBtn = document.querySelector(".user-icon-btn"); // Botón para cerrar sesión
    const userInitials = document.getElementById("user-initials");

    // URL de la API para validar sesión
    const validateTokenUrl = "api/Usuarios/validate";

    // Token de sesión almacenado (en una aplicación real se guardaría en cookies o localStorage)
    let sessionToken = localStorage.getItem("userToken"); // Tomar el token de localStorage

    console.log("Token almacenado:", sessionToken);  // Depuración

    // Función para validar la sesión
    async function validarSesion() {
        if (!sessionToken) {
            console.warn("No se encontró token de sesión");  // Depuración
            return false;
        }

        try {
            const response = await fetch(`${validateTokenUrl}?token=${sessionToken}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Sesión válida para:", data.contacto);
                return true;
            } else {
                console.warn("Sesión no válida: respuesta del servidor:", response.statusText);  // Depuración
                return false;
            }
        } catch (error) {
            console.error("Error al validar la sesión:", error);  // Depuración
            return false;
        }
    }

    // Función para manejar las acciones de los botones
    async function manejarBoton(action) {
        const sesionValida = await validarSesion();
        console.log("Sesión válida:", sesionValida);  // Depuración

        if (sesionValida) {
            // Redirigir según la acción
            if (action === "agendar") {
                console.log("Redirigiendo a agendar-citas.html");  // Depuración
                window.location.href = "agendar-citas.html";
            } else if (action === "ver") {
                console.log("Redirigiendo a ver-citas.html");  // Depuración
                window.location.href = "ver-citas.html";
            }
        } else {
            console.log("Mostrando modal de inicio de sesión");  // Depuración
            // Mostrar el modal de inicio de sesión si la sesión no es válida
            modalInicio.showModal();
        }
    }

    // Asignar eventos a los botones solo si existen
    if (btnAgendarCita) {
        btnAgendarCita.addEventListener("click", () => manejarBoton("agendar"));
    }

    if (btnVerCitas) {
        btnVerCitas.addEventListener("click", () => manejarBoton("ver"));
    }

    // Función para cerrar sesión
    function logoutUser() {
        // Eliminar los datos del usuario del localStorage
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");

        // Recargar la página para actualizar el estado de la sesión
        window.location.reload();
    }

    // Asignar la función logout al botón del ícono de usuario
    if (userIconBtn) {
        userIconBtn.addEventListener('click', () => {
            // Cerrar sesión al hacer clic en el ícono de usuario
            logoutUser();
        });
    }

    // Seleccionar el botón de cerrar del modal
    const closeModalInicioBtn = document.getElementById("close-modal-inicio-btn");

    if (closeModalInicioBtn) {
        // Cerrar el modal al hacer clic en la 'X'
        closeModalInicioBtn.addEventListener("click", () => {
            modalInicio.close();
        });
    }

    if (modalInicio) {
        // Cerrar el modal al hacer clic fuera de él
        modalInicio.addEventListener("click", (e) => {
            if (e.target === modalInicio) {
                modalInicio.close();
            }
        });
    }

    // Verificar si el usuario está logueado y mostrar las iniciales
    const userName = localStorage.getItem("userName");
    if (userName) {
        // Mostrar las iniciales del usuario
        const initials = userName
            .split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
        userInitials.textContent = initials;
    }
});

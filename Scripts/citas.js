document.addEventListener('DOMContentLoaded', () => {
    const btnAgendarCita = document.getElementById("btn-agendar-cita");
    const btnVerCitas = document.getElementById("btn-ver-citas");
    const modalInicio = document.getElementById("modal-inicio");
    const userIconBtn = document.querySelector(".user-icon-btn");
    const userInitials = document.getElementById("user-initials");

    const validateTokenUrl = "http://localhost:5154/api/Usuarios/validate";
    let sessionToken = localStorage.getItem("userToken");
    

    async function validarSesion() {
        
        if (!sessionToken) {
            console.warn("No se encontró token de sesión");
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

    async function manejarBoton(action) {
        const sesionValida = await validarSesion();
        if (sesionValida) {
            if (action === "agendar") {
                window.location.href = "agendar-citas.html";
            } else if (action === "ver") {
                window.location.href = "ver-citas.html";
            }
        } else {
            modalInicio.showModal();
        }
    }

    if (btnAgendarCita) {
        btnAgendarCita.addEventListener("click", () => manejarBoton("agendar"));
    }

    if (btnVerCitas) {
        btnVerCitas.addEventListener("click", () => manejarBoton("ver"));
    }

    // Función de logout
    function logoutUser() {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        window.location.reload();
        window.location.href = "/pages/citas.html";
    }

    if (userIconBtn) {
        userIconBtn.addEventListener('click', logoutUser);
    }

    const closeModalInicioBtn = document.getElementById("close-modal-inicio-btn");
    if (closeModalInicioBtn) {
        closeModalInicioBtn.addEventListener("click", () => {
            modalInicio.close();
        });
    }

    if (modalInicio) {
        modalInicio.addEventListener("click", (e) => {
            if (e.target === modalInicio) {
                modalInicio.close();
            }
        });
    }


    const userName = localStorage.getItem("userName");
    if (userName) {
        const initials = userName.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase();
        userInitials.textContent = initials;
    }
    console.log("Token almacenado:", sessionToken);  // Depuración
});
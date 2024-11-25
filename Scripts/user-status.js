document.addEventListener("DOMContentLoaded", () => {
    const loginButtons = document.getElementById("login-buttons");
    const userIcon = document.getElementById("user-icon");
    const userInitials = document.getElementById("user-initials");

    // Verifica que los elementos existan antes de intentar manipularlos
    if (!loginButtons || !userIcon || !userInitials) {
        console.error("No se encontraron los elementos necesarios en el DOM.");
        return; // Salir de la función si no se encuentran los elementos
    }

    function checkLoginStatus() {
        const token = localStorage.getItem("userToken");
        const name = localStorage.getItem("userName");

        if (token && name) {
            // Ocultar botones de inicio/registro
            loginButtons.classList.add("hidden");

            const initials = name
                .split(" ")
                .map(word => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
            userInitials.textContent = initials;

            // Mostrar el ícono con iniciales del usuario
            userIcon.style.display = "flex";
        } else {
            // Mostrar botones de inicio/registro
            loginButtons.classList.remove("hidden");
            userIcon.style.display = "none";
        }
    }

    // Llamar al cargar la página para verificar el estado del login
    checkLoginStatus();
});
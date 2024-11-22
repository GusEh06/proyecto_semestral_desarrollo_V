// Elementos del DOM
const loginButtons = document.getElementById("login-buttons"); // Contenedor de los botones ENTRAR y REGISTRARSE
const userIcon = document.getElementById("user-icon"); // Contenedor del ícono del usuario
const userInitials = document.getElementById("user-initials"); // Elemento donde se mostrarán las iniciales

// Simulación de inicio de sesión (puedes reemplazar estas funciones con tus procesos reales)
function loginUser(token, name) {
    // Guarda el token y el nombre en localStorage
    localStorage.setItem("userToken", token);
    localStorage.setItem("userName", name);

    // Actualiza el estado visual
    checkLoginStatus();
}

function logoutUser() {
    // Eliminar datos de sesión
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");

    // Actualiza el estado visual
    checkLoginStatus();
}

// Validar sesión y actualizar el estado de la UI
function checkLoginStatus() {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");

    if (token && name) {
        // Ocultar botones de inicio/registro
        loginButtons.classList.add("hidden");

        // Mostrar el ícono con las iniciales
        const initials = name
            .split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
        userInitials.textContent = initials;
        userIcon.style.display = "flex";
    } else {
        // Mostrar botones de inicio/registro
        loginButtons.classList.remove("hidden");

        // Ocultar ícono del usuario
        userIcon.style.display = "none";
    }
}

// Llamar la función en el inicio de la página
checkLoginStatus();

// Ejemplo de cómo iniciar sesión manualmente para pruebas
//loginUser("fakeToken123", "María Pérez"); // Prueba con este nombre
//logoutUser(); // Prueba para cerrar sesión

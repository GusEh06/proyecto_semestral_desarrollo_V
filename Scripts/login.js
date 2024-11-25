document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#modal-inicio form");
    const loginModal = document.getElementById("modal-inicio");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const contacto = document.querySelector("#contacto").value || "string";
        const contraseña = document.querySelector("#datapicker").value || "string";

        if (!contacto || !contraseña) {
            alert("Por favor ingresa ambos campos: Correo o Cédula y Contraseña.");
            return;
        }

        const data = {
            usuario_id: 0,
            nombre: "0",
            sexo: "0",
            edad: 0,
            contacto,
            contraseña,
            cedula: "0",
            celular: "0"
        };

        try {
            const response = await fetch("http://localhost:5154/api/Usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });


            if (response.ok) {
                const { token, name } = await response.json();
                localStorage.setItem("userToken", token);
                sessionToken = token;
                localStorage.setItem("userName", name);

                checkLoginStatus(); // Actualiza la UI

                loginModal.close(); // Cierra el modal
                alert("Inicio de sesión exitoso!");
                window.location.reload();
            } else {
                const errorMessage = await response.text();
                alert(`Error al iniciar sesión: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error en el proceso de inicio de sesión.");
        }
    });

    // Función que verifica el estado de login y actualiza la interfaz
    function checkLoginStatus() {
        const userToken = localStorage.getItem("userToken");
        const userName = localStorage.getItem("userName");

        const loginButtons = document.getElementById("login-buttons");
        const userIcon = document.getElementById("user-icon");
        const userInitials = document.getElementById("user-initials");

        if (userToken && userName) {
            // Mostrar el ícono del usuario con iniciales
            loginButtons.style.display = "none";
            userIcon.style.display = "block";
            userInitials.textContent = userName.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase();
        } else {
            // Mostrar botones de login
            loginButtons.style.display = "block";
            userIcon.style.display = "none";
        }
    }

    checkLoginStatus(); // Verificar el estado de login cuando la página cargue
});
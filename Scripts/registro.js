document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#modal-inicio form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Capturar los datos del formulario
        const contacto = document.querySelector("#nombre").value || "string"; // Valor predeterminado
        const contraseña = document.querySelector("#datapicker").value || "string"; // Valor predeterminado

        if (!contacto || !contraseña) {
            alert("Por favor ingresa ambos campos: Correo o Cédula y Contraseña.");
            return;
        }

        // Construir el objeto para enviar con valores predeterminados
        const data = {
            usuario_id: 0, // Valor predeterminado
            nombre:"0",
            sexo: "0", // Valor predeterminado
            edad: 0, // Valor predeterminado
            contacto: contacto, // Correo del usuario
            contraseña: contraseña // Contraseña del usuario
        };

        try {
            // Llamar al API de login
            const response = await fetch("http://localhost:5154/api/Usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) // Enviar los datos con valores predeterminados
            });

            if (response.ok) {
                const { token } = await response.json();
                // Guardar el token en localStorage
                localStorage.setItem("userToken", token);

                // Obtener el nombre del usuario a partir del token o del backend
                const userNameResponse = await fetch(`http://localhost:5154/api/Usuarios/validate?token=${token}`);
                const { contacto: userName } = await userNameResponse.json();
                localStorage.setItem("userName", userName);

                alert("Inicio de sesión exitoso!");
                document.querySelector("#close-modal-inicio-btn").click();
                checkLoginStatus(); // Actualizar la UI
            } else {
                const errorMessage = await response.text();
                alert(`Error al iniciar sesión: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error en el proceso de inicio de sesión.");
        }
    });
});
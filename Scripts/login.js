document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#modal-inicio form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Capturar los datos del formulario
        const contacto = document.querySelector("#nombre").value;
        const contraseña = document.querySelector("#datapicker").value;

        // Validar si los campos están vacíos
        if (!contacto || !contraseña) {
            alert("Por favor ingresa ambos campos: Correo o Cédula y Contraseña.");
            return;
        }

        // Validar el formato del correo
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(contacto)) {
            alert("Por favor ingresa un correo válido.");
            return;
        }

        // Log para verificar los datos
        console.log("Datos a enviar:", {
            contacto,
            contraseña
        });

        // Crear objeto con los datos a enviar
        const data = {
            contacto: contacto, // Correo del usuario
            contraseña: contraseña // Contraseña del usuario
        };

        try {
            // Realizar la solicitud fetch
            const response = await fetch("http://localhost:5154/api/Usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) // Enviar los datos con valores predeterminados
            });

            if (response.ok) {
                const responseData = await response.json(); // Recibir la respuesta
                const { token } = responseData;

                if (token) {
                    // Guardar el token en localStorage
                    localStorage.setItem("userToken", token);

                    // Actualizar la UI o realizar otros pasos
                    alert("Inicio de sesión exitoso!");
                    checkLoginStatus(); // Actualiza el estado visual
                } else {
                    alert("Error: No se recibió un token.");
                }
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

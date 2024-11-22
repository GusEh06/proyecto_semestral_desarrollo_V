document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#modal-inicio form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

               // Capturar los datos del formulario
               const contacto = document.querySelector("#nombre").value || "string"; // Valor predeterminado
               const contraseña = document.querySelector("#datapicker").value || "string"; // Valor predeterminado

        // Validar si los campos están vacíos
        if (!contacto || !contraseña) {
            alert("Por favor ingresa ambos campos: Correo o Cédula y Contraseña.");
            return;
        }

        // Log para verificar los datos
        console.log("Datos a enviar:", {
            contacto,
            contraseña
        });

        // Crear objeto con los datos a enviar
        const data = {
            usuario_id: 0, // Valor predeterminado
            nombre: "0",
            sexo: "0", // Valor predeterminado
            edad: 0, // Valor predeterminado
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
                const { token } = await response.json();
                // Guardar el token en localStorage
                localStorage.setItem("userToken", token);

                // Actualizar la UI o realizar otros pasos
                alert("Inicio de sesión exitoso!");
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
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#modal-inicio form");
    const loginModal = document.getElementById("modal-inicio"); // Selecciona el modal

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const contacto = document.querySelector("#contacto").value || "string";
        const contraseña = document.querySelector("#datapicker").value || "string";

        if (!contacto || !contraseña) {
            alert("Por favor ingresa ambos campos: Correo o Cédula y Contraseña.");
            return;
        }

        console.log("Datos enviados al servidor:", { contacto, contraseña });

        const data = {
            usuario_id: 0,
            nombre: "0",
            sexo: "0",
            edad: 0,
            contacto,
            contraseña,
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
                localStorage.setItem("userName", name);

                checkLoginStatus(); // Actualiza la UI

                loginModal.close(); // Cierra el modal
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

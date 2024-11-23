document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#modal-registro form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        // Capturar los datos del formulario
        const nombre = document.querySelector("#nombre").value;
        const apellido = document.querySelector("#apellido").value;
        const cedula = document.querySelector("#cedula").value;
        const telefono = document.querySelector("#telefono").value;
        const correo = document.querySelector("#correo").value;
        const sexo = document.querySelector("#sexo").value;
        const dia = document.querySelector("#dia").value;
        const mes = document.querySelector("#mes").value;
        const anio = document.querySelector("#anio").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }document.addEventListener("DOMContentLoaded", function () {
            const form = document.querySelector("#modal-registro form");
        
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
        
                // Capturar los datos del formulario
                const nombre = document.querySelector("#nombre").value;
                const apellido = document.querySelector("#apellido").value;
                const cedula = document.querySelector("#cedula").value;
                const telefono = document.querySelector("#telefono").value;
                const correo = document.querySelector("#correo").value;
                const sexo = document.querySelector("#sexo").value;
                const dia = document.querySelector("#dia").value;
                const mes = document.querySelector("#mes").value;
                const anio = document.querySelector("#anio").value;
                const password = document.querySelector("#password").value;
                const confirmPassword = document.querySelector("#confirm-password").value;
        
                // Validar que las contraseñas coincidan
                if (password !== confirmPassword) {
                    alert("Las contraseñas no coinciden.");
                    return;
                }
        
                // Validar campos obligatorios
                if (!nombre || !apellido || !cedula || !telefono || !correo || !sexo || !dia || !mes || !anio || !password) {
                    alert("Por favor, completa todos los campos.");
                    return;
                }
        
                // Crear el objeto para enviar
                const data = {
                    usuario_id: 0,
                    nombre: `${nombre} ${apellido}`,
                    sexo: sexo === "1" ? "Masculino" : "Femenino",
                    edad: calcularEdad(`${anio}-${mes}-${dia}`),
                    contacto: correo,
                    contraseña: password
                };
        
                try {
                    // Llamar al API
                    const response = await fetch("http://localhost:5154/api/Usuarios/CrearUsuario", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
        
                    if (response.ok) {
                        const result = await response.json();
                        alert("Registro exitoso. ¡Bienvenido!");
                        form.reset();
                        document.querySelector("#close-modal-registro-btn").click();
                    } else {
                        const error = await response.text();
                        alert(`Error al registrar: ${error}`);
                    }
                } catch (error) {
                    console.error("Error al llamar al API:", error);
                    alert("Ocurrió un error al procesar tu registro.");
                }
            });
        
            // Función para calcular la edad
            function calcularEdad(fechaNacimiento) {
                const hoy = new Date();
                const fechaNac = new Date(fechaNacimiento);
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const mes = hoy.getMonth() - fechaNac.getMonth();
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }
                return edad;
            }
        });
        
        // Crear el objeto para enviar
        const data = {
            usuario_id: 0,
            nombre: `${nombre} ${apellido}`,
            sexo: sexo === "1" ? "Masculino" : "Femenino",
            edad: calcularEdad(`${anio}-${mes}-${dia}`),
            contacto: correo,
            contraseña: password
        };
        try {
            // Llamar al API
            const response = await fetch("http://localhost:5000/api/Usuarios/CrearUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const result = await response.json();
                alert("Registro exitoso. ¡Bienvenido!");
                form.reset();
                document.querySelector("#close-modal-registro-btn").click();
            } else {
                const error = await response.text();
                alert(`Error al registrar: ${error}`);
            }
        } catch (error) {
            console.error("Error al llamar al API:", error);
            alert("Ocurrió un error al procesar tu registro.");
        }
    });
    // Función para calcular la edad
    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        return edad;
    }
});
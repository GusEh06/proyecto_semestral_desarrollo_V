const apiBaseUrl = 'http://localhost:5154/api';

// Variables globales
let selectedDate = ''; // Fecha seleccionada
let selectedHour = ''; // Hora seleccionada
let doctorSeleccionado = '';
let hospitalSeleccionado = '';
let hospitalNombre = '';
let especialidadNombre = '';
let buttonAgendar = '';
let sessionToken = '';
let data;
let usuarioId = '';
let doctorId = '';

async function cargarHospitales() {
    try {
        const response = await fetch(`${apiBaseUrl}/Hospital`);
        if (!response.ok) throw new Error('Error al obtener los hospitales');

        const data = await response.json();
        const hospitales = data.$values;

        const hospitalDiv = document.getElementById('agendar-hospital');
        const select = document.createElement('select');
        select.name = 'hospital';
        select.id = 'hospital-select';
        select.classList.add('select-h-e');

        const defaultOption = document.createElement('option');
        defaultOption.text = 'Seleccione un hospital';
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        hospitales.forEach(hospital => {
            const option = document.createElement('option');
            option.value = hospital.hospital_id;
            option.className = "dropdown-generar-citas";
            option.text = hospital.nombre;
            select.appendChild(option);
        });

        hospitalDiv.appendChild(select);

        select.addEventListener('change', (event) => {
            hospitalSeleccionado = event.target.value; // Actualiza la variable global
            hospitalNombre = event.target.options[event.target.selectedIndex].text;
            localStorage.setItem("hospitalSeleccionado", hospitalSeleccionado); // Guarda en localStorage para persistencia
            console.log('ID del centro seleccionado:', hospitalSeleccionado);

            // Carga las especialidades del hospital seleccionado
            cargarEspecialidades();
            actualizarTextoCita();
        });
    } catch (error) {
        console.error('Hubo un problema al cargar los hospitales:', error);
    }
}

async function cargarEspecialidades() {
    try {
        console.log('Hospital ID:', hospitalSeleccionado); // Confirmar que hospitalId es válido
        const response = await fetch(`${apiBaseUrl}/Especialidad/Especialidades*Hospital/${hospitalSeleccionado}`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener las especialidades: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data); // Verifica la estructura de los datos

        const especialidades = data.especialidades.$values; // ¿Es esta la ruta correcta?
        console.log('Especialidades:', especialidades); // Verifica si $values contiene los datos

        const especialidadDiv = document.getElementById('agendar-especialidad');
        especialidadDiv.innerHTML = ''; // Limpia el contenido anterior

        const select = document.createElement('select');
        select.name = 'especialidad';
        select.id = 'especialidad-select';
        select.classList.add('select-h-e');

        const defaultOption = document.createElement('option');
        defaultOption.text = 'Seleccione una especialidad';
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        // Aquí ocurre el problema si `especialidades` es undefined
        especialidades.forEach(especialidad => {
            const option = document.createElement('option');
            option.value = especialidad.especialidades_id;
            option.text = especialidad.nombre;
            select.appendChild(option);
        });

        especialidadDiv.appendChild(select);

        select.addEventListener('change', (event) => {
            const especialidadId = event.target.value;
            especialidadNombre = event.target.options[event.target.selectedIndex].text;
            localStorage.setItem("especialidadSeleccionada", especialidadId);
            console.log('ID de la especialidad seleccionada:', especialidadId);
        });
        actualizarTextoCita();
    } catch (error) {
        console.error('Hubo un problema al cargar las especialidades:', error);
    }
}


// Función para manejar la selección de la fecha
document.querySelectorAll('.day-button').forEach(button => {
    button.addEventListener('click', () => {
        // Obtén la fecha del atributo `data-date`
        selectedDate = button.getAttribute('data-date');
        console.log('Fecha seleccionada:', selectedDate);
        actualizarTextoCita(); // Actualiza el texto

        // Resalta el botón seleccionado
        document.querySelectorAll('.day-button').forEach(b => b.classList.remove('selected'));
        button.classList.add('selected');

        // Limpia la selección de médicos si se cambia la fecha
        document.getElementById('agendar-doctor').innerHTML = '';
    });
});

// Función para manejar la selección de la hora
document.querySelectorAll('.hour-button').forEach(button => {
    button.addEventListener('click', () => {
        // Obtén la hora desde el texto del botón y elimina "AM" o "PM"
        selectedHour = button.textContent.trim().replace(/AM|PM/g, '').trim();
        console.log('Hora seleccionada (sin AM/PM):', selectedHour);
        actualizarTextoCita(); // Actualiza el texto

        // Resalta el botón seleccionado
        document.querySelectorAll('.hour-button').forEach(b => b.classList.remove('selected'));
        button.classList.add('selected');

        // Verifica si ya se seleccionó la fecha para cargar los médicos disponibles
        if (selectedDate) {
            cargarDoctoresDisponibles(selectedDate, selectedHour);
        } else {
            console.error('Debe seleccionar una fecha antes de elegir una hora.');
        }
    });
});

// Función para obtener los médicos disponibles
async function obtenerDoctoresDisponibles(fecha, hora) {
    try {
        const response = await fetch(`${apiBaseUrl}/Cupos/CuposDisponibles/${fecha}/${hora}/${hospitalSeleccionado}`);
        if (!response.ok) throw new Error('Error al obtener los doctores disponibles');

        const data = await response.json();
        console.log('Doctores disponibles:', data.$values);
        return data.$values; // Devuelve la lista de médicos
    } catch (error) {
        console.error('Hubo un problema al obtener los doctores disponibles:', error);
        return [];
    }
}

// Función para cargar y mostrar los médicos disponibles
async function cargarDoctoresDisponibles(fecha, hora) {
    try {
        // Obtén los médicos disponibles
        const doctores = await obtenerDoctoresDisponibles(fecha, hora);

        // Muestra los médicos en el DOM
        mostrarDoctores(doctores);
    } catch (error) {
        console.error('Hubo un problema al cargar los médicos disponibles:', error);
    }
}

// Función para mostrar los médicos disponibles en un listbox
function mostrarDoctores(doctores) {
    const doctoresContainer = document.getElementById('agendar-doctor');
    doctoresContainer.innerHTML = ''; // Limpia la lista anterior

    if (doctores.length === 0) {
        doctoresContainer.textContent = 'No hay doctores disponibles para esta fecha y hora.';
        return;
    }

    doctores.forEach(doctor => {
        const button = document.createElement('button');
        button.classList.add('doctor-button');
        button.setAttribute('onclick', "selectButton('doctor-button', this)");
        /*button.classList.add('hour-button');*/
        button.textContent = doctor.medico_nombre;
        button.setAttribute('data-medico-id', doctor.medico_id);

        // Agrega evento al botón para seleccionar al médico
        button.addEventListener('click', () => {
            doctorSeleccionado = doctor.medico_nombre; // Guarda el doctor seleccionado
            doctorId = doctor.medico_id;
            console.log('Médico seleccionado:', doctorSeleccionado, doctorId);
            actualizarTextoCita(); // Actualiza el texto

            // Resalta el botón seleccionado
            document.querySelectorAll('.doctor-button').forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            generarBotonAgendar();
        });

        doctoresContainer.appendChild(button);
    });
}

// Función para actualizar el texto de la cita
function actualizarTextoCita() {
    const textoCita = document.getElementById('texto-cita');

    if (!hospitalNombre || !especialidadNombre || !selectedDate || !selectedHour || !doctorSeleccionado) {
        textoCita.textContent = 'Selecciona todos los datos para agendar la cita.';
        return;
    }

    textoCita.textContent = `Agendar cita en el centro de salud ${hospitalNombre}, en ${especialidadNombre}, día ${selectedDate}, a las ${selectedHour} con el doctor ${doctorSeleccionado}.`;
}


//Función para agendar citas
function generarBotonAgendar() {
    // Verifica si el botón ya está creado
    if (buttonAgendar) return;

    // Crea el botón solo si no existe
    buttonAgendar = document.createElement('button');
    buttonAgendar.id = 'agendar-cita-button'; // Añadimos un id específico
    buttonAgendar.classList.add('agendar-citas-box-2-button-agendar', 'agendar-citas-box-2-e', 'btn-agendar-cita');
    buttonAgendar.textContent = 'Agendar Cita';

    // Obtén el contenedor donde debe ir el botón
    const divButtonContainer = document.getElementById('button-agendar-cita');
    divButtonContainer.innerHTML = ''; // Limpia cualquier contenido previo
    divButtonContainer.appendChild(buttonAgendar); // Agrega el botón al contenedor

    // Añade el evento al botón
    buttonAgendar.addEventListener('click', async function() {
        // Verifica si todos los campos necesarios están completos
        if (!hospitalSeleccionado || !especialidadNombre || !selectedDate || !selectedHour || !doctorSeleccionado) {
            alert("Por favor, completa todos los campos antes de agendar la cita.");
            return;
        }


        // Obtén el ID del usuario desde localStorage
        usuarioId = await obtenerUsuarioId();
            if (!usuarioId) {
                alert("Usuario no válido. Por favor, verifica tus credenciales.", usuarioId);
                return;
            }

        try {
            // 1. Crear la cita
            console.log(usuarioId);
            const crearCitaResponse = await fetch(`${apiBaseUrl}/Citas/Crear/${usuarioId}/${hospitalSeleccionado}/${doctorId}/${selectedDate}/${selectedHour}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!crearCitaResponse.ok) {
                throw new Error('Error al crear la cita');
            }

            const crearCitaData = await crearCitaResponse.json();
            console.log('Cita creada exitosamente:', crearCitaData);

            // 2. Cambiar el estado del cupo
            const cambioEstadoCupoResponse = await fetch(`${apiBaseUrl}/Cupos/CambioEstadoCupo/${selectedDate}/${selectedHour}/${doctorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!cambioEstadoCupoResponse.ok) {
                throw new Error('Error al cambiar el estado del cupo');
            }

            console.log('Estado del cupo actualizado:');

            // Si ambas solicitudes fueron exitosas, muestra un mensaje de éxito
            alert('Cita agendada exitosamente.');



        } catch (error) {
            console.error('Hubo un problema al agendar la cita:', error, );
            alert('Hubo un problema al agendar la cita. Por favor, inténtalo nuevamente.');
        }
    });
}

// Función para validar al usuario y obtener usuario_id
async function obtenerUsuarioId() {
    try {
        const response = await fetch(`${apiBaseUrl}/Usuarios/validate?token=${sessionToken}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Respuesta del servidor:', errorText, sessionToken);
            throw new Error('Error al validar el usuario');
        }

        data = await response.json();
        return data.usuario_id; // Devuelve el usuario_id
    } catch (error) {
        console.error('Hubo un problema al validar el usuario:', error);
        return null;
    }
}


// Llama a la función inicial para cargar hospitales
document.addEventListener('DOMContentLoaded', () => {
    cargarHospitales();
    actualizarTextoCita();
    sessionToken = localStorage.getItem("userToken");
});



// Citas
document.addEventListener('DOMContentLoaded', () => {
    const btnAgendarCita = document.getElementById("btn-agendar-cita");
    const btnVerCitas = document.getElementById("btn-ver-citas");
    const modalInicio = document.getElementById("modal-inicio");
    const userIconBtn = document.querySelector(".user-icon-btn");
    const userInitials = document.getElementById("user-initials");


    sessionToken = localStorage.getItem("userToken");
    

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



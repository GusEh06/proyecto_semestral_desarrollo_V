



// Función para manejar la selección de la fecha
document.querySelectorAll('.day-button').forEach(button => {
    button.addEventListener('click', () => {
        // Obtén la fecha del atributo `data-date`
        selectedDate = button.getAttribute('data-date');
        console.log('Fecha seleccionada:', selectedDate);

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
        const response = await fetch(`${apiBaseUrl}/Cupos/CuposDisponibles/${fecha}/${hora}`);
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
        button.textContent = doctor.medico_nombre;
        button.setAttribute('data-medico-id', doctor.medico_id);

        // Agrega evento al botón para seleccionar al médico
        button.addEventListener('click', () => {
            console.log('Médico seleccionado:', doctor.medico_nombre, 'ID:', doctor.medico_id);

            // Resalta el botón seleccionado
            document.querySelectorAll('.doctor-button').forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
        });

        doctoresContainer.appendChild(button);
    });
}
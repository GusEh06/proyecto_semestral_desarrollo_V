// URL del API
const apiBaseUrl = 'http://localhost:5154/api'; // Cambia a tu URL de API

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

        // Evento para cargar especialidades
        select.addEventListener('change', (event) => {
            const hospitalId = event.target.value;
            cargarEspecialidades(hospitalId);
        });
    } catch (error) {
        console.error('Hubo un problema al cargar los hospitales:', error);
    }
}

// Función para cargar especialidades según el hospital seleccionado
async function cargarEspecialidades(hospitalId) {
    try {
        const response = await fetch(`${apiBaseUrl}/Especialidad/Especialidades*Hospital/${hospitalId}`);
        if (!response.ok) throw new Error('Error al obtener las especialidades');

        const data = await response.json();
        const especialidades = data.especialidades.$values;

        const especialidadDiv = document.getElementById('agendar-especialidad');
        especialidadDiv.innerHTML = ''; // Limpia el contenido anterior

        const select = document.createElement('select');
        select.name = 'especialidad';
        select.id = 'especialidad-select';

        const defaultOption = document.createElement('option');
        defaultOption.text = 'Seleccione una especialidad';
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        especialidades.forEach(especialidad => {
            const option = document.createElement('option');
            option.value = especialidad.especialidades_id;
            option.text = especialidad.nombre;
            select.appendChild(option);
        });

        especialidadDiv.appendChild(select);

        // Evento para manejar la especialidad seleccionada (opcional)
        select.addEventListener('change', (event) => {
            const especialidadId = event.target.value;
            console.log('ID de la especialidad seleccionada:', especialidadId);
        });
    } catch (error) {
        console.error('Hubo un problema al cargar las especialidades:', error);
    }
}


// Llama a la función inicial para cargar hospitales
document.addEventListener('DOMContentLoaded', cargarHospitales);
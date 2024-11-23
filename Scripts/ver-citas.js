// URL base del API
const apiBaseUrl = 'http://localhost:5154'; // Cambia a tu base de URL del API

// Función para obtener el usuario_id mediante el token
async function obtenerUsuarioId(token) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/Usuarios/validate?token=${token}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Respuesta del servidor:', errorText);
            throw new Error('Error al validar el usuario'+response);
        }

        const data = await response.json();
        return data.usuario_id; // Devuelve el usuario_id
    } catch (error) {
        console.error('Hubo un problema al validar el usuario:', error);
        return null;
    }
}


// Función para obtener las citas del usuario
async function obtenerCitasUsuario(usuarioId) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/Citas/UsuariosCitas/${usuarioId}`);
        if (!response.ok) throw new Error('Error al obtener las citas del usuario');

        const data = await response.json();
        return data.$values; // Devuelve la lista de citas
    } catch (error) {
        console.error('Hubo un problema al obtener las citas:', error);
        return [];
    }
}

// Función para mostrar las citas en el DOM
function mostrarCitas(citas) {
    const citasDiv = document.getElementById('citas-usuario');
    citasDiv.innerHTML = ''; // Limpia el contenido anterior

    if (citas.length === 0) {
        citasDiv.textContent = 'No tienes citas agendadas.';
        return;
    }

    const lista = document.createElement('ul');
    citas.forEach(cita => {
        const item = document.createElement('li');
        item.textContent = `Cita ID: ${cita.cita_id}, Fecha: ${cita.fecha}, Hora: ${cita.hora}, Estado: ${cita.estado}`;
        lista.appendChild(item);
    });

    citasDiv.appendChild(lista);
}

// Función principal para cargar las citas
async function cargarCitas(token) {
    try {
        // Obtener el usuario_id mediante el token
        const usuarioId = await obtenerUsuarioId(token);
        if (!usuarioId) throw new Error('No se pudo obtener el usuario ID');

        // Obtener las citas del usuario
        const citas = await obtenerCitasUsuario(usuarioId);

        // Mostrar las citas en el DOM
        mostrarCitas(citas);
    } catch (error) {
        console.error('Hubo un problema al cargar las citas:', error);
    }
}

// Llama a la función principal con el token del usuario
document.addEventListener('DOMContentLoaded', () => {
    let token = localStorage.getItem("userToken");
    cargarCitas(token);
});
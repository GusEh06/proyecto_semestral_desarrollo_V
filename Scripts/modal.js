
// Variables para el modal de registro
const openModalRegistroBtn = document.getElementById('modal-registro-open');
const closeModalRegistroBtn = document.getElementById('close-modal-registro-btn');
const modalRegistro = document.getElementById('modal-registro');

// Variables para el modal de inicio (entrar)
const openModalInicioBtn = document.getElementById('modal-inicio-open');
const closeModalInicioBtn = document.getElementById('close-modal-inicio-btn');
const modalInicio = document.getElementById('modal-inicio');

// Abrir el modal de registro
if (openModalRegistroBtn) {
    openModalRegistroBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        modalRegistro.showModal(); // Muestra el modal de registro
    });
}

// Cerrar el modal de registro
if (closeModalRegistroBtn) {
    closeModalRegistroBtn.addEventListener('click', () => {
        modalRegistro.close(); // Cierra el modal de registro
    });
}

// Abrir el modal de inicio
if (openModalInicioBtn) {
    openModalInicioBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        modalInicio.showModal(); // Muestra el modal de inicio
    });
}

// Cerrar el modal de inicio
if (closeModalInicioBtn) {
    closeModalInicioBtn.addEventListener('click', () => {
        modalInicio.close(); // Cierra el modal de inicio
    });
}

// Cerrar los modales al hacer click fuera de ellos
if (modalRegistro) {
    modalRegistro.addEventListener('click', (e) => {
        if (e.target === modalRegistro) {
            modalRegistro.close(); // Cierra el modal si se hace click fuera del contenido
        }
    });
}

if (modalInicio) {
    modalInicio.addEventListener('click', (e) => {
        if (e.target === modalInicio) {
            modalInicio.close(); // Cierra el modal si se hace click fuera del contenido
        }
    });
};

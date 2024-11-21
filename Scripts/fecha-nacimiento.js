document.addEventListener("DOMContentLoaded", function() {
    // Día: generar opciones del 1 al 31
    const diaSelect = document.getElementById('dia');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        diaSelect.appendChild(option);
    }
  
    // Mes: generar opciones de los 12 meses
    const mesSelect = document.getElementById('mes');
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    meses.forEach((mes, i) => {
        const option = document.createElement('option');
        option.value = i + 1; // Meses numerados del 1 al 12
        option.textContent = mes;
        mesSelect.appendChild(option);
    });
  
    // Año: generar opciones de los últimos 100 años
    const anioSelect = document.getElementById('anio');
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 125; i++) {
        const year = currentYear - i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        anioSelect.appendChild(option);
    }
  });
// Seleccion de Botones
function selectButton(groupClass, selectedButton) {
    // Desmarcar todos los botones del grupo
    const buttons = document.querySelectorAll(`.${groupClass}`);
    buttons.forEach(button => button.classList.remove('active'));
  
    // Marcar solo el botón seleccionado
    selectedButton.classList.add('active');
  }
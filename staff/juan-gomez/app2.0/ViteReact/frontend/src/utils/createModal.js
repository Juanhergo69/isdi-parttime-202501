//Crea y muestra un modal con mensaje//
export const createModal = (message, onCloseCallback) => {
    //Crea elemento div para el modal//
    const modal = document.createElement('div');
    modal.className = 'modal' //Clase CSS para estilos//

    //HTML interno del modal. Muestra el mensaje recibido//
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p> 
        </div>
    `

    //Agrega el modal al body del documento//
    document.body.appendChild(modal)

    //Función para cerrar el modal//
    const closeModal = () => {
        modal.remove() //Elimina el modal del DOM//
        if (onCloseCallback) onCloseCallback() //Ejecuta callback si existe//
    }

    //Cierra al hacer click en cualquier parte del modal//
    modal.addEventListener('click', closeModal)
    //Cierra automáticamente después de 6 segundos//
    setTimeout(closeModal, 6000)

    return modal //Devuelve el modal creado//
}
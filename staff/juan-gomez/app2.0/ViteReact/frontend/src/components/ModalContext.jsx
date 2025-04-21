//Importa las dependencias necesarias de React//
import React, { createContext, useContext, useState } from 'react';

//Crea un contexto para los modales//
const ModalContext = createContext()

//Componente proveedor que envuelve la aplicación//
export const ModalProvider = ({ children }) => {
  //Estado que controla el modal con todas sus propiedades//
  const [modal, setModal] = useState({
    isOpen: false,        //Indica si el modal está visible//
    message: '',          //Mensaje principal del modal//
    title: '',            //Título opcional del modal//
    onConfirm: null,      //Función a ejecutar al confirmar//
    onCancel: null,       //Función a ejecutar al cancelar//
    showCancel: false     //Controla si muestra botón de cancelar//
  })

  //Función para mostrar un modal//
  const createModal = (message, onConfirm, title = '', showCancel = false) => {
    //Actualiza el estado del modal con las nuevas propiedades//
    setModal({
      isOpen: true,                                           //Abre el modal//
      message,                                                //Establece el mensaje//
      title,                                                  //Establece el título (opcional)//
      onConfirm: onConfirm || (() => { }),                    //Función de confirmación con fallback//
      onCancel: () => setModal({ ...modal, isOpen: false }),  //Cierra el modal al cancelar//
      showCancel                                              //Controla visibilidad del botón cancelar//
    })

    //Cierre automático después de 6 segundos solo para modales simples (sin botón cancelar)//
    if (!showCancel) {
      setTimeout(() => {
        //Cierra el modal solo si todavía está abierto//
        setModal(prev => prev.isOpen ? { ...prev, isOpen: false } : prev);
      }, 6000)
    }
  }

  //Función para cerrar el modal y resetear sus valores//
  const closeModal = () => {
    setModal({
      isOpen: false,      //Cierra el modal//
      message: '',        //Limpia el mensaje//
      title: '',          //Limpia el título//
      onConfirm: null,    //Elimina la función de confirmación//
      onCancel: null,     //Elimina la función de cancelación//
      showCancel: false   //Oculta el botón de cancelar//
    })
  }

  return (
    // Provee el contexto a los componentes hijos
    <ModalContext.Provider value={{ createModal, closeModal }}>
      {/* Renderiza los componentes hijos */}
      {children}

      {/* Renderiza el modal si está abierto */}
      {modal.isOpen && (
        // Fondo del modal - se cierra al hacer clic si no tiene botón cancelar
        <div className="modal" onClick={!modal.showCancel ? closeModal : undefined}>
          {/* Contenido del modal - evita la propagación del clic */}
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {/* Muestra el título si existe */}
            {modal.title && <h3>{modal.title}</h3>}

            {/* Muestra el mensaje principal */}
            <p>{modal.message}</p>

            {/* Contenedor de botones de acción */}
            <div className="modal-actions">
              {/* Botón de cancelar (solo visible cuando showCancel es true) */}
              {modal.showCancel && (
                <button className="modal-cancel" onClick={modal.onCancel}>
                  Cancel
                </button>
              )}

              {/* Botón de confirmación */}
              <button
                className="modal-confirm"
                onClick={() => {
                  modal.onConfirm?.()   //Ejecuta la función de confirmación si existe//
                  closeModal()          //Cierra el modal después de confirmar//
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

//Hook personalizado para usar el contexto del modal//
export const useModal = () => useContext(ModalContext)
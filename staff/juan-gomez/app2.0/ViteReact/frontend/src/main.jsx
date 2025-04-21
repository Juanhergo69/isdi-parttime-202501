//Importa la biblioteca React para crear componentes//
import React from 'react'

//Importa ReactDOM desde el paquete react-dom/client para renderizado en el cliente//
import ReactDOM from 'react-dom/client'

//Importa BrowserRouter de react-router-dom para el enrutamiento//
import { BrowserRouter } from 'react-router-dom'

//Importa el componente principal App de tu aplicación//
import App from './App'

//Importa ModalProvider//
import { ModalProvider } from './components/ModalContext'

//Importa los estilos globales CSS para toda la aplicación//
import '../src/styles/base/generals.css'

//Crea un root (raíz) de React en el elemento con id 'app' del DOM//
ReactDOM.createRoot(document.getElementById('app'))
  //Renderiza la aplicación dentro del root creado//
  .render(
    //<React.StrictMode> es un componente que ayuda a detectar problemas potenciales//
    <React.StrictMode>
      {/* 
        BrowserRouter provee el contexto de enrutamiento a toda la aplicación
        Permite la navegación mediante URLs sin recargar la página
      */}
      <BrowserRouter>
        {/* Modal Provider permite aplicar modales reactivos a la app */}
        <ModalProvider>
          {/* Componente principal de la aplicación */}
          <App />
        </ModalProvider>
      </BrowserRouter>
    </React.StrictMode>
  )

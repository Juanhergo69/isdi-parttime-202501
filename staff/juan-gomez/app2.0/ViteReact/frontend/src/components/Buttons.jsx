//Importa la librería React para poder usar componentes de React//
import React from 'react'

//Define un componente Button que recibe props desestructuradas//
const Button = ({ buttonContent, buttonCallback, className }) => {
    return (
        //Renderiza un botón HTML con://
        <button
            className={className}  //Aplica la clase CSS recibida por props//
            onClick={buttonCallback}  //Asigna la función de callback al evento click//
        >
            {buttonContent}  {/*Muestra el contenido del botón recibido por props*/}
        </button>
    )
}

//Define un componente ImgButton que recibe props desestructuradas//
const ImgButton = ({ imgSrc, className, onClick }) => {
    return (
        //Renderiza un botón HTML con://
        <button
            style={{ border: 'none', background: 'transparent' }}  //Estilos inline para quitar borde y fondo//
            onClick={onClick}  //Asigna la función de callback al evento click//
            className={className}  //Aplica la clase CSS recibida por props//
        >
            {/* Renderiza una imagen dentro del botón */}
            <img
                src={imgSrc}  //URL de la imagen recibida por props//
                alt="Button"  //Texto alternativo para accesibilidad//
                style={{ width: '100%', height: 'auto' }}  //Estilos para hacer la imagen responsive//
            />
        </button>
    )
}

//Exporta ambos componentes para que puedan ser usados en otros archivos//
export { Button, ImgButton }
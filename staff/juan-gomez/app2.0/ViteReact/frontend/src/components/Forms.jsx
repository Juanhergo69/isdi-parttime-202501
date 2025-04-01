//Importa la librería React para poder usar componentes//
import React from 'react'

/*Componente Form que recibe props desestructuradas:
 - inputsArray: array de objetos con configuración de inputs
 - submitButtonText: texto del botón de submit
 - onSubmit: función que se ejecuta al enviar el formulario*/
const Form = ({ inputsArray, submitButtonText, onSubmit }) => {
    //Función que maneja el evento submit del formulario//
    const handleSubmit = (event) => {
        event.preventDefault() //Previene el comportamiento por defecto del formulario//

        //Objeto donde se almacenarán los datos del formulario//
        const formData = {}

        //Itera sobre cada input definido en inputsArray//
        inputsArray.forEach(input => {
            /*Guarda el valor del input en formData:
             - Para checkboxes guarda el estado checked (true/false)
             - Para otros tipos guarda el valor del input*/
            if (document.getElementById(input.inputId)) {
                formData[input.inputId] = input.inputType === 'checkbox'
                    ? event.target[input.inputId].checked
                    : event.target[input.inputId].value;
            }
        })

        //Ejecuta la función onSubmit pasándole los datos recolectados//
        onSubmit(formData);
    }

    //Retorna el JSX del componente//
    return (
        /*Formulario con:
         - Clase CSS 'form'
         - Maneja el evento submit con handleSubmit*/
        <form className='form' onSubmit={handleSubmit}>
            {/* Mapea inputsArray para renderizar cada campo */}
            {inputsArray.map(input => (
                /*Contenedor div para cada input:
                - Key único basado en inputId
                - Clase CSS especial para checkboxes*/
                <div key={input.inputId} className={input.inputType === 'checkbox' ? 'checkbox-container' : ''}>
                    {/* Label del input */}
                    <label
                        htmlFor={input.inputId} //Asociación label-input//
                        className={input.inputType === 'checkbox' ? 'checkbox-label' : ''} //Clase CSS para checkboxes//
                    >
                        {input.label} {/* Texto del label */}
                    </label>

                    {/* Render condicional: 
                        1. Si existe customInput, lo renderiza
                        2. Si no, renderiza textarea o input normal según el tipo */}
                    {input.customInput ? (
                        // Renderiza el input personalizado si existe
                        input.customInput
                    ) : input.inputType === 'textarea' ? (
                        //Textarea con://
                        <textarea
                            id={input.inputId} //ID que coincide con el htmlFor del label//
                            placeholder={input.inputPlaceholder} //Texto placeholder//
                            required={input.isRequired} //Si es obligatorio//
                            autoComplete={input.autoComplete || "off"} //Autocompletado//
                        />
                    ) : (
                        //Input normal con://
                        <input
                            type={input.inputType} //Tipo de input (text, checkbox, etc)//
                            id={input.inputId} //ID que coincide con el htmlFor del label//
                            placeholder={input.inputPlaceholder} //Texto placeholder//
                            required={input.isRequired} //Si es obligatorio//
                            className={input.inputType === 'checkbox' ? 'checkbox' : ''} //Clase CSS para checkboxes//
                            autoComplete={input.autoComplete || "off"} //Autocompletado//
                        />
                    )}
                </div>
            ))}
            {/* Input de tipo submit con el texto personalizado */}
            <input type="submit" value={submitButtonText} />
        </form>
    )
}

//Exporta el componente Form como exportación por defecto//
export default Form

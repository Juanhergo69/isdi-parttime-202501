//Importa la biblioteca React para poder crear componentes//
import React from 'react'

//Define el componente Form que recibe tres props: inputsArray, submitButtonText y onSubmit//
const Form = ({ inputsArray, submitButtonText, onSubmit }) => {
    //Función que maneja el evento de envío del formulario//
    const handleSubmit = (event) => {
        //Previene el comportamiento por defecto del formulario (recargar la página)//
        event.preventDefault()
        
        //Objeto donde se almacenarán los datos del formulario//
        const formData = {}

        //Itera sobre cada input definido en inputsArray//
        inputsArray.forEach(input => {
            //Verifica si el input existe en el DOM//
            if (document.getElementById(input.inputId)) {
                //Si el input es un checkbox, guarda su estado checked, de lo contrario guarda su valor//
                formData[input.inputId] = input.inputType === 'checkbox'
                    ? event.target[input.inputId].checked
                    : event.target[input.inputId].value;
            }
        })

        //Llama a la función onSubmit pasada como prop con los datos del formulario//
        onSubmit(formData);
    }

    //Retorna el JSX que representa el formulario//
    return (
        //Formulario con clase 'form' que usa handleSubmit para el evento onSubmit//
        <form className='form' onSubmit={handleSubmit}>
            {/* Mapea cada input en inputsArray para renderizarlo */}
            {inputsArray.map(input => {
                //Si hay un customInput, lo clona y le añade una key única//
                const customInputWithKey = input.customInput 
                    ? React.cloneElement(input.customInput, { 
                        key: `custom-${input.inputId}` 
                      })
                    : null

                //Retorna el contenedor para cada input//
                return (
                    //Div contenedor con key única y clase condicional para checkboxes//
                    <div key={input.inputId} className={input.inputType === 'checkbox' ? 'checkbox-container' : ''}>
                        {/* Si el input tiene label, lo renderiza */}
                        {input.label && (
                            <label
                                htmlFor={input.inputId}
                                className={input.inputType === 'checkbox' ? 'checkbox-label' : ''}
                            >
                                {input.label}
                            </label>
                        )}

                        {/* Renderiza el input apropiado según su tipo */}
                        {input.customInput ? (
                            //Si hay customInput, usa el clonado con key//
                            customInputWithKey
                        ) : input.inputType === 'textarea' ? (
                            //Si es textarea, renderiza un textarea con las props correspondientes//
                            <textarea
                                id={input.inputId}
                                placeholder={input.inputPlaceholder}
                                required={input.isRequired}
                                autoComplete={input.autoComplete || "off"}
                            />
                        ) : (
                            //Para otros tipos de input, renderiza un input estándar//
                            <input
                                type={input.inputType}
                                id={input.inputId}
                                placeholder={input.inputPlaceholder}
                                required={input.isRequired}
                                className={input.inputType === 'checkbox' ? 'checkbox' : ''}
                                autoComplete={input.autoComplete || "off"}
                            />
                        )}
                    </div>
                )
            })}
            {/* Botón de submit con el texto pasado como prop */}
            <input type="submit" value={submitButtonText} />
        </form>
    )
}

//Exporta el componente Form para poder usarlo en otros archivos//
export default Form

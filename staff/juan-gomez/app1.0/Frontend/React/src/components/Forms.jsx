const Form = ({ inputsArray, submitButtonText, onSubmit }) => { //Declaramos Form, que será nuestra función de creación de formularios//
    const handleSubmit = (event) => { //handleSubmit permite manejar el submit del evento//
        event.preventDefault() //prevenimos el comportamiento predeterminado//
        const formData = {} //Llenaremos este objeto con formData//
        inputsArray.forEach(input => { //Validaremos con forEach el comportamiento del input//
            formData[input.inputId] = input.inputType === 'checkbox' //Preguntaremos si el input se trata de un checkbox//
                ? event.target[input.inputId].checked //Si se trata de un checkbox, actuará como tal//
                : event.target[input.inputId].value //Si no lo es, devolverá la id del input predeterminado//
        })
        onSubmit(formData) //Aplicamos onSubmit sobre formData//
    }

    return ( //Devolveremos los siguientes renderizados//
        <form className='form' onSubmit={handleSubmit}>
            {inputsArray.map(input => (
                <div key={input.inputId} className={input.inputType === 'checkbox' ? 'checkbox-container' : ''}>
                    <label
                        htmlFor={input.inputId}
                        className={input.inputType === 'checkbox' ? 'checkbox-label' : ''}
                    >
                        {input.label}
                    </label>
                    {input.inputType === 'textarea' ? (
                        <textarea
                            id={input.inputId}
                            placeholder={input.inputPlaceholder}
                            required={input.isRequired}
                        />
                    ) : (
                        <input
                            type={input.inputType}
                            id={input.inputId}
                            placeholder={input.inputPlaceholder}
                            required={input.isRequired}
                            className={input.inputType === 'checkbox' ? 'checkbox' : ''}
                        />
                    )}
                </div>
            ))}
            <input type="submit" value={submitButtonText} />
        </form>
    )
}


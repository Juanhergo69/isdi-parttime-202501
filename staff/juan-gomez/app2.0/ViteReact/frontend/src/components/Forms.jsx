import React from "react";

const Form = ({ inputsArray, submitButtonText, onSubmit }) => { //Declaramos Form, que será nuestra función de creación de formularios//
    const handleSubmit = (event) => { //handleSubmit permite manejar el submit del 
        event.preventDefault();
        const formData = {};
        inputsArray.forEach(input => {
            formData[input.inputId] = input.inputType === 'checkbox'
                ? event.target[input.inputId].checked
                : event.target[input.inputId].value;
        });
        onSubmit(formData);
    };

    return (
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
    );
};

export default Form

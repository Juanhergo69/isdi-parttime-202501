//Define el componente funcional ProfileStatusForm que recibe props como parámetros//
const ProfileStatusForm = ({ 
    statusText,          //Estado actual del texto de estado (status)//
    setStatusText,       //Función para actualizar el estado del texto//
    handleStatusSubmit,  //Función que maneja el envío del formulario//
    RandomJoke           //Función que genera un chiste aleatorio//
}) => {
    //Retorna el JSX que representa el formulario//
    return (
        //Formulario con clase CSS 'profileStatusForm' que ejecuta handleStatusSubmit al enviarse//
        <form onSubmit={handleStatusSubmit} className="profileStatusForm">
            {/* Etiqueta del campo de texto */}
            <label>Change your status:</label>
            
            {/* Textarea para ingresar/editar el estado (status) */}
            <textarea
                value={statusText}                               //Muestra el valor actual de statusText//                                   
                onChange={(e) => setStatusText(e.target.value)}  //Actualiza statusText cuando el usuario escribe (evento onChange)//
                placeholder="Enter your status"                  //Texto de placeholder//
                required                                         //Hace que el campo sea obligatorio//
            />
            
            {/* Contenedor para los botones de acción */}
            <div className="profileStatusForm-actions">
                {/* Botón para guardar el estado (status) - tipo submit */}
                <button type="submit">Save Status</button>
                
                {/* Botón para generar un estado aleatorio - tipo button (no envía el formulario) */}
                <button
                    type="button"                       //Tipo button para evitar submit del formulario//
                    className="profileRandomizeButton"  //Clase CSS específica//
                    onClick={RandomJoke}                //Ejecuta la función RandomJoke al hacer click//
                >
                    Randomize   {/*Texto del botón*/}
                </button>
            </div>
        </form>
    )
}

//Exporta el componente para poder usarlo en otros archivos//
export default ProfileStatusForm
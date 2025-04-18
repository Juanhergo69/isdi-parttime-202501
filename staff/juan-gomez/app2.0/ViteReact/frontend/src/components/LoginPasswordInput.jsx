//Define el componente funcional LoginPasswordInput que recibe props desestructuradas//
const LoginPasswordInput = ({ 
    id,                 //ID único para el input (requerido)//
    placeholder,        //Texto del placeholder (requerido)//
    showPassword,       //Estado booleano que indica si la contraseña es visible (requerido)//
    setShowPassword,    //Función para actualizar el estado showPassword (requerido)//
    autoComplete = "new-password"  //Valor para autocompletado (opcional, valor por defecto "new-password")//
  }) => {
    //Retorna la estructura JSX del componente//
    return (
      //Contenedor principal con clase CSS para estilizado//
      <div className="register-password-input-container">
        {/* Input de contraseña/texto controlado por showPassword */}
        <input
          type={showPassword ? 'text' : 'password'} //Cambia dinámicamente entre tipo password/text//
          id={id}                                   //ID asignado al input//
          placeholder={placeholder}                 //Texto de placeholder//
          required                                  //Atributo HTML5 para campo obligatorio//
          autoComplete={autoComplete}               //Controla el autocompletado del navegador//
        />
        
        {/* Botón para alternar visibilidad de contraseña */}
        <button
          type="button"                            //Evita que actúe como submit//
          className="register-password-toggle"     //Clase para estilizado//
          onClick={() => setShowPassword(!showPassword)} //Alterna el estado al hacer click//
          aria-label={showPassword ? 'Hide password' : 'Show password'} //Accesibilidad//
        >
          {/* Icono que cambia según el estado (usando Font Awesome) */}
          {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
        </button>
      </div>
    )
  }
  
  //Exporta el componente para poder ser usado en otros archivos//
  export default LoginPasswordInput
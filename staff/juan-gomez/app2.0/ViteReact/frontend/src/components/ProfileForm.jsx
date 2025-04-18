//Define el componente funcional ProfileForm que recibe props como parámetro desestructurado//
const ProfileForm = ({
    formData,                   //Objeto con los datos actuales del formulario//
    errors,                     //Objeto con mensajes de error de validación//
    handleChange,               //Función para manejar cambios en los inputs//
    handleSubmit,               //Función para manejar el envío del formulario//
    showPassword,               //Estado que controla si se muestra la contraseña//
    setShowPassword,            //Función para alternar visibilidad de contraseña//
    showConfirmPassword,        //Estado que controla si se muestra la confirmación de contraseña//
    setShowConfirmPassword,     //Función para alternar visibilidad de confirmación de contraseña//
    imagePreview,               //URL de previsualización de la imagen de perfil//
    selectedImage,              //Archivo de imagen seleccionado//
    onImageChange,              //Función para manejar cambio de imagen//
    removeImage,                //Función para eliminar imagen seleccionada//
    navigation,                 //Objeto para manejar navegación//
    OnDeleteAccount,            //Función para manejar eliminación de cuenta//
    showStatusForm              //Booleano que indica si el formulario de estado está visible//
}) => {
    return (
        //Formulario principal con://
        //- onSubmit: maneja el envío del formulario//
        //- className: aplica clase condicional basada en showStatusForm//
        <form onSubmit={handleSubmit} className={`profileForm ${showStatusForm ? 'with-status-form' : 'centered'}`}>
            
            {/* Grupo de campos para la imagen de perfil */}
            <div className="profileForm-group">
                <label>Profile Image:</label>
                <div className="profile-optimized-image-section">
                    
                    {/* Fila de controles para la imagen */}
                    <div className="profile-image-controls-row">
                        {/* Label estilizado para el input de archivo */}
                        <label htmlFor="avatar-upload" className="profile-image-upload-label">
                            <i className="fas fa-image"></i> {imagePreview ? 'Change Image' : 'Add Image'}
                        </label>
                        
                        {/* Input real para subir archivos (oculto visualmente) */}
                        <input
                            type="file"                     //Tipo input para selección de archivos//
                            id="avatar-upload"              //ID para asociar con el label//
                            accept="image/*"                //Acepta solo archivos de imagen//
                            onChange={onImageChange}        //Maneja cambio de archivo seleccionado//
                            style={{ display: 'none' }}     //Oculta el input nativo//
                        />
                        
                        {/* Botón para remover imagen (solo visible si hay imagePreview) */}
                        {imagePreview && (
                            <button
                                type="button"               //Tipo button para evitar submit//
                                className="profile-remove-image-button"
                                onClick={removeImage}       //Ejecuta función para remover imagen//
                            >
                                <i className="fas fa-times"></i> Remove
                            </button>
                        )}
                    </div>

                    {/* Muestra el nombre del archivo seleccionado (si existe) */}
                    {selectedImage && (
                        <div className="profile-compact-image-info">
                            <span className="profile-image-filename">{selectedImage.name}</span>
                        </div>
                    )}

                    {/* Muestra la previsualización de la imagen (si existe) */}
                    {imagePreview && (
                        <div className="profile-constrained-preview">
                            <img
                                src={imagePreview}          //URL de la imagen a mostrar//
                                alt="Preview"               //Texto alternativo//
                                className="profile-compact-image-preview" //Clase para estilos//
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Grupo de campos para el nombre de usuario */}
            <div className="profileForm-group">
                <label htmlFor="userName">Username:</label>
                <input
                    type="text"                                 //Input de tipo texto//
                    id="userName"                               //ID para asociar con el label//
                    name="userName"                             //Nombre del campo para el formulario//
                    value={formData.userName}                   //Valor controlado desde el estado//
                    onChange={handleChange}                     //Maneja cambios en el input//
                    className={errors.userName ? 'error' : ''}  //Clase condicional para errores//
                />
                {/* Muestra mensaje de error si existe */}
                {errors.userName && <span className="profile-error-message">{errors.userName}</span>}
            </div>

            {/* Grupo de campos para el email */}
            <div className="profileForm-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"                    //Input de tipo email con validación nativa//
                    id="email"                     
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Grupo de campos para la nueva contraseña */}
            <div className="profileForm-group">
                <label htmlFor="password">New Password:</label>
                <div className="profile-password-input-container">
                    <input
                        type={showPassword ? 'text' : 'password'} //Alterna entre texto y password//
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                    />
                    {/* Botón para alternar visibilidad de la contraseña */}
                    <button
                        type="button"                                                  //Evita que dispare el submit//
                        className="profile-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}                 //Alterna estado//
                        aria-label={showPassword ? 'Hide password' : 'Show password'}  //Accesibilidad//
                    >
                        {/* Icono que cambia según el estado */}
                        {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Grupo de campos para confirmar nueva contraseña */}
            <div className="profileForm-group">
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <div className="profile-password-input-container">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                        type="button"
                        className="profile-password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                        {showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            {/* Contenedor de botones de acción principales */}
            <div className="profileForm-actions">
                {/* Botón para guardar cambios (dispara el submit del formulario) */}
                <button type="submit" className="profileButtonSaveChanges">Save Changes</button>
                
                {/* Botón para cancelar (navega a home) */}
                <button
                    type="button"                               //Evita que dispare el submit//
                    className="profileButtonCancel"
                    onClick={() => navigation.navigateToHome()} //Navega a home//
                >
                    Cancel
                </button>
            </div>

            {/* Sección para eliminar cuenta */}
            <div className="profile-delete-account-section">
                <button
                    type="button"
                    className="profileButtonDeleteAccount"
                    onClick={OnDeleteAccount}       //Ejecuta función para eliminar cuenta//
                >
                    <i className="fas fa-trash-alt"></i> Delete Account
                </button>
            </div>
        </form>
    )
}

//Exporta el componente como default para poder importarlo en otros archivos//
export default ProfileForm
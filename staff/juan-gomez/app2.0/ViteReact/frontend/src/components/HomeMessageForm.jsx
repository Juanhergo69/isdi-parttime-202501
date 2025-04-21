//Define el componente funcional HomeMessageForm que recibe props como parámetros//
const HomeMessageForm = ({ 
  onSubmitMessage,  //Función que se ejecuta al enviar el formulario//
  selectedImage,    //Objeto que representa la imagen seleccionada//
  onImageChange,    //Función que maneja el cambio de imagen//
  removeImage,      //Función para eliminar la imagen seleccionada//
  imagePreview      //URL de la vista previa de la imagen//
}) => {
  return (
    //Formulario principal con clase CSS y manejador de envío//
    <form id="sendMsgForm" className="homeSendMsgForm" onSubmit={onSubmitMessage}>
      {/* Input para el título del mensaje */}
      <input
        type="text"                     //Tipo de input: texto//
        id="title"                      //ID para asociar con labels//
        placeholder="Enter your title"  //Texto de placeholder//
        required                        //Campo obligatorio//
        name="title"                    //Nombre del campo para el formulario//
      />

      {/* Textarea para el contenido del mensaje */}
      <textarea
        id="msg"                          //ID para asociar con labels//
        className="textarea"              //Clase CSS para estilización//
        placeholder="Enter your message"  //Texto de placeholder//
        required                          //Campo obligatorio//
        name="msg"                        //Nombre del campo para el formulario//
      ></textarea>

      {/* Sección para manejo de imágenes */}
      <div className="home-optimized-image-section">
        {/* Fila de controles para la imagen */}
        <div className="home-image-controls-row">
          {/* Label personalizado para el input de subida de archivos */}
          <label htmlFor="image-upload" className="home-image-upload-label">
            {/* Icono de imagen + texto que cambia según si hay imagen seleccionada */}
            <i className="fas fa-image"></i> {selectedImage ? 'Change Image' : 'Add Image'}
          </label>
          {/* Input real para subir archivos (oculto visualmente) */}
          <input
            type="file"                  //Tipo de input: archivo//
            id="image-upload"            //ID que coincide con el label//
            accept="image/*"             //Solo acepta archivos de imagen//
            name="image"                 //Nombre del campo para el formulario//
            onChange={onImageChange}     //Manejador de cambio de archivo//
            style={{ display: 'none' }}  //Oculta el input (se usa el label personalizado)//
          />
          {/* Botón para eliminar imagen (solo visible si hay imagen seleccionada) */}
          {selectedImage && (
            <button
              type="button"                         //Tipo button para evitar submit del formulario//
              className="home-remove-image-button"  //Clase CSS//
              onClick={removeImage}                 //Manejador de clic para eliminar imagen//
            >
              {/* Icono de cerrar + texto */}
              <i className="fas fa-times"></i> Remove
            </button>
          )}
        </div>

        {/* Muestra información de la imagen (solo si hay imagen seleccionada) */}
        {selectedImage && (
          <div className="home-compact-image-info">
            {/* Muestra el nombre del archivo de imagen */}
            <span className="home-image-filename">{selectedImage.name}</span>
          </div>
        )}

        {/* Muestra vista previa de la imagen (solo si hay imagePreview) */}
        {imagePreview && (
          <div className="home-constrained-preview">
            {/* Elemento img que muestra la vista previa */}
            <img
              src={imagePreview}                      //URL de la imagen//
              alt="Preview"                           //Texto alternativo//
              className="home-compact-image-preview"  //Clase CSS//
            />
          </div>
        )}
      </div>

      {/* Botón de submit del formulario */}
      <input type="submit" value="Post Message" />
    </form>
  )
}

//Exporta el componente para poder usarlo en otros archivos//
export default HomeMessageForm
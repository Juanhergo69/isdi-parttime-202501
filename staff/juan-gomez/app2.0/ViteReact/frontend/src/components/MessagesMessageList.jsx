//Importa el componente MessagesMessageItem que se usará para renderizar cada mensaje individual//
import MessagesMessageItem from "./MessagesMessageItem"

//Define el componente funcional MessagesMessageList que recibe las props://
//- userMessages: array de mensajes del usuario//
//- users: array de información de usuarios//
//- handleDelete: función para manejar la eliminación de mensajes//
const MessagesMessageList = ({ userMessages, users, handleDelete }) => {
    //Retorna el JSX que será renderizado por este componente//
    return (
        //Contenedor principal de la lista de mensajes//
        <div className="messagesMsgContainer">
            {/* Operador ternario que verifica si hay mensajes */}
            {userMessages.length > 0 ? (
                //Si hay mensajes (> 0), mapea cada mensaje para renderizarlo//
                userMessages.map((message) => (
                    //Para cada mensaje, renderiza el componente MessagesMessageItem//
                    //con las siguientes props://
                    //- key: identificador único (usando la fecha del mensaje)//
                    //- message: objeto con los datos del mensaje actual//
                    //- users: información de usuarios para relacionar con el mensaje//
                    //- handleDelete: función para eliminar este mensaje específico//
                    <MessagesMessageItem 
                        key={message.date}
                        message={message}
                        users={users}
                        handleDelete={handleDelete}
                    />
                ))
            ) : (
                //Si NO hay mensajes (length === 0), muestra este mensaje alternativo//
                <div className="no-messages">You haven't posted any messages yet.</div>
            )}
        </div>
    )
}

//Exporta el componente MessagesMessageList para que pueda ser usado en otros archivos//
export default MessagesMessageList
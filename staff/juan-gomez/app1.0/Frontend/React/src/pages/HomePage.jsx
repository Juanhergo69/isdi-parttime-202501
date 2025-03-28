const HomePage = ({ navigation }) => { //Declaramos la página Home, y le aplicaremos la función navegación//
    const [showMenu, setShowMenu] = React.useState(false) //El menu no se renderizará de forma predeterminada//
    const [showMsgForm, setShowMsgForm] = React.useState(false) //El formulario de envío de mensajes no se renderizará de forma predeterminada//
    const [messages, setMessages] = React.useState(getMessages()) //Los mensajes enviados y almacenados se renderizarán a través de la función getMessages//
    const users = getUsers() //Los usuarios se localizarán en base a la función getUsers//
    const loggedUserId = getLoggedUserId() //La id del usuario logueado se localizará en base a la función getLoggedUserId//
    const loggedUser = users.find(user => user.id === loggedUserId) //El usuario logeado, se localizará buscando (find) en la base de usuarios a través de su id//

    React.useEffect(() => { //Creamos varios efectos//
        const handleClickOutside = (e) => { //Este efecto capturará el cierre del menú//
            if (showMenu && !e.target.closest('.menuButton') && !e.target.closest('.menuDropContainer')) { //Si se clicka fuera de la pantalla teniendo abierto menuButton (y mostrando de hecho, menuDropContainer)//
                setShowMenu(false) //Seteamos el menu en false, para que se oculte//
            }
        }

        document.addEventListener('click', handleClickOutside) //Si se produce el click, y se aplica la función handleClickOutside//
        return () => document.removeEventListener('click', handleClickOutside) //Devolvemos la eliminación del evento//
    }, [showMenu]) //Y mostraremos el menú//

    const handleLike = (messageId) => { //Este efecto manejará los likes//
        toggleLike(messageId, loggedUserId) //Aplicamos la función toogleLike sobre la id del mensaje y la id del usuario logueado//
        setMessages(getMessages()) //Seteamos los mensajes en base a la función getMessages//
    };

    const handleDislike = (messageId) => { //Este efecto manejará los dislikes//
        toggleDislike(messageId, loggedUserId) //Aplicamos la función toogleDislike sobre la id del mensaje y la id del usuario logueado//
        setMessages(getMessages()) //Seteamos los mensajes en base a la función getMessages//
    };

    const handleSubmitMessage = (e) => { //Este efecto manejará el evento del envío del mensaje desde el formulario (sendMsgForm)//
        e.preventDefault() //Prevenimos el comportamiento predeterminado del evento//
        const title = e.target.title.value //El titulo será el valor del target del evento del titulo//
        const msg = e.target.msg.value //El mensaje será el valor del target del evento del mensaje//

        if (!validateTitle(title)) { //Pasamos al título su validación, y si no la pasa//
            createModal('Title cannot exceed 5 words') //Se renderiza un modal indicando el error//
            return //Lo devolvemos//
        }

        if (!validateTextarea(msg)) { //Pasamos al textarea (zona de escritura del mensaje) su validación, y si no la pasa//
            createModal('Message cannot exceed 100 words') //Se renderiza un modal indicando el error//
            return //Lo devolvemos//
        }

        storeMsg(loggedUserId, title, msg, new Date()) //Si se pasan las validaciones, se ejecutará el almacenamiento de mensajes, en base a la id del usuario logueado, título, mensaje y fecha en la que se produce//
        setMessages(getMessages()) //Seteamos los mensajes en base a la función getMessages//
        e.target.reset() //Resetamos el target del evento//
        setShowMsgForm(false) //Seteamos showMsgForm a false, para ocultarlo//
        createModal('Message stored successfully!') //Y creamos un modal indicando que el mensaje se ha almacenado)
    }

    const handleLogout = () => { //Este efecto manejará el logout//
        sessionStorage.removeItem('id') //Eliminamos la id de sessionStorage//
        localStorage.removeItem('id') //Eliminamos la id de localStorage//
        navigation.navigateToLogin() //Ejecutamos la navegación para ir a la página de login//
    }

    if (!loggedUserId) { //Validamos la navegación a login, en base a la inexistencia de un usuario logueado//
        navigation.navigateToLogin() //Ejecutamos la navegación para ir a la página de login//
        return null //Devolvemos indefinido//
    }

    return ( //Devolveremos los siguientes renderizados//
        <div className="homePageContainer">
            <div className="homeHeaderContainer">
                <div className="homeImgContainer">
                    <img src="Logo.jpg" className="homeImg" alt="Logo" />
                    <button
                        className="toggleSendMsgFormButton"
                        onClick={() => setShowMsgForm(!showMsgForm)}
                    >
                        {showMsgForm ? 'Hide Form' : 'New Post'}
                    </button>
                </div>

                <h1 className="homeMsg">Welcome, {(loggedUser && loggedUser.userName) || 'User'}</h1>

                <button
                    className="menuButton"
                    onClick={() => setShowMenu(!showMenu)}
                    aria-expanded={showMenu}
                    aria-label="User menu"
                >
                    {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
                </button>

                {showMenu && (
                    <div className="menuDropContainer">
                        <button className="profileButton" onClick={() => navigation.navigateToProfile()}>
                            <i className="fas fa-user"></i> Profile
                        </button>
                        <button className="settingsButton" onClick={() => createModal('Settings page not implemented')}>
                            <i className="fas fa-cog"></i> Settings
                        </button>
                        <button className="logoutButton" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                )}
            </div>

            <div className="msgContainer">
                {showMsgForm && (
                    <form className="sendMsgForm" onSubmit={handleSubmitMessage}>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter your title"
                            required
                            name="title"
                        />
                        <textarea
                            id="msg"
                            placeholder="Enter your message"
                            required
                            name="msg"
                        ></textarea>
                        <input type="submit" value="Post Message" />
                    </form>
                )}

                <div className={`userMsgForm ${showMsgForm ? 'with-form' : 'centered'}`}>
                    <div className="userMsgContainer">
                        {messages.map((message) => {
                            const author = users.find(u => u.id === message.userId);
                            const hasLiked = message.likes && message.likes.includes(loggedUserId);
                            const hasDisliked = message.dislikes && message.dislikes.includes(loggedUserId);
                            const likesCount = (message.likes && message.likes.length) || 0;
                            const dislikesCount = (message.dislikes && message.dislikes.length) || 0;

                            const likedUsers = message.likes
                                ? message.likes.map(likeUserId => {
                                    const user = users.find(u => u.id === likeUserId);
                                    return user ? user.userName : 'Unknown';
                                })
                                : []

                            const dislikedUsers = message.dislikes
                                ? message.dislikes.map(dislikeUserId => {
                                    const user = users.find(u => u.id === dislikeUserId);
                                    return user ? user.userName : 'Unknown';
                                })
                                : []

                            return (
                                <div key={message.date} className="message">
                                    <div className="message-user">User: {(author && author.userName) || 'Unknown'}</div>
                                    <div className="message-title">Title: {message.title}</div>
                                    <div className="message-text">Message: {message.msg}</div>
                                    <div className="message-date">Date: {message.date}</div>

                                    <div className="message-actions">
                                        <div className="like-container">
                                            <button
                                                className="like-button"
                                                onClick={() => handleLike(message.date)}
                                                aria-label="Like"
                                            >
                                                <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
                                                <span className="message-likes">({likesCount})</span>
                                            </button>
                                            {likedUsers.length > 0 && (
                                                <div className="users-tooltip likes-tooltip">
                                                    {likedUsers.slice(0, 3).join(', ')}
                                                    {likedUsers.length > 3 && (
                                                        <span className="users-count">
                                                            {` and ${likedUsers.length - 3} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="dislike-container">
                                            <button
                                                className="dislike-button"
                                                onClick={() => handleDislike(message.date)}
                                                aria-label="Dislike"
                                            >
                                                <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>
                                                <span className="message-dislikes">({dislikesCount})</span>
                                            </button>
                                            {dislikedUsers.length > 0 && (
                                                <div className="users-tooltip dislikes-tooltip">
                                                    {dislikedUsers.slice(0, 3).join(', ')}
                                                    {dislikedUsers.length > 3 && (
                                                        <span className="users-count">
                                                            {` and ${dislikedUsers.length - 3} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
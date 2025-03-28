import React from 'react'; // Importar React (opcional pero recomendado en Vite)
import { toggleLike, toggleDislike, storeMsg } from '../utils/data.js'
import { getMessages, getLoggedUserId, getUsers, createModal, validateTitle, validateTextarea } from '../utils/utils.js';
import '../index.css';

const HomePage = ({ navigation }) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [showMsgForm, setShowMsgForm] = React.useState(false);
    const [messages, setMessages] = React.useState(getMessages());
    const users = getUsers();
    const loggedUserId = getLoggedUserId();
    const loggedUser = users.find(user => user.id === loggedUserId);

    // Cerrar menú al hacer clic fuera
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (showMenu && !e.target.closest('.menuButton') && !e.target.closest('.menuDropContainer')) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showMenu]);

    const handleLike = (messageId) => {
        toggleLike(messageId, loggedUserId);
        setMessages(getMessages());
    };

    const handleDislike = (messageId) => {
        toggleDislike(messageId, loggedUserId);
        setMessages(getMessages());
    };

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const msg = e.target.msg.value;

        if (!validateTitle(title)) {
            createModal('Title cannot exceed 5 words');
            return;
        }

        if (!validateTextarea(msg)) {
            createModal('Message cannot exceed 100 words');
            return;
        }

        storeMsg(loggedUserId, title, msg, new Date());
        setMessages(getMessages());
        e.target.reset();
        setShowMsgForm(false);
        createModal('Message stored successfully!');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('id');
        localStorage.removeItem('id');
        navigation.navigateToLogin();
    };

    // Si no hay usuario logueado, redirigir a login
    if (!loggedUserId) {
        navigation.navigateToLogin();
        return null;
    }

    return (
        <div className="homePageContainer">
            {/* Encabezado */}
            <div className="homeHeaderContainer">
                <div className="homeImgContainer">
                    <img src="/Logo.jpg" className="homeImg" alt="Logo" />
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

            {/* Área de contenido */}
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

                            // Obtener nombres de usuarios que dieron like
                            const likedUsers = message.likes
                                ? message.likes.map(likeUserId => {
                                    const user = users.find(u => u.id === likeUserId);
                                    return user ? user.userName : 'Unknown';
                                })
                                : [];

                            // Obtener nombres de usuarios que dieron dislike
                            const dislikedUsers = message.dislikes
                                ? message.dislikes.map(dislikeUserId => {
                                    const user = users.find(u => u.id === dislikeUserId);
                                    return user ? user.userName : 'Unknown';
                                })
                                : [];

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
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage

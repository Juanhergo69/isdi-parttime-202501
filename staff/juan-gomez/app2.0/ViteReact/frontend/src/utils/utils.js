export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const STORAGE_KEYS = {
    USERS: 'users',
    MESSAGES: 'messages',
    ID: 'id'
};

export const getUsers = () => {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    return usersJson ? JSON.parse(usersJson) : [];
};

export const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getMessages = () => {
    const messagesJson = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return messagesJson ? JSON.parse(messagesJson) : [];
};

export const saveMessages = (messages) => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
};

export const getLoggedUserId = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ID)) ||
        JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ID));
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
};

export const validateTitle = (title) => {
    const words = title.split(/\s+/).filter(word => word.length > 0);
    return words.length <= 5;
};

export const validateTextarea = (textarea) => {
    const words = textarea.split(/\s+/).filter(word => word.length > 0);
    return words.length <= 100;
};

export const createModal = (message, onCloseCallback) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
        modal.remove();
        if (onCloseCallback) onCloseCallback();
    };

    modal.addEventListener('click', closeModal);
    setTimeout(closeModal, 6000);

    return modal;
};



import { saveMessages, getMessages } from './utils.js'

export const storeMsg = (loggedUserUserId, title, msg, date) => {
    if (!title || !msg) {
        createModal('All fields are required. The message has not been stored');
        return;
    }

    const messages = getMessages();
    const objectUserMsg = {
        userId: loggedUserUserId,
        title: title,
        msg: msg,
        date: date.toLocaleString(),
        likes: [],
        dislikes: []
    };

    messages.push(objectUserMsg);
    saveMessages(messages);
};

export const toggleLike = (messageId, userId) => {
    const messages = getMessages();
    const message = messages.find(msg => msg.date === messageId);

    if (message) {
        const userLikeIndex = message.likes.indexOf(userId);
        const userDislikeIndex = message.dislikes.indexOf(userId);

        if (userLikeIndex === -1) {
            message.likes.push(userId);
            if (userDislikeIndex !== -1) {
                message.dislikes.splice(userDislikeIndex, 1);
            }
        } else {
            message.likes.splice(userLikeIndex, 1);
        }
        saveMessages(messages);
    }
};

export const toggleDislike = (messageId, userId) => {
    const messages = getMessages();
    const message = messages.find(msg => msg.date === messageId);

    if (message) {
        const userDislikeIndex = message.dislikes.indexOf(userId);
        const userLikeIndex = message.likes.indexOf(userId);

        if (userDislikeIndex === -1) {
            message.dislikes.push(userId);
            if (userLikeIndex !== -1) {
                message.likes.splice(userLikeIndex, 1);
            }
        } else {
            message.dislikes.splice(userDislikeIndex, 1);
        }
        saveMessages(messages);
    }
};
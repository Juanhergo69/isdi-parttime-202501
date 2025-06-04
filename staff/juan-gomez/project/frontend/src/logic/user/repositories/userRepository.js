export const getAllUsers = () => {
    return JSON.parse(sessionStorage.getItem('retroUsers') || '[]')
}

export const saveAllUsers = (users) => {
    sessionStorage.setItem('retroUsers', JSON.stringify(users))
}

export const findUserById = (userId) => {
    const users = getAllUsers()
    return users.find(user => user.id === userId)
}

export const updateUser = (userId, updates) => {
    const users = getAllUsers()
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) throw new Error('User not found')

    const updatedUser = { ...users[userIndex], ...updates }
    users[userIndex] = updatedUser
    saveAllUsers(users)

    return updatedUser
}

export const deleteUser = (userId) => {
    const users = getAllUsers()
    const updatedUsers = users.filter(user => user.id !== userId)
    saveAllUsers(updatedUsers)
}


export const getUserFavorites = (userId) => {
    const user = findUserById(userId);
    return user?.favorites || [];
}

export const addUserFavorite = (userId, gameId) => {
    const users = getAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) throw new Error('User not found');

    const user = users[userIndex];
    const favorites = user.favorites || [];

    if (!favorites.includes(gameId)) {
        users[userIndex] = {
            ...user,
            favorites: [...favorites, gameId]
        };
        saveAllUsers(users);
    }

    return users[userIndex];
}

export const removeUserFavorite = (userId, gameId) => {
    const users = getAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) throw new Error('User not found');

    const user = users[userIndex];
    const favorites = user.favorites || [];

    users[userIndex] = {
        ...user,
        favorites: favorites.filter(id => id !== gameId)
    };

    saveAllUsers(users);
    return users[userIndex];
}

export const isGameInFavorites = (userId, gameId) => {
    const favorites = getUserFavorites(userId);
    return favorites.includes(gameId);
}
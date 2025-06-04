export const getUsers = () => {
    return JSON.parse(sessionStorage.getItem('retroUsers')) || []
}

export const saveUsers = (users) => {
    sessionStorage.setItem('retroUsers', JSON.stringify(users))
}

export const setUserSession = (userId, rememberMe = false) => {
    if (rememberMe) {
        localStorage.setItem('retroUser', JSON.stringify(userId))
    } else {
        sessionStorage.setItem('retroUser', JSON.stringify(userId))
    }
}

export const clearUserSession = () => {
    sessionStorage.removeItem('retroUser')
    localStorage.removeItem('retroUser')
}

export const getCurrentUserId = () => {
    return JSON.parse(localStorage.getItem('retroUser') || sessionStorage.getItem('retroUser'))
}


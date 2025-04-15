//Handler para logout//
export const handleLogout = () => {
    sessionStorage.removeItem('id') //Se elimina la id de sessionStorage//
    localStorage.removeItem('id') //Se elimina la id de local storage//
    return true
}
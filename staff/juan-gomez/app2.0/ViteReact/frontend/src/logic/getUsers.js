//Exporta una función constante llamada getUsers que no recibe parámetros//
export const getUsers = () => {
    //Realiza una petición HTTP GET al endpoint '/api/users' del servidor local//
    return fetch('http://localhost:3001/api/users')
        //Maneja la respuesta inicial del servidor (primera promesa)//
        .then(response => {
            //Verifica si la respuesta no fue exitosa (código de estado HTTP fuera del rango 200-299)//
            if (!response.ok) {
                //Lanza un error personalizado si la respuesta no fue exitosa//
                throw new Error('Failed to fetch users')
            }
            //Convierte la respuesta del servidor a formato JSON y la pasa al siguiente 'then'//
            return response.json()
        })
        //Maneja los datos convertidos a JSON (segunda promesa)//
        .then(data => {
            //Verifica si la propiedad 'success' del objeto data es verdadera//
            if (data.success) {
                //Si la operación fue exitosa, retorna el array de usuarios//
                return data.users
            }
            //Si la operación no fue exitosa, lanza un error personalizado//
            throw new Error('Failed to load users')
        })
}
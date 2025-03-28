const ProfilePage = ({ navigation }) => { //Declaramos la página de perfil y le aplicamos la función de navegación//
    const users = getUsers() //Se capturarán los usuarios en base a la función getUsers//
    const loggedUserId = getLoggedUserId() //Se capturará la id del usuario en base a la función getLoggetUserId//
    const loggedUser = users.find(user => user.id === loggedUserId) //Se localizará al usuario logueado, buscando (find) en base a la id//

    // Estado para los campos del formulario - Reemplaza el operador opcional
    const [formData, setFormData] = React.useState({ //Manejamos el estado de formData//
        userName: (loggedUser && loggedUser.userName) || '', //Si loggedUser existe, y tiene userName, usa ese valor o devuelve nada//
        email: (loggedUser && loggedUser.email) || '', //Si el email existe, usa el valor del email del usuario logueado o devuelve nada//
        password: '', //La contraseña se setea como valor vacío//
        confirmPassword: '' //La confirmación de contraseña se setea como valor vacío//
    });

    const [errors, setErrors] = React.useState({}) //Manejamos el estado de los errores//

    if (!loggedUserId) { //Si no hay usuario logueado//
        navigation.navigateToLogin() //Navegamos a la página de login//
        return null //Devolvemos null//
    }

    const handleChange = (e) => { //Manejamos el cambio del evento (cambiar inputs)//
        const { name, value } = e.target //Se declara que el target del evento es el valor del nombre//
        setFormData(prev => ({  //Seteamos formData al estado previo//
            ...prev, //Copiamos el estado previo//
            [name]: value //Cambio solo el valor del input que coincide con name//
        }));

        if (errors[name]) { //Si existen erres en name//
            setErrors(prev => ({ //Seteamos el error al estado previo//
                ...prev, //Copiamos el estado previo//
                [name]: '' //Y se limpia name//
            }))
        }
    }

    const validateForm = () => { //Validaremos el formulario de cambio de nombre, email y contraseña//
        const newErrors = {} //Almacenaremos los nuevos errores en un objeto//

        if (!formData.userName.trim()) { //Si no se pone nombre de usuario//
            newErrors.userName = 'Username is required' //Se renderizará el error indicandolo//
        }

        if (!formData.email.trim()) { //Si no se pone email//
            newErrors.email = 'Email is required' //Se renderizará el error indicandolo//
        } else if (!validateEmail(formData.email)) { //Y si lo anterior no se cumple, pero el input no pasa la validación de email//
            newErrors.email = 'Invalid email format' //Se renderizará el error indicandolo//
        }

        if (formData.password || formData.confirmPassword) { //Si la contraseña o la confirmación de contraseña...//
            if (formData.password.length < 6) { //No cumple con una longitud mínima de 6 caracteres//
                newErrors.password = 'Password must be at least 6 characters' //Se renderiza el error indicándolo//
            } else if (!validatePassword(formData.password)) { //Si lo anterior no se cumple, pero el input no pasa la validación de constraseña//
                newErrors.password = 'Password must contain at least one uppercase, one lowercase, one number and one special character' //Se renderiza el error indicandolo//
            }

            if (formData.password !== formData.confirmPassword) { //Si el input de contraseña no coincide con el input de confirmación de contraseña//
                newErrors.confirmPassword = 'Passwords do not match' //Se renderiza el error indicandolo//
            }
        }

        setErrors(newErrors) //Seteamos los errores en base a los nuevos errores//
        return Object.keys(newErrors).length === 0 //Devolvemos el array con los nuevos errores. Si el length es 0, no hay errores y devuelve false. Si los hay, devuelve true//
    };

    const handleSubmit = (e) => { //Manejamos el envío de la información (evento)//
        e.preventDefault() //Prevenimos los comportamientos predeterminados//

        if (!validateForm()) { //Si no se pasa la validación de formulario//
            return //Salimos//
        }

        const updatedUsers = users.map(user => { //Declaramos la actualización de usuarios, a través de un map para cambiar los datos//
            if (user.id === loggedUserId) { //Si la id del usuario es igual la id del usuario logueado//
                const updatedUser = { //Declaramos el usuario actualizado//
                    ...user, //Copiando el usuario//
                    userName: formData.userName, //Cambiando userName al nuevo userName//
                    email: formData.email //Cambiando el email al nuevo email//
                };

                if (formData.password) { //Si se cambia la contraseña//
                    updatedUser.password = formData.password //También se actualiza//
                }

                return updatedUser //Devolvemos el usuario actualizado//
            }
            return user //Devolvemos al usuario//
        })

        saveUsers(updatedUsers) //Guardamos el usuario actualizado en base a la función saveUsers//
        createModal('Profile updated successfully!', () => { //Creamos un modal indicando que se ha producido la actualización//
            navigation.navigateToHome() //Y navegamos la página de Home//
        })
    }

    return ( //Devolvemos los siguientes renderizados//
        <div className="profilePageContainer">
            <div className="homeHeaderContainer">
                <div className="homeImgContainer">
                    <img src="Logo.jpg" className="homeImg" alt="Logo" />
                </div>

                <h1 className="homeMsg">Edit Profile</h1>

                <button
                    className="menuButton"
                    onClick={() => navigation.navigateToHome()}
                    aria-label="Back to home"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>

            <div className="profileFormContainer">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="userName">Username:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className={errors.userName ? 'error' : ''}
                        />
                        {errors.userName && <span className="error-message">{errors.userName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="buttonJoin">Save Changes</button>
                        <button type="button" className="buttonGoToLogin" onClick={() => navigation.navigateToHome()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

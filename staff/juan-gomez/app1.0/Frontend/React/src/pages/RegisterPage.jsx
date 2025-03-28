const RegisterPage = ({ navigation }) => { //Declaramos la página de registro, y le aplicamos la función de navegación//
    const handleSubmit = (formData) => { //Manejamos el submit//
        if (!validateEmail(formData.email)) { //Si no se cumple la validación de email//
            createModal('Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)') //Creamos un modal indicando el error y como subsanarlo//
            return //Salimos//
        }

        if (!validatePassword(formData.password)) { //Si no se cumple la validación de contraseña//
            createModal('Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character') //Creamos un modal indicando el error y como subsanarlo//
            return //Salimos//
        }

        if (formData.password !== formData['confirmation-password']) { //Si la contraseña y la confirmación de contraseña no coinciden//
            createModal('Passwords are not the same. Please, try again') //Creamos un modal indicando el error//
            return //Salimos//
        }

        const users = getUsers() //Los usuarios se almacenarán a través de la función gesUsers//
        const doesUserExist = users.some(user => user.email === formData.email) //Se comprobará si el usuario existe a través del email//

        if (doesUserExist) { //Si el usuario ya existe//
            createModal('This mail is already in use') //Creamos un modal indicando el error//
            return //Salimos//
        }

        const userName = formData.email.split('@')[0] //El nombre del usuario vendrá determinado por todo aquello anterior al @ de su email registrado//
        const capitalizedUserName = capitalizeFirstLetter(userName) //Se aplicará sobre el nombre usuario la función para poner la primera letra en maýúscula//
        const userCreated = { //El usuario creado constará de email, contraseña, nombre de usuario e id de la fecha en la que se produjo el registro//
            email: formData.email,
            password: formData.password,
            userName: capitalizedUserName,
            id: Date.now()
        }

        users.push(userCreated) //Se almacenará el usuario creado dentro del global de usuarios//
        saveUsers(users) //Se aplicará la función saveUsers a los usuarios//
        sessionStorage.setItem('id', userCreated.id) //Setamos la id del usuario crerado en sessionStorage//
        navigation.navigateToHome() //Y navegamos a la página Home//
    }

    return ( //Devolvemos los siguientes renderizados//
        <div className="registerForm">
            <button
                className="imgButton"
                onClick={navigation.navigateToLanding}
            >
                <img src="Logo.jpg" alt="Home" />
            </button>
            <h1 className="title">REGISTER</h1>
            <Form
                inputsArray={[
                    { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true, autoComplete: "email" },
                    { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true, autoComplete: "new-password" },
                    { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true, autoComplete: "new-password" }
                ]}
                submitButtonText="Register"
                onSubmit={handleSubmit}
            />
            <h4 className="registerMsg">Have you an account?</h4>
            <button
                className="buttonGoToLogin"
                onClick={navigation.navigateToLogin}
            >
                Go to login
            </button>
        </div>
    );
};
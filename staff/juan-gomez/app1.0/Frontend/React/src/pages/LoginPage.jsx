const LoginPage = ({ navigation }) => { //Declaramos la página de Login, y le aplicaremos la función de navegación//
    const handleSubmit = (formData) => { //Manejaremos el evento de login//
        const users = getUsers() //Capturando los usuarios en base la función getUsers//
        const userLoginCheckout = users.find(user => user.email === formData.email) //Haremos un checkeo del usuario que quiere loguear, buscando (find) al usuario en localStorage en base a su email//

        if (!userLoginCheckout) { //Si no hay usuario encontrado tras la búsqueda (find)//
            createModal('The email is not registered yet. Please, create an account first', () => { //Creamos un modal que nos indica el error//
                navigation.navigateToRegister() //Y navegamos a la página de registro//
            })
            return //Lo devolvemos//
        }

        if (userLoginCheckout.password !== formData.password) { //Si la contraseña ingesada no se corresponde a la contraseña asignada al usuario//
            createModal('Incorrect password, Please, try again') //Creamos un modal que nos indica el error//
            return //Lo devolvemos//
        }

        if (formData.rememberme) { //Si se marca el checkbox rememberme//
            localStorage.setItem('id', userLoginCheckout.id) //Seteamos la id logueada en localStorage//
        } else { //Si no se marca la checkbox rememberme//
            sessionStorage.setItem('id', userLoginCheckout.id) //Seteamos la id logueada en sessionStorage//
        }

        navigation.navigateToHome() //Una vez logueado, navegamos a la página Home//
    };

    return ( //Devolveremos los siguientes renderizados//
        <div className="loginForm">
            <button
                className="imgButton"
                onClick={navigation.navigateToLanding}
            >
                <img src="Logo.jpg" alt="Home" />
            </button>
            <h1 className="title">LOGIN</h1>
            <Form
                inputsArray={[
                    { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true, autoComplete: "email" },
                    { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true, autoComplete: "current-password" },
                    { label: 'Remember me', inputType: 'checkbox', inputId: 'rememberme', isRequired: false }
                ]}
                submitButtonText="Login"
                onSubmit={handleSubmit}
            />
            <h4 className="loginMsg">You don't have an account?</h4>
            <button
                className="buttonGoToRegister"
                onClick={navigation.navigateToRegister}
            >
                Register now!
            </button>
        </div>
    );
};

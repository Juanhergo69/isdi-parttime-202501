const App = () => { //Declaramos App, será nuestra base para la aplicación. Aquí principalmente manejaremos la navegación//
    const [currentPage, setCurrentPage] = React.useState(() => { //Seteamos un estado en base a la página en la que nos encontremos//
        return sessionStorage.id || localStorage.id ? 'HomePage' : 'LandingPage' //Y devolvemos que, dependiendo de si el usuario está logueado o no, renderizaremos la página Home o Landing//
    })

    const navigation = { //La navegación se manejará con una función general que irá llamando a las siguientes páginas, según se quiera ir a una u otra//
        navigateTo: (page) => { //Navegamos hacia la página que indicamos//
            setCurrentPage(page) //Seteamos la página actual sobre el destino de navegación//
            window.scrollTo({ top: 0, behavior: 'smooth' }) //Controlamos y definimos el scroll//
        },
        navigateToLanding: () => navigation.navigateTo('LandingPage'), //Definimos la función de navegación para Landing//
        navigateToRegister: () => navigation.navigateTo('RegisterPage'), //Definimos la función de navegación para Register//
        navigateToLogin: () => navigation.navigateTo('LoginPage'), //Definimos la función de navegación para Login//
        navigateToHome: () => { //Definimos la función de navegación para Home//
            sessionStorage.id && localStorage.removeItem('id'); //Gestionamos el estado de la id en base a si se encuentra en sessionStorage o localStorage//
            navigation.navigateTo('HomePage') //Navegamos a Home//
        },
        navigateToProfile: () => navigation.navigateTo('ProfilePage') //Definimos la función de navegación a Profile//
    }

    const renderPage = () => { //Definimos la función de renderizado de páginas//
        switch (currentPage) { //Intercambiamos entre las vistas//
            case 'HomePage': //En el caso de Home//
                return <HomePage navigation={navigation} /> //Devolvemos el renderizado de la página Home//
            case 'RegisterPage': //En el caso de Register//
                return <RegisterPage navigation={navigation} /> //Devolvemos el renderizado de la página Register//
            case 'LoginPage': //En el caso de Login//
                return <LoginPage navigation={navigation} /> //Devolvemos el renderizado de la página Login//
            case 'ProfilePage': //En el caso de Profile//
                return <ProfilePage navigation={navigation} /> //Devolvemos el renderizado de la página Profile//
            case 'LandingPage': //En el caso de Landing//
            default: //Predeterminado//
                return <LandingPage navigation={navigation} /> //Devolvemos el renderizado de la página Landing//
        }
    }

    return renderPage() //Devolvemos la función renderPage//
}



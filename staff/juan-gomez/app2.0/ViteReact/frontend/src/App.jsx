//Importa React y los componentes de página//
import React from 'react'
import LandingPage from './pages/LandingPage'      //Página de inicio//
import RegisterPage from './pages/RegisterPage'    //Página de registro//
import LoginPage from './pages/LoginPage'          //Página de login//
import HomePage from './pages/HomePage'            //Página principal//
import ProfilePage from './pages/ProfilePage'      //Página de perfil//

// Componente principal de la aplicación
const App = () => {
  //Estado para controlar la página actual//
  //Inicialmente verifica si hay un usuario logueado (en sessionStorage o localStorage)//
  const [currentPage, setCurrentPage] = React.useState(() => {
    return sessionStorage.id || localStorage.id ? 'HomePage' : 'LandingPage'
    //Si hay ID almacenado, va a HomePage, sino a LandingPage//
  })

  //Sistema de navegación centralizado//
  const navigation = {
    //Función base para cambiar de página//
    navigateTo: (page) => {
      setCurrentPage(page)          //Actualiza el estado de la página//
      window.scrollTo(0, 0)         //Scroll al inicio de la página//
    },

    //Navegación específica a Landing Page//
    navigateToLanding: () => navigation.navigateTo('LandingPage'),

    //Navegación específica a Register Page//
    navigateToRegister: () => navigation.navigateTo('RegisterPage'),

    //Navegación específica a Login Page//
    navigateToLogin: () => navigation.navigateTo('LoginPage'),

    //Navegación específica a Home Page//
    navigateToHome: () => {
      //Limpia localStorage si hay sesión en sessionStorage//
      sessionStorage.id && localStorage.removeItem('id')
      navigation.navigateTo('HomePage')
    },

    //Navegación específica a Profile Page//
    navigateToProfile: () => navigation.navigateTo('ProfilePage')
  }

  //Renderizado condicional basado en la página actual//
  const renderPage = () => {
    switch (currentPage) {
      case 'HomePage':
        return <HomePage navigation={navigation} />      //Renderiza HomePage//
      case 'RegisterPage':
        return <RegisterPage navigation={navigation} />  //Renderiza RegisterPage//
      case 'LoginPage':
        return <LoginPage navigation={navigation} />     //Renderiza LoginPage//
      case 'ProfilePage':
        return <ProfilePage navigation={navigation} />   //Renderiza ProfilePage//
      case 'LandingPage':
      default:
        return <LandingPage navigation={navigation} />   //Renderiza LandingPage por defecto//
    }
  }

  //Devuelve el resultado de renderPage()//
  return renderPage()
}

export default App  //Exporta el componente principal//

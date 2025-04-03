//Importa la librería React para crear componentes//
import React from 'react'

//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'

//Importa funciones de router-dom//
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

//Importa LandingPage//
import LandingPage from './pages/LandingPage'

//Importa RegisterPage//
import RegisterPage from './pages/RegisterPage'

//Importa LoginPage//
import LoginPage from './pages/LoginPage'

//Importa HomePage//
import HomePage from './pages/HomePage'

//Importa ProfilePage//
import ProfilePage from './pages/ProfilePage'

//Importa BioPage//
import BioPage from './pages/BioPage'

//Importa MessagesPage//
import MessagesPage from './pages/MessagesPage'

//Importa NotFoundPage//
import NotFoundPage from './pages/NotFoundPage'

//Componente principal de la aplicación//
const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  //Función para verificar si el usuario está logueado//
  const isLoggedIn = () => {
    return !!(sessionStorage.id || localStorage.id)
  }

  //Estado para controlar la página actual//
  //Inicialmente verifica si hay un usuario logueado (en sessionStorage o localStorage)//
  const [currentPage, setCurrentPage] = useState(() => {
    return isLoggedIn() ? 'HomePage' : 'LandingPage'
    //Si hay ID almacenado, va a HomePage, sino a LandingPage//
  })

  //Estado para almacenar parámetros de navegación//
  const [pageParams, setPageParams] = useState({}) //Objeto vacío inicial//

  //Sistema de navegación centralizado//
  const navigation = {
    //Función base para cambiar de página//
    //Ahora acepta parámetros opcionales para pasar a las páginas//
    navigateTo: (page, params = {}) => {
      //Si intenta acceder a BioPage sin estar logueado, redirige a Login//
      if (page === 'BioPage' && !isLoggedIn()) {
        setCurrentPage('LoginPage')
        navigate('/login')
        return
      }

      setCurrentPage(page)          //Actualiza el estado de la página//
      setPageParams(params)         //Guarda los parámetros en el estado//
      window.scrollTo(0, 0)        //Scroll al inicio de la página//

      //Actualiza la URL según la página//
      switch (page) {
        case 'HomePage':
          navigate('/home')
          break
        case 'RegisterPage':
          navigate('/register')
          break
        case 'LoginPage':
          navigate('/login')
          break
        case 'ProfilePage':
          navigate('/profile')
          break
        case 'BioPage':
          navigate(`/bio/${params.userName || ''}`)
          break
        case 'NotFoundPage':
          navigate('/not-found')
          break
        case 'LandingPage':
        default:
          navigate('/')
      }
    },

    //Navegación específica a Landing Page - ahora con verificación de autenticación//
    navigateToLanding: () => {
      isLoggedIn() ? navigation.navigateToHome() : navigation.navigateTo('LandingPage')
    },

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
    navigateToProfile: () => navigation.navigateTo('ProfilePage'),

    //Navegación específica a Messages Page//
    navegateToMessages: () => navigation.navigateTo('MessagesPage'),

    //Navegación específica a Bio Page//
    //Recibe el nombre de usuario como parámetro//
    navigateToBio: (userName) => navigation.navigateTo('BioPage', { userName }),

    //Navegación específica a NotFound Page//
    navigateToNotFound: () => navigation.navigateTo('NotFoundPage')
  }

  //Sincroniza el estado currentPage con la ruta actual//
  useEffect(() => {
    const path = location.pathname

    //Si intenta acceder a /bio sin estar logueado, redirige a Login//
    if (path.startsWith('/bio/') && !isLoggedIn()) {
      setCurrentPage('LoginPage')
      navigate('/login')
      return
    }

    //Si está logueado y accede a la raíz, va a HomePage//
    if (path === '/' && isLoggedIn()) {
      setCurrentPage('HomePage')
      navigate('/home')
      return
    }

    //Resto de la lógica de rutas//
    if (path === '/home' && currentPage !== 'HomePage') {
      setCurrentPage('HomePage')
    } else if (path === '/register' && currentPage !== 'RegisterPage') {
      setCurrentPage('RegisterPage')
    } else if (path === '/login' && currentPage !== 'LoginPage') {
      setCurrentPage('LoginPage')
    } else if (path === '/profile' && currentPage !== 'ProfilePage') {
      setCurrentPage('ProfilePage')
    } else if (path.startsWith('/bio/') && currentPage !== 'BioPage') {
      const userName = path.split('/')[2]
      setCurrentPage('BioPage')
      setPageParams({ userName })
    } else if (path === '/' && currentPage !== 'LandingPage') {
      setCurrentPage('LandingPage')
    } else if (path === '/messages' && currentPage !== 'MessagesPage') {
      if (!isLoggedIn()) {
        setCurrentPage('LoginPage')
        navigate('/login')
      } else {
        setCurrentPage('MessagesPage')
      }
    }
  }, [location.pathname])

  //Renderizado condicional basado en la página actual//
  const renderPage = () => {
    switch (currentPage) {
      case 'HomePage':
        return <HomePage navigation={navigation} />                               //Renderiza HomePage//
      case 'RegisterPage':
        return <RegisterPage navigation={navigation} />                           //Renderiza RegisterPage//
      case 'LoginPage':
        return <LoginPage navigation={navigation} />                              //Renderiza LoginPage//
      case 'ProfilePage':
        return <ProfilePage navigation={navigation} />                            //Renderiza ProfilePage//
      case 'MessagesPage':
        return <MessagesPage navigation={navigation} />
      case 'BioPage':
        return <BioPage navigation={navigation} userName={pageParams.userName} /> //Renderiza Bio con parámetro//
      case 'LandingPage':
        return <LandingPage navigation={navigation} />                            //Renderiza LandingPage//
      default:
        return <NotFoundPage navigation={navigation} />                           //Renderiza NotFoundPage para rutas desconocidas//
    }
  }

  return (
    <Routes>
      <Route path="/" element={currentPage === 'LandingPage' ? renderPage() : null} />
      <Route path="/home" element={currentPage === 'HomePage' ? renderPage() : null} />
      <Route path="/register" element={currentPage === 'RegisterPage' ? renderPage() : null} />
      <Route path="/login" element={currentPage === 'LoginPage' ? renderPage() : null} />
      <Route path="/profile" element={currentPage === 'ProfilePage' ? renderPage() : null} />
      <Route path="/messages" element={currentPage === 'MessagesPage' ? renderPage() : null} />
      <Route path="/bio/:userName" element={currentPage === 'BioPage' ? renderPage() : null} />
      <Route path="/not-found" element={currentPage === 'NotFoundPage' ? <NotFoundPage navigation={navigation} /> : null} />
      <Route path="*" element={<NotFoundPage navigation={navigation} />} />
    </Routes>
  )
}

export default App  //Exporta el componente principal//

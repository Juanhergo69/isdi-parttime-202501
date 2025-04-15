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

//Importa FavoritesPage//
import FavoritesPage from './pages/FavoritesPage'

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

      //Si intenta acceder a FavoritesPage sin estar logueado, redirige a Login//
      if (page === 'FavoritesPage' && !isLoggedIn()) {
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
        case 'MessagesPage':
          navigate('/messages')
          break
        case 'FavoritesPage':
          navigate('/favorites')
          break
        case 'NotFoundPage':
          navigate('/not-found')
          break
        case 'LandingPage':
        default:
          navigate('/')
      }
    },

    //Navegación específica a LandingPage - ahora con verificación de autenticación//
    navigateToLanding: () => {
      isLoggedIn() ? navigation.navigateToHome() : navigation.navigateTo('LandingPage')
    },

    //Navegación específica a RegisterPage//
    navigateToRegister: () => navigation.navigateTo('RegisterPage'),

    //Navegación específica a LoginPage//
    navigateToLogin: () => navigation.navigateTo('LoginPage'),

    //Navegación específica a HomePage//
    navigateToHome: () => {
      //Limpia localStorage si hay sesión en sessionStorage//
      sessionStorage.id && localStorage.removeItem('id')
      navigation.navigateTo('HomePage')
    },

    //Navegación específica a ProfilePage//
    navigateToProfile: () => navigation.navigateTo('ProfilePage'),

    //Navegación específica a MessagesPage//
    navegateToMessages: () => navigation.navigateTo('MessagesPage'),

    //Navegación específica a BioPage//
    //Recibe el nombre de usuario como parámetro//
    navigateToBio: (userName) => navigation.navigateTo('BioPage', { userName }),

    //Navegación específica a FavoritesPage//
    navigateToFavorites: () => navigation.navigateTo('FavoritesPage'),

    //Navegación específica a NotFoundPage//
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
    } else if (path === '/favorites' && currentPage !== 'FavoritesPage') {
      setCurrentPage('FavoritesPage')
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<LandingPage navigation={navigation} />} />
      <Route path="/home" element={<HomePage navigation={navigation} />} />
      <Route path="/register" element={<RegisterPage navigation={navigation} />} />
      <Route path="/login" element={<LoginPage navigation={navigation} />} />
      <Route path="/profile" element={<ProfilePage navigation={navigation} />} />
      <Route path="/messages" element={<MessagesPage navigation={navigation} />} />
      <Route path="/favorites" element={<FavoritesPage navigation={navigation} />} />
      <Route path="/bio/:userName" element={<BioPage navigation={navigation} />} />
      <Route path="/not-found" element={<NotFoundPage navigation={navigation} />} />
      <Route path="*" element={<NotFoundPage navigation={navigation} />} />
    </Routes>
  )
}

export default App  //Exporta el componente principal//

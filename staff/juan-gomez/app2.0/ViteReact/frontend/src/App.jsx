import React from 'react'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  const [currentPage, setCurrentPage] = React.useState(() => {
    return sessionStorage.id || localStorage.id ? 'HomePage' : 'LandingPage';
  });

  // Sistema de navegación unificado
  const navigation = {
    navigateTo: (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    },
    navigateToLanding: () => navigation.navigateTo('LandingPage'),
    navigateToRegister: () => navigation.navigateTo('RegisterPage'),
    navigateToLogin: () => navigation.navigateTo('LoginPage'),
    navigateToHome: () => {
      sessionStorage.id && localStorage.removeItem('id');
      navigation.navigateTo('HomePage');
    },
    navigateToProfile: () => navigation.navigateTo('ProfilePage')
  };

  // Renderizado condicional
  const renderPage = () => {
    switch (currentPage) {
      case 'HomePage':
        return <HomePage navigation={navigation} />;
      case 'RegisterPage':
        return <RegisterPage navigation={navigation} />;
      case 'LoginPage':
        return <LoginPage navigation={navigation} />;
      case 'ProfilePage':
        return <ProfilePage navigation={navigation} />;
      case 'LandingPage':
      default:
        return <LandingPage navigation={navigation} />;
    }
  };

  return renderPage();
};

export default App

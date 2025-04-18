import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeHeader = ({ loggedUser, navigation, onLogout, setShowMsgForm, showMsgForm }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="homeHeaderContainer">
      <div className="homeImgContainer">
        <img src="/Logo.jpg" className="homeImg" alt="Logo" />
        <button
          className="home-toggleSendMsgFormButton"
          onClick={() => setShowMsgForm(!showMsgForm)}
        >
          {showMsgForm ? 'Hide Form' : 'New Post'}
        </button>
      </div>
      
      <h1 className="homeMsg">Welcome, {(loggedUser && loggedUser.userName) || 'User'}</h1>

      <button
        className={`homeMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
        onClick={() => setShowMenu(!showMenu)}
        aria-expanded={showMenu}
        aria-label="User menu"
      >
        <div className="homeMenuButton-content">
          {loggedUser?.avatar ? (
            <img src={loggedUser.avatar} className="homeMenuButton-avatar" alt="User avatar" />
          ) : (
            <span className="homeMenuButton-initial">
              {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
            </span>
          )}
        </div>
      </button>

      {showMenu && (
        <div className="homeMenuDropContainer">
          <Link
            to="/profile"
            className="homeProfileButton"
            onClick={() => {
              navigation.navigateToProfile();
              setShowMenu(false);
            }}
          >
            <i className="fas fa-user"></i> Profile
          </Link>

          <Link
            to="/messages"
            className="homeMessagesButton"
            onClick={() => {
              navigation.navigateToMessages()
              setShowMenu(false)
            }}
          >
            <i className="fas fa-envelope"></i> My Msg
          </Link>

          <Link
            to="/favorites"
            className="homeFavoritesButton"
            onClick={() => {
              navigation.navigateToFavorites()
              setShowMenu(false)
            }}
          >
            <i className="fas fa-star"></i> My Fav
          </Link>

          <button className="homeLogoutButton" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
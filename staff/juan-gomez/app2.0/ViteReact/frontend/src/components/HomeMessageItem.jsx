const HomeMessageItem = ({ 
    message, 
    author, 
    navigation, 
    loggedUserId, 
    onLike, 
    onDislike, 
    onFavorite,
    users
  }) => {
    const hasLiked = message.likes?.includes(loggedUserId);
    const hasDisliked = message.dislikes?.includes(loggedUserId);
    const likesCount = message.likes?.length || 0;
    const dislikesCount = message.dislikes?.length || 0;
    const likedUsers = message.likes?.map(likeUserId => 
      users.find(u => u.id === likeUserId)?.userName || 'Unknown'
    );
    const dislikedUsers = message.dislikes?.map(dislikeUserId => 
      users.find(u => u.id === dislikeUserId)?.userName || 'Unknown'
    );
    const hasFavorited = message.favorite?.includes(loggedUserId);
  
    return (
      <div className="homeMessage">
        <div className="home-message-user">
          User: <span
            className="home-user-name-link"
            onClick={() => navigation.navigateToBio(author.userName)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {(author && author.userName) || 'Unknown'}
          </span>
        </div>
  
        <div className="home-message-title">Title: {message.title}</div>
        <div className="home-message-text">Message: {message.msg}</div>
  
        {message.image && (
          <div className="home-message-image-container">
            <img
              src={message.image}
              alt="User uploaded content"
              className="home-message-image"
            />
          </div>
        )}
  
        <div className="home-message-date">Date: {message.date}</div>
  
        <div className="home-message-actions">
          <div className="home-like-container">
            <button
              className="home-like-button"
              onClick={() => onLike(message.date)}
              aria-label="Like"
            >
              <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
              <span className="home-message-likes">({likesCount})</span>
            </button>
            {likedUsers.length > 0 && (
              <div className="home-users-tooltip likes-tooltip">
                {likedUsers.slice(0, 3).join(', ')}
                {likedUsers.length > 3 && (
                  <span className="home-users-count">
                    {` and ${likedUsers.length - 3} more`}
                  </span>
                )}
              </div>
            )}
          </div>
  
          <div className="home-dislike-container">
            <button
              className="home-dislike-button"
              onClick={() => onDislike(message.date)}
              aria-label="Dislike"
            >
              <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>
              <span className="home-message-dislikes">({dislikesCount})</span>
            </button>
            {dislikedUsers.length > 0 && (
              <div className="home-users-tooltip dislikes-tooltip">
                {dislikedUsers.slice(0, 3).join(', ')}
                {dislikedUsers.length > 3 && (
                  <span className="home-users-count">
                    {` and ${dislikedUsers.length - 3} more`}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="home-favorite-container">
            <button
              className="home-favorite-button"
              onClick={() => onFavorite(message.date)}
              aria-label="Favorite"
            >
              <i className={hasFavorited ? "fas fa-heart" : "far fa-heart"}></i>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomeMessageItem;
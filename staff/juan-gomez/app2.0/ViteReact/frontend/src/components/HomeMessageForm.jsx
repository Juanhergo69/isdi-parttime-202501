const HomeMessageForm = ({ 
    onSubmitMessage, 
    selectedImage, 
    onImageChange, 
    removeImage, 
    imagePreview 
  }) => {
    return (
      <form id="sendMsgForm" className="homeSendMsgForm" onSubmit={onSubmitMessage}>
        <input
          type="text"
          id="title"
          placeholder="Enter your title"
          required
          name="title"
        />
  
        <textarea
          id="msg"
          className="textarea"
          placeholder="Enter your message"
          required
          name="msg"
        ></textarea>
  
        <div className="home-optimized-image-section">
          <div className="home-image-controls-row">
            <label htmlFor="image-upload" className="home-image-upload-label">
              <i className="fas fa-image"></i> {selectedImage ? 'Change Image' : 'Add Image'}
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              name="image"
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
            {selectedImage && (
              <button
                type="button"
                className="home-remove-image-button"
                onClick={removeImage}
              >
                <i className="fas fa-times"></i> Remove
              </button>
            )}
          </div>
  
          {selectedImage && (
            <div className="home-compact-image-info">
              <span className="home-image-filename">{selectedImage.name}</span>
            </div>
          )}
  
          {imagePreview && (
            <div className="home-constrained-preview">
              <img
                src={imagePreview}
                alt="Preview"
                className="home-compact-image-preview"
              />
            </div>
          )}
        </div>
  
        <input type="submit" value="Post Message" />
      </form>
    );
  };
  
  export default HomeMessageForm;
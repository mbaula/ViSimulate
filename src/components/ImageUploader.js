import React from 'react';
import './css/ImageUploader.css';

const ImageUploader = ({ onImageUpload }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    onImageUpload(file);
  };

  return (
    <div className="image-uploader-container">
      <h2>Upload an Image</h2>
      <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;

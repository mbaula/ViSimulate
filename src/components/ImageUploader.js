import React from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    onImageUpload(file);
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;

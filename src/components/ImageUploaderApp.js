import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ImageTransformer from './ImageTransformer';
import './css/ImageUploaderApp.css'; 

const ImageUploaderApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImpairment, setSelectedImpairment] = useState('');

  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };

  const handleImpairmentChange = (event) => {
    setSelectedImpairment(event.target.value);
  };

  return (
    <div>
      <ImageUploader onImageUpload={handleImageUpload} />

      <h2>Select Impairment</h2>
      <select value={selectedImpairment} onChange={handleImpairmentChange}>
        <option value="">Select Impairment</option>
        <option value="glaucoma">Glaucoma</option>
        <option value="blindness">Blindness</option>
        <option value="colorblindness">Color Blindness</option>
      </select>

      <div className="image-container">
        <div className="selected-image">
          {selectedImage && (
            <div>
              <h3>Selected Image:</h3>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          )}
        </div>

        <div className="transformed-image">
          <ImageTransformer
            selectedImage={selectedImage}
            selectedImpairment={selectedImpairment}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploaderApp;

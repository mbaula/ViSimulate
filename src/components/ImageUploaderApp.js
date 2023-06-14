import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ImageTransformer from './ImageTransformer';
import algorithmDescriptions from './algorithmDescriptions';
import './css/ImageUploaderApp.css';

const ImageUploaderApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImpairment, setSelectedImpairment] = useState('');
  const [impairmentDescription, setImpairmentDescription] = useState('');
  const [algorithmDescription, setAlgorithmDescription] = useState('');

  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };

  const handleImpairmentChange = (event) => {
    const impairment = event.target.value;
    setSelectedImpairment(impairment);
    setImpairmentDescription(getImpairmentDescription(impairment));
    setAlgorithmDescription(getAlgorithmDescription(impairment));
  };

  const impairmentDescriptions = {
    protanopia: 'Protanopia: Simulates the inability to perceive red color, resulting in difficulties in distinguishing red and green colors.',
    deuteranopia: 'Deuteranopia: Simulates the inability to perceive green color, resulting in difficulties in distinguishing red and green colors.',
    tritanopia: 'Tritanopia: Simulates the inability to perceive blue color, resulting in difficulties in distinguishing blue and yellow colors.',
    achromatopsia: 'Achromatopsia: Simulates the inability to perceive any colors, resulting in black and white vision. Note that this likely does not exist.',
    protanomaly: 'Protanomaly: Simulates a reduced sensitivity to red color, resulting in a shift in the perception of red and green colors.',
    deuteranomaly: 'Deuteranomaly: Simulates a reduced sensitivity to green color, resulting in a shift in the perception of red and green colors.',
    tritanomaly: 'Tritanomaly: Simulates a reduced sensitivity to blue color, resulting in a shift in the perception of blue and yellow colors.',
    high_myopia: 'High Myopia: Simulates severe nearsightedness, resulting in blurred vision for distant objects. Please wait a few seconds for this image transformation to complete.',
    glaucoma: 'Glaucoma: Simulates the loss of peripheral vision, creating a tunnel-like effect where the central vision is relatively preserved while the outer edges appear darkened.',
    cataracts: 'Cataracts: Simulates the presence of cataracts, which cause clouding of the lens in the eye. This leads to blurred or distorted vision, as if looking through a foggy or hazy window. Please wait a few seconds for this image transformation to complete.',
  };

  const algorithmTitles = {
    protanopia: 'Algorithm for Protanopia',
    deuteranopia: 'Algorithm for Deuteranopia',
    tritanopia: 'Algorithm for Tritanopia',
    achromatopsia: 'Algorithm for Achromatopsia',
    protanomaly: 'Algorithm for Protanomaly',
    deuteranomaly: 'Algorithm for Deuteranomaly',
    tritanomaly: 'Algorithm for Tritanomaly',
    high_myopia: 'Algorithm for High myopia',
    glaucoma: 'Algorithm for Glaucoma',
    cataracts: 'Algorithm for Cataracts',
  };

  const getImpairmentDescription = (impairment) => {
    const description = impairmentDescriptions[impairment] || '';
    const isAchromatopsia = impairment === 'achromatopsia';

    if (isAchromatopsia) {
      return (
        <>
          Achromatopsia: Simulates the inability to perceive any colors, resulting in black and white vision. Note that this likely does not exist.{' '}
          <a href="https://www.youtube.com/watch?v=kYZ00B5O_VQ" target="_blank" rel="noopener noreferrer">
            Learn more
          </a>
          .
        </>
      );
    }

    return description;
  };

  const getAlgorithmDescription = (impairment) => {
    return algorithmDescriptions[impairment] || '';
  };

  return (
    <div>
      <ImageUploader onImageUpload={handleImageUpload} />

      <div className="impairment-container">
        <h2>Select Impairment</h2>
        <div className="selector-container">
          <select value={selectedImpairment} onChange={handleImpairmentChange}>
            <option value="">Select Impairment</option>
            <option value="protanopia">Protanopia</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="tritanopia">Tritanopia</option>
            <option value="achromatopsia">Achromatopsia</option>
            <option value="protanomaly">Protanomaly</option>
            <option value="deuteranomaly">Deuteranomaly</option>
            <option value="tritanomaly">Tritanomaly</option>
            <option value="high_myopia">High Myopia</option>
            <option value="glaucoma">Glaucoma</option>
            <option value="cataracts">Cataracts</option>
          </select>
          {impairmentDescription && (
            <p className="impairment-description">{impairmentDescription}</p>
          )}
        </div>
      </div>

      <div className="image-container">
        {selectedImage && (
          <div className="selected-image">
            <h3>Selected Image:</h3>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}

        <div className="transformed-image">
          {selectedImage && (
            <ImageTransformer
              selectedImage={selectedImage}
              selectedImpairment={selectedImpairment}
            />
          )}
        </div>
      </div>

      {algorithmDescription && (
        <div className="algorithm-container">
          <div className="algorithm-description">
            <h3>How this works:</h3>
            <h4>{algorithmTitles[selectedImpairment]}</h4>
            {algorithmDescription.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        )}

    </div>
  );
};

export default ImageUploaderApp;

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
    achromatopsia: 'Achromatopsia: Simulates the inability to perceive any colors, resulting in black and white vision.',
    protanomaly: 'Protanomaly: Simulates a reduced sensitivity to red color, resulting in a shift in the perception of red and green colors.',
    deuteranomaly: 'Deuteranomaly: Simulates a reduced sensitivity to green color, resulting in a shift in the perception of red and green colors.',
    tritanomaly: 'Tritanomaly: Simulates a reduced sensitivity to blue color, resulting in a shift in the perception of blue and yellow colors.',
  };

  const algorithmTitles = {
    protanopia: 'Algorithm for Protanopia',
    deuteranopia: 'Algorithm for Deuteranopia',
    tritanopia: 'Algorithm for Tritanopia',
    achromatopsia: 'Algorithm for Achromatopsia',
    protanomaly: 'Algorithm for Protanomaly',
    deuteranomaly: 'Algorithm for Deuteranomaly',
    tritanomaly: 'Algorithm for Tritanomaly',
  };

  const getImpairmentDescription = (impairment) => {
    return impairmentDescriptions[impairment] || '';
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
          </select>
          {impairmentDescription && (
            <p className="impairment-description">{impairmentDescription}</p>
          )}
        </div>
      </div>

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
              {algorithmDescription && (
                <div>
                  <h3>How this works:</h3>
                  <h4>{algorithmTitles[selectedImpairment]}</h4>
                  {algorithmDescription.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
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

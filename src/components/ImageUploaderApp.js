import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ImageTransformer from './ImageTransformer';
import './css/ImageUploaderApp.css'; 

const ImageUploaderApp = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImpairment, setSelectedImpairment] = useState('');
    const [impairmentDescription, setImpairmentDescription] = useState('');

    const handleImageUpload = (image) => {
        setSelectedImage(image);
    };

    const handleImpairmentChange = (event) => {
        const impairment = event.target.value;
        setSelectedImpairment(impairment);
        setImpairmentDescription(getImpairmentDescription(impairment));
    };

    const getImpairmentDescription = (impairment) => {
        switch (impairment) {
            case 'protanopia':
                return 'Protanopia: Simulates the inability to perceive red color, resulting in difficulties in distinguishing red and green colors.';
            case 'deuteranopia':
                return 'Deuteranopia: Simulates the inability to perceive green color, resulting in difficulties in distinguishing red and green colors.';
            case 'tritanopia':
                return 'Tritanopia: Simulates the inability to perceive blue color, resulting in difficulties in distinguishing blue and yellow colors.';
            case 'achromatopsia':
                return 'achromatopsia: simulates the inability to perceive total absence of color vision'
            default:
                return '';
        }
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
            <option value="deuteranopia">Deuteranopia </option>
            <option value="deuteranopia">Deuteranopia </option>
            <option value="achromatopsia">Achromatopsia </option>
            </select>
            {impairmentDescription && (
            <p className="impairment-description">{impairmentDescription}</p> )}
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

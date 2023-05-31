import React from 'react';
import { applyTransformation } from './ImageTransformerUtils';

const ImageTransformer = ({ selectedImage, selectedImpairment }) => {
    return (
      <div>
        {selectedImage && (
          <div>
            <h3>Transformed Image:</h3>
            {/* Transformation logic goes here based on selectedImpairment */}
            <img
              src={applyTransformation(selectedImage, selectedImpairment)}
              alt="Transformed"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
    );
  };
  
  export default ImageTransformer;
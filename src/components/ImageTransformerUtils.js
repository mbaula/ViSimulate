import React from 'react';

export const applyTransformation = (image, impairment) => {
    // Add your transformation logic here based on the selected impairment
    // For demonstration purposes, returning the original image URL
    if (image) {
      return URL.createObjectURL(image);
    }
    return '';
};
  
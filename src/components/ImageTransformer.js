import React, { useEffect, useState } from 'react';

const ImageTransformer = ({ selectedImage, selectedImpairment }) => {
  const [transformedImageUrl, setTransformedImageUrl] = useState(null);

  const transformImage = async (image, impairment) => {
    switch (impairment) {
      case 'protanopia':
        return applyProtanopiaTransformation(image);
      case 'deuteranopia':
        return applyDeuteranopiaTransformation(image);
      case 'tritanopia':
        return applyTritanopiaTransformation(image);
      case 'achromatopsia':
        return applyAchromatopsiaTransformation(image);
      default:
        return null; // Return null for no transformation
    }
  };

  useEffect(() => {
    const applyTransformation = async () => {
      if (selectedImage) {
        try {
          const transformedUrl = await transformImage(selectedImage, selectedImpairment);
          setTransformedImageUrl(transformedUrl);
        } catch (error) {
          console.error('Failed to apply transformation:', error);
        }
      } else {
        setTransformedImageUrl(null);
      }
    };

    applyTransformation();
  }, [selectedImage, selectedImpairment]);

  const applyProtanopiaTransformation = (image) => {
    // Transformation logic for protanopia
    // Replace with your implementation
    return URL.createObjectURL(image);
  };

  const applyDeuteranopiaTransformation = (image) => {
    // Transformation logic for deuteranopia
    // Replace with your implementation
    return URL.createObjectURL(image);
  };

  const applyTritanopiaTransformation = (image) => {
    // Transformation logic for tritanopia
    // Replace with your implementation
    return URL.createObjectURL(image);
  };

  const applyAchromatopsiaTransformation = (image) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = URL.createObjectURL(image);
  
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
  
        ctx.drawImage(img, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];
  
          const avg = 0.299 * red + 0.587 * green + 0.114 * blue;
          data[i] = avg; // red
          data[i + 1] = avg; // green
          data[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
  };  

  return (
    <div>
      {transformedImageUrl && (
        <div>
          <h3>Transformed Image:</h3>
          <img
            src={transformedImageUrl}
            alt="Transformed"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageTransformer;

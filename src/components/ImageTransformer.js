import React, { useEffect, useState } from 'react';

const ImageTransformer = ({ selectedImage, selectedImpairment }) => {
  const [transformedImageUrl, setTransformedImageUrl] = useState(null);

  function linearRGB_from_sRGB(v)
  {
    var fv = v / 255.0;
    if (fv < 0.04045) return fv / 12.92;
    return Math.pow((fv + 0.055) / 1.055, 2.4);
  }

  function sRGB_from_linearRGB(v)
  {
    if (v <= 0.) return 0;
    if (v >= 1.) return 255;
    if (v < 0.0031308) return 0.5 + (v * 12.92 * 255);
    return 0 + 255 * (Math.pow(v, 1.0 / 2.4) * 1.055 - 0.055);
  }

   const brettel_params = {
    protan: {
        rgbCvdFromRgb_1: [
            0.14510, 1.20165, -0.34675,
            0.10447, 0.85316, 0.04237,
            0.00429, -0.00603, 1.00174
        ],
        rgbCvdFromRgb_2: [
            0.14115, 1.16782, -0.30897,
            0.10495, 0.85730, 0.03776,
            0.00431, -0.00586, 1.00155
        ],
        separationPlaneNormal: [ 0.00048, 0.00416, -0.00464 ]
    },

    deutan: {
        rgbCvdFromRgb_1: [
            0.36198, 0.86755, -0.22953,
            0.26099, 0.64512, 0.09389,
           -0.01975, 0.02686, 0.99289,
        ],
        rgbCvdFromRgb_2: [
            0.37009, 0.88540, -0.25549,
            0.25767, 0.63782, 0.10451,
           -0.01950, 0.02741, 0.99209,
        ],
        separationPlaneNormal: [ -0.00293, -0.00645, 0.00938 ]
    },

    tritan: {
        rgbCvdFromRgb_1: [
            1.01354, 0.14268, -0.15622,
           -0.01181, 0.87561, 0.13619,
            0.07707, 0.81208, 0.11085,
        ],
        rgbCvdFromRgb_2: [
            0.93337, 0.19999, -0.13336,
            0.05809, 0.82565, 0.11626,
            -0.37923, 1.13825, 0.24098,
        ],
        separationPlaneNormal: [ 0.03960, -0.02831, -0.01129 ]
    },
  };

  function brettel(rgb, t, severity) { 
  
    var params = brettel_params[t];
    var separationPlaneNormal = params['separationPlaneNormal'];
    var rgbCvdFromRgb_1 = params['rgbCvdFromRgb_1'];
    var rgbCvdFromRgb_2 = params['rgbCvdFromRgb_2'];
  
    // Check on which plane we should project by comparing with the separation plane normal.
    var dotWithSepPlane =
      rgb[0] * separationPlaneNormal[0] +
      rgb[1] * separationPlaneNormal[1] +
      rgb[2] * separationPlaneNormal[2];
    var rgbCvdFromRgb = dotWithSepPlane >= 0 ? rgbCvdFromRgb_1 : rgbCvdFromRgb_2;
  
    // Transform to the full dichromat projection plane.
    var rgb_cvd = Array(3);
    rgb_cvd[0] =
      rgbCvdFromRgb[0] * rgb[0] +
      rgbCvdFromRgb[1] * rgb[1] +
      rgbCvdFromRgb[2] * rgb[2];
    rgb_cvd[1] =
      rgbCvdFromRgb[3] * rgb[0] +
      rgbCvdFromRgb[4] * rgb[1] +
      rgbCvdFromRgb[5] * rgb[2];
    rgb_cvd[2] =
      rgbCvdFromRgb[6] * rgb[0] +
      rgbCvdFromRgb[7] * rgb[1] +
      rgbCvdFromRgb[8] * rgb[2];
  
    // Apply the severity factor as a linear interpolation.
    // It's the same to do it in the RGB space or in the LMS
    // space since it's a linear transform.
    rgb_cvd[0] = rgb_cvd[0] * severity + rgb[0] * (1.0 - severity);
    rgb_cvd[1] = rgb_cvd[1] * severity + rgb[1] * (1.0 - severity);
    rgb_cvd[2] = rgb_cvd[2] * severity + rgb[2] * (1.0 - severity);
  
    // Go back to sRGB
    return [
      sRGB_from_linearRGB(rgb_cvd[0]),
      sRGB_from_linearRGB(rgb_cvd[1]),
      sRGB_from_linearRGB(rgb_cvd[2]),
    ];
  }

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
      case 'protanomaly':
        return applyProtanomalyTransformation(image);
      case 'deuteranomaly':
        return applyDeuteranomalyTransformation(image);
      case 'tritanomaly':
        return applyTritanomalyTransformation(image);
      case 'high_myopia':
        return applyHighMyopiaTransformation(image);
      case 'glaucoma':
        return applyGlaucomaTransformation(image);
      case 'cataracts':
        return applyCataractsTransformation(image);
      default:
        return null; 
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

          // Convert sRGB to linear RGB
          const linearRed = linearRGB_from_sRGB(red);
          const linearGreen = linearRGB_from_sRGB(green);
          const linearBlue = linearRGB_from_sRGB(blue);

          // Apply the Brettel transformation for protanopia
          const transformedRGB = brettel([linearRed, linearGreen, linearBlue], 'protan', 1.0);

          // Convert linear RGB back to sRGB
          const transformedRed = transformedRGB[0];
          const transformedGreen = transformedRGB[1];
          const transformedBlue = transformedRGB[2];
  
          data[i] = transformedRed; 
          data[i + 1] = transformedGreen; 
          data[i + 2] = transformedBlue; 
        }
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
  };

  const applyDeuteranopiaTransformation = (image) => {
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
  
          // Convert sRGB to linear RGB
          const linearRed = linearRGB_from_sRGB(red);
          const linearGreen = linearRGB_from_sRGB(green);
          const linearBlue = linearRGB_from_sRGB(blue);
  
          // Apply the Brettel transformation for deuteranopia
          const transformedRGB = brettel([linearRed, linearGreen, linearBlue], 'deutan', 1.0);
  
          // Convert linear RGB back to sRGB
          const transformedRed = transformedRGB[0];
          const transformedGreen = transformedRGB[1];
          const transformedBlue = transformedRGB[2];
  
          data[i] = transformedRed;
          data[i + 1] = transformedGreen;
          data[i + 2] = transformedBlue;
        }
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
  };  

  const applyTritanopiaTransformation = (image) => {
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
  
          // Convert sRGB to linear RGB
          const linearRed = linearRGB_from_sRGB(red);
          const linearGreen = linearRGB_from_sRGB(green);
          const linearBlue = linearRGB_from_sRGB(blue);
  
          // Apply the Brettel transformation for tritanopia
          const transformedRGB = brettel([linearRed, linearGreen, linearBlue], 'tritan', 1.0);
  
          // Convert linear RGB back to sRGB
          const transformedRed = transformedRGB[0];
          const transformedGreen = transformedRGB[1];
          const transformedBlue = transformedRGB[2];
  
          data[i] = transformedRed;
          data[i + 1] = transformedGreen;
          data[i + 2] = transformedBlue;
        }
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
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
  
  const applyProtanomalyTransformation = (image) => {
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
  
          // Convert sRGB to linear RGB
          const linearRed = linearRGB_from_sRGB(red);
          const linearGreen = linearRGB_from_sRGB(green);
          const linearBlue = linearRGB_from_sRGB(blue);
  
          // Apply the Brettel transformation for protanomaly with severity 0.6
          const transformedRGB = brettel([linearRed, linearGreen, linearBlue], 'protan', 0.6);
  
          // Convert linear RGB back to sRGB
          const transformedRed = transformedRGB[0];
          const transformedGreen = transformedRGB[1];
          const transformedBlue = transformedRGB[2];
  
          data[i] = transformedRed;
          data[i + 1] = transformedGreen;
          data[i + 2] = transformedBlue;
        }
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
  };
  
  const applyDeuteranomalyTransformation = (image) => {
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
  
          // Convert sRGB to linear RGB
          const linearRed = linearRGB_from_sRGB(red);
          const linearGreen = linearRGB_from_sRGB(green);
          const linearBlue = linearRGB_from_sRGB(blue);
  
          // Apply the Brettel transformation for deuteranomaly with severity 0.6
          const transformedRGB = brettel([linearRed, linearGreen, linearBlue], 'deutan', 0.6);
  
          // Convert linear RGB back to sRGB
          const transformedRed = transformedRGB[0];
          const transformedGreen = transformedRGB[1];
          const transformedBlue = transformedRGB[2];
  
          data[i] = transformedRed;
          data[i + 1] = transformedGreen;
          data[i + 2] = transformedBlue;
        }
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
  };
  
  const applyTritanomalyTransformation = (image) => {
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
  
          // Convert sRGB to linear RGB
          const linearRed = linearRGB_from_sRGB(red);
          const linearGreen = linearRGB_from_sRGB(green);
          const linearBlue = linearRGB_from_sRGB(blue);
  
          // Apply the Brettel transformation for tritanomaly with severity 0.6
          const transformedRGB = brettel([linearRed, linearGreen, linearBlue], 'tritan', 0.6);
  
          // Convert linear RGB back to sRGB
          const transformedRed = transformedRGB[0];
          const transformedGreen = transformedRGB[1];
          const transformedBlue = transformedRGB[2];
  
          data[i] = transformedRed;
          data[i + 1] = transformedGreen;
          data[i + 2] = transformedBlue;
        }
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
  };

  const applyHighMyopiaTransformation = (image) => {
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
        const blurRadius = 5; // Adjust the blur radius as needed
  
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            let totalR = 0;
            let totalG = 0;
            let totalB = 0;
            let count = 0;
  
            // Apply blur to the surrounding pixels
            for (let j = -blurRadius; j <= blurRadius; j++) {
              for (let i = -blurRadius; i <= blurRadius; i++) {
                const pixelX = x + i;
                const pixelY = y + j;
  
                // Check if the pixel coordinates are within the image bounds
                if (
                  pixelX >= 0 &&
                  pixelX < canvas.width &&
                  pixelY >= 0 &&
                  pixelY < canvas.height
                ) {
                  const pixelIndex = (pixelY * canvas.width + pixelX) * 4;
  
                  totalR += data[pixelIndex];
                  totalG += data[pixelIndex + 1];
                  totalB += data[pixelIndex + 2];
                  count++;
                }
              }
            }
  
            const avgR = totalR / count;
            const avgG = totalG / count;
            const avgB = totalB / count;
  
            const pixelIndex = (y * canvas.width + x) * 4;
            data[pixelIndex] = avgR;
            data[pixelIndex + 1] = avgG;
            data[pixelIndex + 2] = avgB;
          }
        }
  
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
  };
  
  const applyGlaucomaTransformation = (image) => {
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
  
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(centerX, centerY);
  
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const pixelIndex = (y * canvas.width + x) * 4;
  
            const distanceToCenter = Math.sqrt(
              Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );
  
            const vignetteStrength = 1.3 - (distanceToCenter / maxRadius);
  
            data[pixelIndex] *= vignetteStrength; 
            data[pixelIndex + 1] *= vignetteStrength; 
            data[pixelIndex + 2] *= vignetteStrength;
          }
        }
  
        ctx.putImageData(imageData, 0, 0);
  
        resolve(canvas.toDataURL());
      };
  
      img.onerror = () => {
        reject(new Error('Failed to load image.'));
      };
    });
  };
  
  const applyCataractsTransformation = (image) => {
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
        const opacity = 0.3; // Adjust the opacity to control the level of haziness or fog
        const brightness = 0.8; // Adjust the brightness
        const blurRadius = 4; // Adjust the blur radius as needed
  
        // Apply blur to the image data
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            let totalR = 0;
            let totalG = 0;
            let totalB = 0;
            let count = 0;
  
            // Apply blur to the surrounding pixels
            for (let j = -blurRadius; j <= blurRadius; j++) {
              for (let i = -blurRadius; i <= blurRadius; i++) {
                const pixelX = x + i;
                const pixelY = y + j;
  
                // Check if the pixel coordinates are within the image bounds
                if (
                  pixelX >= 0 &&
                  pixelX < canvas.width &&
                  pixelY >= 0 &&
                  pixelY < canvas.height
                ) {
                  const pixelIndex = (pixelY * canvas.width + pixelX) * 4;
  
                  totalR += data[pixelIndex];
                  totalG += data[pixelIndex + 1];
                  totalB += data[pixelIndex + 2];
                  count++;
                }
              }
            }
  
            const avgR = totalR / count;
            const avgG = totalG / count;
            const avgB = totalB / count;
  
            const pixelIndex = (y * canvas.width + x) * 4;
            data[pixelIndex] = avgR;
            data[pixelIndex + 1] = avgG;
            data[pixelIndex + 2] = avgB;
          }
        }
  
        // Apply haziness and dimness to the image data
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3] / 255; // Get the alpha channel value (opacity)
          const modifiedAlpha = alpha * opacity; // Apply the opacity to simulate haziness
  
          // Set the modified alpha value for each pixel
          data[i + 3] = Math.round(modifiedAlpha * 255);
  
          // Adjust the brightness of each pixel
          data[i] *= brightness; // Red channel
          data[i + 1] *= brightness; // Green channel
          data[i + 2] *= brightness; // Blue channel
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

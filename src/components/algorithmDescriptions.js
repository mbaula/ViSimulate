const algorithmDescriptions = {
    protanopia: `The findings of the research paper "Computerized simulation of color appearance for dichromats" by Brettel, H., Viénot, F., & Mollon, J. D. (1997). is used to simulate the lack of red cone sensitivity in the eyes.\n\n
      The code takes an image as input and sets up a canvas to perform the transformation. The canvas is resized to match the dimensions of the image.\n\n
      To simulate the lack of red cone sensitivity, the code modifies the color channels of each pixel by reducing or removing the red component. This alteration affects the perception of red and green colors in the transformed image, making it challenging to distinguish between them.\n\n
      The specific adjustments made to the color channels depend on the characteristics of protanopia. The code applies the necessary transformations to simulate the altered color perception.\n\n
      Once the color channels have been modified, the transformed image data is placed back onto the canvas, overwriting the original image. The canvas now holds the transformed representation of the input image, simulating how individuals with protanopia perceive the world.`,
  
    deuteranopia: `The findings of the research paper "Computerized simulation of color appearance for dichromats" by Brettel, H., Viénot, F., & Mollon, J. D. (1997). is used to simulate the lack of green cone sensitivity in the eyes.\n\n
      The code takes an image as input and sets up a canvas to perform the transformation. The canvas is resized to match the dimensions of the image.\n\n
      To simulate the lack of green cone sensitivity, the code modifies the color channels of each pixel by reducing or removing the green component. This alteration affects the perception of red and green colors in the transformed image, making it challenging to distinguish between them.\n\n
      The specific adjustments made to the color channels depend on the characteristics of deuteranopia. The code applies the necessary transformations to simulate the altered color perception.\n\n
      Once the color channels have been modified, the transformed image data is placed back onto the canvas, overwriting the original image. The canvas now holds the transformed representation of the input image, simulating how individuals with deuteranopia perceive the world.`,
  
    tritanopia: `The findings of the research paper "Computerized simulation of color appearance for dichromats" by Brettel, H., Viénot, F., & Mollon, J. D. (1997). is used to simulate the lack of blue cone sensitivity in the eyes.\n\n
      The code takes an image as input and sets up a canvas to perform the transformation. The canvas is resized to match the dimensions of the image.\n\n
      To simulate the lack of blue cone sensitivity, the code modifies the color channels of each pixel by reducing or removing the blue component. This alteration affects the perception of blue and yellow colors in the transformed image, making it challenging to distinguish between them.\n\n
      The specific adjustments made to the color channels depend on the characteristics of tritanopia. The code applies the necessary transformations to simulate the altered color perception.\n\n
      Once the color channels have been modified, the transformed image data is placed back onto the canvas, overwriting the original image. The canvas now holds the transformed representation of the input image, simulating how individuals with tritanopia perceive the world.`,
  
    achromatopsia: `The code begins by taking an image as input, which serves as the starting point for the transformation process. It sets up a virtual canvas, a blank space where the image will be manipulated to replicate the visual perception of individuals with achromatopsia.\n\n
      Once the image is loaded onto the canvas, the code resizes the canvas to match the dimensions of the image. This ensures that the transformed result maintains the same size and proportions.\n\n
      To simulate the absence of color vision, the code performs a series of operations to convert the image into grayscale. It accomplishes this by analyzing each pixel of the image and determining its perceived brightness.\n\n
      By combining the red, green, and blue color channels of each pixel and averaging their values, the code calculates a grayscale intensity. This intensity represents the perceived brightness of the pixel, disregarding the color information.\n\n
      To remove the color information entirely, the code assigns the calculated grayscale intensity value to all three color channels (red, green, and blue) of each pixel. As a result, the transformed image appears in shades of gray, where different shades represent varying levels of brightness.\n\n
      Once the color information has been removed, the modified image data is placed back onto the canvas, effectively overwriting the original color image. The canvas now holds a grayscale representation of the input image, simulating how individuals with achromatopsia perceive the world.`,
  
    protanomaly: `The findings of the research paper "Computerized simulation of color appearance for anomalous trichromats" by Viénot, F., Brettel, H., Ott, L., & Mollon, J. D. (1999) is used to simulate the reduced sensitivity to red color in the eyes.\n\n
      The code takes an image as input and sets up a canvas to perform the transformation. The canvas is resized to match the dimensions of the image.\n\n
      To simulate the reduced sensitivity to red color, the code applies specific modifications to the color channels of each pixel, shifting the perception of red and green colors in the transformed image.\n\n
      The adjustments made to the color channels depend on the characteristics of protanomaly. The code applies the necessary transformations to simulate the altered color perception.\n\n
      Once the color channels have been modified, the transformed image data is placed back onto the canvas, overwriting the original image. The canvas now holds the transformed representation of the input image, simulating how individuals with protanomaly perceive the world.`,
  
    deuteranomaly: `The findings of the research paper "Computerized simulation of color appearance for anomalous trichromats" by Viénot, F., Brettel, H., Ott, L., & Mollon, J. D. (1999) is used to simulate the reduced sensitivity to green color in the eyes.\n\n
      The code takes an image as input and sets up a canvas to perform the transformation. The canvas is resized to match the dimensions of the image.\n\n
      To simulate the reduced sensitivity to green color, the code applies specific modifications to the color channels of each pixel, shifting the perception of red and green colors in the transformed image.\n\n
      The adjustments made to the color channels depend on the characteristics of deuteranomaly. The code applies the necessary transformations to simulate the altered color perception.\n\n
      Once the color channels have been modified, the transformed image data is placed back onto the canvas, overwriting the original image. The canvas now holds the transformed representation of the input image, simulating how individuals with deuteranomaly perceive the world.`,
  
    tritanomaly: `The findings of the research paper "Computerized simulation of color appearance for anomalous trichromats" by Viénot, F., Brettel, H., Ott, L., & Mollon, J. D. (1999) is used to simulate the reduced sensitivity to blue color in the eyes.\n\n
      The code takes an image as input and sets up a canvas to perform the transformation. The canvas is resized to match the dimensions of the image.\n\n
      To simulate the reduced sensitivity to blue color, the code applies specific modifications to the color channels of each pixel, shifting the perception of blue and yellow colors in the transformed image.\n\n
      The adjustments made to the color channels depend on the characteristics of tritanomaly. The code applies the necessary transformations to simulate the altered color perception.\n\n
      Once the color channels have been modified, the transformed image data is placed back onto the canvas, overwriting the original image. The canvas now holds the transformed representation of the input image, simulating how individuals with tritanomaly perceive the world.`,
  
    high_myopia: `The code takes an image as input, which serves as the starting point for the transformation process. It sets up a virtual canvas, a blank space where the image will be manipulated to simulate high myopia, or severe nearsightedness.\n\n
      Once the image is loaded onto the canvas, the code resizes the canvas to match the dimensions of the image. This ensures that the transformed result maintains the same size and proportions.\n\n
      To simulate high myopia, the code applies a blur effect to the image, mimicking the blurred vision experienced by individuals with severe nearsightedness. The blur radius can be adjusted as needed.\n\n
      The code iterates over each pixel of the image and calculates the average color values of the surrounding pixels within the specified blur radius. It then assigns these average color values to the pixel, resulting in a blurred appearance.\n\n
      Once the blurring operation is complete, the modified image data is placed back onto the canvas, overwriting the original image. The canvas now holds the transformed representation of the input image, simulating how individuals with high myopia perceive distant objects.`,
  };
  
  export default algorithmDescriptions;
  
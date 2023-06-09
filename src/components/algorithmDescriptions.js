const algorithmDescriptions = {
    protanopia: 'The LMS transform algorithm is used to simulate the lack of red cone sensitivity in the eyes.',
    deuteranopia: 'The LMS transform algorithm is used to simulate the lack of green cone sensitivity in the eyes.',
    tritanopia: 'The LMS transform algorithm is used to simulate the lack of blue cone sensitivity in the eyes.',
    achromatopsia: 
        `The code begins by taking an image as input, which serves as the starting point for the transformation process. It sets up a virtual canvas, a blank space where the image will be manipulated to replicate the visual perception of individuals with achromatopsia. 
        Once the image is loaded onto the canvas, the code resizes the canvas to match the dimensions of the image. This ensures that the transformed result maintains the same size and proportions.\n\n

        To simulate the absence of color vision, the code performs a series of operations to convert the image into grayscale. It accomplishes this by analyzing each pixel of the image and determining its perceived brightness.\n\n

        By combining the red, green, and blue color channels of each pixel and averaging their values, the code calculates a grayscale intensity. This intensity represents the perceived brightness of the pixel, disregarding the color information.\n
        
        To remove the color information entirely, the code assigns the calculated grayscale intensity value to all three color channels (red, green, and blue) of each pixel. As a result, the transformed image appears in shades of gray, where different shades represent varying levels of brightness.\n
        
        Once the color information has been removed, the modified image data is placed back onto the canvas, effectively overwriting the original color image. The canvas now holds a grayscale representation of the input image, simulating how individuals with achromatopsia perceive the world.`,
  };
  
  export default algorithmDescriptions;
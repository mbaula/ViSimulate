# Resources and Notes for this project

### "Computerized simulation of color appearance for dichromats" by Brettel, Viénot, and Mollon (1997)

#### Introduction
- Normal color vision is trichromatic relying on absorption of photons by three type of cones: Long (L), Medium (M), and Short (S). This enables perception of all colors in a 3D space.
- Color blindness is typically caused by the absence of these cones. Protanopia is caused by the absence of L cones, deuteranopia by M cones, and tritanopia by S cones. These individuals operate within a 2-dimensional color space reducing their ability to distinguish between certain colors.
- To simulate this, we can use analog transformations or filters but this results in inaccurate results due to overlapping sensitivity of cones. Another approach is to separate colorimetric transformations for each element in the picture. Alternatively, the paper suggests the use of an algorithm to simulate the appearance of a digitalized image as perceived by dichromats.
- There are certain neutral stimuli that are not changed in the simulation. For example, stimulus of 575nm is perceived as yellow, 475 nm is perceived as same blue by trichomats and protanopes/deuteranopes.

#### Methods
1. Cone Fundamentals and LMS Color Space
2. Monitor Calibration
3. LMS Color-Space Transformations
   * Idea behind LMS Color-Space Transformations involves converting color stimuli from RGB color space (used in monitors) to the LMS color space. LMS allows us to express color stimuli in terms of LMS values, representing the levels of stimulation for each type of cone.

#### Steps for applying Brettel Methods
1. Have a dictionary/array containing the parameters necessary to simulate the desired color blindness.
2. Convert from sRGB to linear RGB.
  * sRGB stands for standard RGB, a standard color space widely used in computer graphics. It was developed to ensure consistent color reproduction across different devices. The sRGB defines gamma correction to encode color values, improving uniformity.
  * The conversion between is needed as sRGB values are gamma corrected. This is a non-linear operation to compensate for the non-linear response of display devices. Color calculations and transformations work more accurately than in a linear color space. This is when the color values have a linear relationship with the physical intensity of light.
  * The numbers and params that are to be implemented are taken from MaPePer jsColorblindSimulator program: https://github.com/MaPePeR/jsColorblindSimulator/blob/master/brettel_colorblind_simulation.js
3. The params is accessed to retrieve the specific parameters for the transformations. This including the separation plane normal and the transformation matrices (rgbCvdFromRgb_1 and rgbCvdFromRgb_2). These are the RGB Color Vision Deficiency Transformation Matrix from RGB. This represents the matrix used to simulate the deficiencies by converting the RGB to new transformed RGB values.
   * The separation plane normals represent the directions along which the color vision deficiencies diverge from normal color perception. If positive or zero, "rgbCvdFromRgb_1" is used; otherwise, "rgbCvdFromRgb_2" is used.
   * By having two transformation matrices and separation plane normals, the code can accurately simulate the different directions in color space that each type of color vision deficiency affects. This enables more accurate transformations and provides a better approximation of how individuals with those deficiencies perceive color
4. The RGB color value is transformed to the full dichromat projection plane using the selected transformation matrix. The resulting color values are stored in the rgb_cvd array.
5. The transformed color values in rgb_cvd are converted back to sRGB using the sRGB_from_linearRGB() function, and the resulting sRGB color values are returned as an array.

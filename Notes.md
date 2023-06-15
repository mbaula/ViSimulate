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

#### Steps for applying Brettel Methods for simulating color blindness
1. Have a dictionary/array containing the parameters necessary to simulate the desired color blindness.
2. Convert from sRGB to linear RGB.
  * sRGB stands for standard RGB, a standard color space widely used in computer graphics. It was developed to ensure consistent color reproduction across different devices. The sRGB defines gamma correction to encode color values, improving uniformity.
  * The conversion between is needed as sRGB values are gamma corrected. This is a non-linear operation to compensate for the non-linear response of display devices. Color calculations and transformations work more accurately than in a linear color space. This is when the color values have a linear relationship with the physical intensity of light.
  * The numbers and params that are to be implemented are taken from MaPePer jsColorblindSimulator program: https://github.com/MaPePeR/jsColorblindSimulator/blob/master/brettel_colorblind_simulation.js. This was an extremely helpful resource for implementing these methods.
3. The params is accessed to retrieve the specific parameters for the transformations. This including the separation plane normal and the transformation matrices (rgbCvdFromRgb_1 and rgbCvdFromRgb_2). These are the RGB Color Vision Deficiency Transformation Matrix from RGB. This represents the matrix used to simulate the deficiencies by converting the RGB to new transformed RGB values.
   * The separation plane normals represent the directions along which the color vision deficiencies diverge from normal color perception. If positive or zero, "rgbCvdFromRgb_1" is used; otherwise, "rgbCvdFromRgb_2" is used.
   * By having two transformation matrices and separation plane normals, the code can accurately simulate the different directions in color space that each type of color vision deficiency affects. This enables more accurate transformations and provides a better approximation of how individuals with those deficiencies perceive color
4. The RGB color value is transformed to the full dichromat projection plane using the selected transformation matrix. The resulting color values are stored in the rgb_cvd array.
5. The transformed color values in rgb_cvd are converted back to sRGB using the sRGB_from_linearRGB() function, and the resulting sRGB color values are returned as an array.

#### Steps for simulating High Myopia
1. For simulating high myopia, I tried to implement a method that mimics the simulation found here: https://coopervision.co.uk/practitioner/clinical-resources/myopia-in-children/myopia-simulator The simulation implemented seems to simulate the blurry vision overall, but the clearer vision for near objects is not entirely simulated.
2. Specify a 'blur radius' parameter, which determines the amount of neighbouring pixels that will contribute to the blur effect. The code then goes through each pixel of the image and calculate the average color values of surrounding pixels within the blur radius. It adds up the color values of the surrounding pixels and divide by the total number of pixels. The average color value are then assigned to each pixel, blending the colors of nearby pixels together.
3. The process is completed for each pixel of the image, resulting in a blurred version of the original image.
4. Since it's hard to determine what objects are near, or in the foreground, it does not account for objects near to the eye that should not be blurry.

#### Steps for simulating Glaucoma
1. The simulation tries to mimic the effects of Figure 1B in this research paper https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4206382/. It simulates the effects of "looking through a straw" or "tunnel vision" which is traditionally what patients with glaucoma describe. 
2. Calculate the centerX and centerY variables which is used to determine the center of the image. The maximum radius is then picked to be the smallest of these two values.
3. The function then loops through each pixel in the image and calculates the distance from this pixel to the center of the image. Based off the given distance from the center of the image the pixel is assigned a vignette strength. The RGB values of the image is then multiplied by the vignette strength to apply the black vignette effect.
4. After modifying the pixels, the new transformed image is put back into the canvas.

#### Steps for simulating Cataracts
1. Cataracts affect vision by making the world look cloudy, blurry or dim (https://www.healthline.com/health/cataract-symptoms) This simulation aims to mimic all three symptoms of cataracts. https://sightcentertoledo.org/eyeconditions/vision-impairment-simulator/ has a cataract simulation implemented that I tried to simulate.
2. For the function to transform the image, there are several different parameters that needed to be defined.
   * Opacity: simulates the effect of creating a foggy effect
   * Brightness: simulates the dimness 
   * Blur Radius: simulates the blurry vision
3. Apply the blur effect to the image data by implementing similar transformations used in the high myopia simulation.
4. Iterate through each pixel and ajust RGB values based on the opacity and brightness parameters. The opacity is multiplied by the alpha channel (controls the opacity of a color) to simulate looking through a foggy window. The lower brightness is then also applied to dim colors.
5. After modifying the pixels, the new transformed image is put back into the canvas.

*** From this point on I will only talk about the algorithms if anything different from above is implemented. I will just write notes on the impairment being simulated instead ***

#### Macular Degeneration
* From https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/age-related-macular-degeneration:
  - Age-related macular degeneration (AMD) is an eye disease that can blur your central vision. It happens when aging causes damage to the macula — the part of the eye that controls sharp, straight-ahead vision. The macula is part of the retina (the light-sensitive tissue at the back of the eye). 
  - AMD is a common condition — it’s a leading cause of vision loss for older adults. AMD doesn’t cause complete blindness, but losing your central vision can make it harder to see faces, read, drive, or do close-up work like cooking or fixing things around the house. 
  - AMD happens very slowly in some people and faster in others. If you have early AMD, you may not notice vision loss for a long time. That’s why it’s important to get regular eye exams to find out if you have AMD. 

##### Diabetic Retinopathy
* Attempts to simulate the effects in Figure 1 of this research paper: https://www.researchgate.net/publication/337165932_Mobile_Smart_Screening_and_Remote_Monitoring_for_Vision_Loss_Diseases
* From https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/diabetic-retinopathy
  - Diabetic retinopathy is an eye condition that can cause vision loss and blindness in people who have diabetes. It affects blood vessels in the retina (the light-sensitive layer of tissue in the back of your eye).
  - In later stages of the disease, blood vessels in the retina start to bleed into the vitreous (gel-like fluid that fills your eye). If this happens, you may see dark, floating spots or streaks that look like cobwebs. Sometimes, the spots clear up on their own — but it’s important to get treatment right away. Without treatment, scars can form in the back of the eye. Blood vessels may also start to bleed again, or the bleeding may get worse.
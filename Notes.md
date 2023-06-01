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
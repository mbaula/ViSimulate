# ViSimulate

Notes for this project: https://github.com/mbaula/ViSimulate/blob/14982c5f59f9cfb1d90b305f498c92eeacf70daa/Notes.md

ViSimulate is a web application that allows users to upload images and simulate various visual impairments to experience how the images would appear to individuals with different visual conditions. It uses image processing algorithms to transform the images in real-time, providing an interactive and educational experience about different visual impairments.

## Motivation

The motivation behind ViSimulate is to raise awareness and promote empathy for individuals with visual impairments. By providing a hands-on experience of how different visual conditions can affect one's perception of the world, ViSimulate aims to increase understanding and inclusivity towards people with diverse visual abilities. Additionally, the project was developed as a means for the myself to learn more about various visual impairments. I wanted to provide a tool that can be useful for creating applications with visually impaired people in mind.

## Features

- Upload and preview images for simulation
- Select from a range of visual impairments to simulate
- Real-time transformation of images based on selected impairment
- Algorithm descriptions for each visual impairment
- Responsive design for optimal viewing on different devices

## Showcase

#### Protanopia
![Protanopia](<../readme_images/Screenshot (168).png>)

#### Tritanopia
![Alt text](../readme_images/image-2.png)

#### Macular Degeneration
![Alt text](../readme_images/image.png)

## Installation

To run ViSimulate locally on your machine, follow these steps:

1. Clone the repository: `git clone https://github.com/mbaula/ViSimulate.git`
2. Navigate to the project directory: `cd visimulate`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your web browser and visit `http://localhost:3000`

## Usage

1. On the homepage, click on the "Upload an Image" button to select an image from your local machine.
2. Once the image is uploaded, select an impairment from the "Select Impairment" dropdown menu.
3. The selected image will be displayed in the "Selected Image" section, and the transformed image will be shown in the "Transformed Image" section.
4. Scroll down to read the algorithm description for the selected impairment in the "How this works" section.
5. You can change the image or select a different impairment at any time to see the updated transformations.

## Technologies Used

- React.js
- HTML
- CSS
- JavaScript

## Contributing

Contributions to ViSimulate are welcome! If you have any ideas, bug reports, or feature requests, please submit an issue or a pull request.

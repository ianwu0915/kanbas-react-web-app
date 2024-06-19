import React from 'react';

// Step 1: List all images
// Assuming your images are stored in the public/images folder
const images = [
  'algo.png',
  'cloud.png',
  'mobile-app.png',
  'webdev.png',
  'python.png',
  'ood.png',
  'sysdesign.png',
  // Add more image file names here
];

// a function to generate a random image

const randomImage = () => {
  // Step 2: Generate a random index
  const randomIndex = Math.floor(Math.random() * images.length);

  // Step 3: Select an image
  const selectedImage = images[randomIndex];

  // Step 4: Display the image
  return selectedImage
};

export default randomImage;
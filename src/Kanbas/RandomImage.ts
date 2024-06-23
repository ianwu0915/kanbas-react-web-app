// src/Kanbas/RandomImage.ts
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

// A mapping to store images for each course ID
const imageMappings: { [key: string]: string } = {};

const randomImage = (courseId: string) => {
  // If we already have an image for this course, return it
  if (imageMappings[courseId]) {
    return imageMappings[courseId];
  }

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * images.length);

  // Select an image and store the mapping
  const selectedImage = images[randomIndex];
  imageMappings[courseId] = selectedImage;

  // Return the selected image
  return selectedImage;
};

export default randomImage;

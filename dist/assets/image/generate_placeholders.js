// This script generates placeholder images for your projects
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create the images directory if it doesn't exist
const imageDir = path.join(__dirname, '..', 'public', 'assets', 'image');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Project images to generate
const projects = [
  { name: 'apnaride', title: 'ApnaRide', description: 'Ride Sharing Platform' },
  { name: 'food-delivery', title: 'Food Delivery', description: 'Food Delivery Platform' },
  { name: 'farmer-platform', title: 'Farmer Platform', description: 'Agricultural Sales Platform' },
  { name: 'atm-sim', title: 'ATM Simulator', description: 'Java ATM Simulation' },
  { name: 'job-portal', title: 'Job Portal', description: 'Job Search Platform' },
  { name: 'biteflow', title: 'BiteFlow', description: 'Food Delivery App' },
  { name: 'shopping', title: 'Shopping Site', description: 'E-commerce Platform' }
];

// Create a placeholder image for each project
projects.forEach(project => {
  const width = 800;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#2ecc71');
  gradient.addColorStop(1, '#3498db');
  
  // Draw background
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add project title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(project.title, width / 2, height / 2 - 30);
  
  // Add project description
  ctx.font = '24px Arial';
  ctx.fillText(project.description, width / 2, height / 2 + 30);
  
  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(imageDir, `${project.name}.jpg`), buffer);
});

console.log('Generated placeholder images for projects!');

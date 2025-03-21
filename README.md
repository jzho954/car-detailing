# Precision Auto Detailing Landing Page

A modern, responsive landing page for a premium car detailing service featuring a 3D car model in the hero section using Three.js.

## Features

- Sleek, modern design with responsive layout
- Interactive 3D car model in the hero section using Three.js
- Smooth scrolling navigation
- Services showcase
- Before/After gallery
- Pricing packages
- About section with company information
- Contact form with booking functionality
- Mobile-friendly design

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Three.js for 3D rendering
- FontAwesome for icons
- Google Fonts

## Setup

1. Clone the repository
2. Download the Ferrari 288 GTO model from Sketchfab and place it in the `models/` directory
3. Open index.html in your browser or deploy to a web server

## Deployment to Vercel

This project is ready for deployment to Vercel:

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository in the Vercel dashboard
3. Vercel will automatically detect the project type and deploy it

Alternatively, use the Vercel CLI:
```
npm install -g vercel
vercel
```

## 3D Car Model

The landing page features a Ferrari 3D model from the Three.js examples. The model is loaded directly from a public URL to ensure it works properly when deployed to Vercel or other hosting platforms.

### Using a Custom 3D Model

If you want to use a custom model (like the Ferrari 288 GTO from Sketchfab):

1. **Update the code**:
   - Modify the `modelUrl` variable in `js/main.js` to point to your model
   - You can use a CDN, public URL, or a relative path if you've added the model to your project

2. **For local development with a downloaded model**:
   - Download a model (e.g., from Sketchfab)
   - Place it in the `models/` directory
   - Update the path in `main.js` to `models/your-model-filename.glb`
   - Make sure to update your deployment process to include the model file

The code includes the Draco loader for compressed models and is configured to work with glTF/GLB format models.

## Browser Compatibility

The website is compatible with all modern browsers that support WebGL for the 3D model rendering.

## License

This project is available for personal and commercial use.

## Credits

- 3D car model: Ferrari 288 GTO by Sketchfab user
- Three.js library for 3D rendering
- FontAwesome for icons
- Google Fonts for typography

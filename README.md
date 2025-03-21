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

The landing page features a Ferrari 288 GTO 3D model from Sketchfab. To use the model:

1. **Download the model from Sketchfab**:
   - Visit: https://sketchfab.com/3d-models/ferrari-288-gto-e83da098149746b5a3ba6f1661645b09
   - Sign in to your Sketchfab account
   - Click the "Download" button (ensure you have permission based on the model's license)
   - Choose glTF format (.glb preferred)

2. **Add the model to your project**:
   - Place the downloaded file in the `models/` directory
   - Rename the file to `ferrari_288_gto.glb` or update the path in `main.js`

3. **Model optimization (if needed)**:
   - If the model is too large or complex, consider optimizing it using tools like:
     - [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline)
     - [Draco compression](https://github.com/google/draco)

The code is already set up to use the Draco loader for compressed models.

## Browser Compatibility

The website is compatible with all modern browsers that support WebGL for the 3D model rendering.

## License

This project is available for personal and commercial use.

## Credits

- 3D car model: Ferrari 288 GTO by Sketchfab user
- Three.js library for 3D rendering
- FontAwesome for icons
- Google Fonts for typography

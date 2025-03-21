// Navigation menu toggle for mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// 3D Car Model Setup
const initCarModel = () => {
    const container = document.getElementById('car-model-container');
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(8, 3, 8);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Add rim lights for car showcase effect
    const rimLight1 = new THREE.DirectionalLight(0x0088ff, 0.5);
    rimLight1.position.set(-5, 2, -5);
    scene.add(rimLight1);
    
    const rimLight2 = new THREE.DirectionalLight(0xff8800, 0.5);
    rimLight2.position.set(5, 2, -5);
    scene.add(rimLight2);
    
    // Controls setup
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    
    // GLTF loader setup with Draco compression
    const loadingManager = new THREE.LoadingManager();
    const dracoLoader = new THREE.DRACOLoader(loadingManager);
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    
    const gltfLoader = new THREE.GLTFLoader(loadingManager);
    gltfLoader.setDRACOLoader(dracoLoader);
    
    // Loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.style.position = 'absolute';
    loadingElement.style.top = '50%';
    loadingElement.style.left = '50%';
    loadingElement.style.transform = 'translate(-50%, -50%)';
    loadingElement.style.color = 'white';
    loadingElement.style.fontSize = '20px';
    loadingElement.style.fontWeight = 'bold';
    loadingElement.textContent = 'Loading 3D Model...';
    container.appendChild(loadingElement);
    
    // Load the Ferrari 288 GTO model from local file
    // Path to your downloaded Sketchfab model
    const modelUrl = 'models/ferrari_288_gto.glb'; // Update this path to where you store the downloaded model
    
    gltfLoader.load(
        modelUrl,
        (gltf) => {
            const model = gltf.scene;
            
            // Scale and position the model
            model.scale.set(0.8, 0.8, 0.8); // Scale down slightly
            model.position.set(0, -0.5, 0); // Lower the position a bit
            
            // Enable shadows for all meshes
            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    
                    // Improve material quality
                    if (node.material) {
                        node.material.envMapIntensity = 1.5;
                    }
                }
            });
            
            scene.add(model);
            
            // Center camera on model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Adjust camera and controls to fit model
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 2.5; // Zoom out significantly more
            
            camera.position.set(center.x, center.y, center.z + cameraZ);
            controls.target.set(center.x, center.y, center.z);
            
            // Remove loading indicator
            container.removeChild(loadingElement);
            
            // Add model credit
            const creditElement = document.createElement('div');
            creditElement.style.position = 'absolute';
            creditElement.style.bottom = '10px';
            creditElement.style.left = '10px';
            creditElement.style.color = 'white';
            creditElement.style.fontSize = '12px';
            creditElement.style.backgroundColor = 'rgba(0,0,0,0.5)';
            creditElement.style.padding = '5px 10px';
            creditElement.style.borderRadius = '4px';
            creditElement.textContent = 'Ferrari 288 GTO model from Sketchfab';
            container.appendChild(creditElement);
        },
        (xhr) => {
            const progress = (xhr.loaded / xhr.total) * 100;
            loadingElement.textContent = `Loading: ${Math.round(progress)}%`;
        },
        (error) => {
            console.error('An error occurred loading the model:', error);
            loadingElement.textContent = 'Error loading model';
        }
    );
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    
    animate();
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    initCarModel();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your submission! We will contact you shortly.');
            contactForm.reset();
        });
    }
});

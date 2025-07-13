import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { JSX } from 'react';

interface Kiosk3DProps {}

export default function Kiosk3D({}: Kiosk3DProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup with enhanced quality
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a2332, 10, 50);
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0f1419, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Professional lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    // Key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(10, 15, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -10;
    keyLight.shadow.camera.right = 10;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -10;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);
    
    // Fill light
    const fillLight = new THREE.DirectionalLight(0x7fb3d3, 0.3);
    fillLight.position.set(-5, 8, 5);
    scene.add(fillLight);
    
    // Rim light
    const rimLight = new THREE.DirectionalLight(0x8e44ad, 0.5);
    rimLight.position.set(-8, 2, -5);
    scene.add(rimLight);
    
    // Screen light
    const screenLight = new THREE.PointLight(0x4a90e2, 0.8, 5);
    screenLight.position.set(0, 0, 1);
    scene.add(screenLight);

    // Create kiosk model
    const kiosk = new THREE.Group();
    scene.add(kiosk);

    // Professional materials with proper PBR properties
    const createMaterial = (color: number, roughness = 0.1, metalness = 0.0, emissive = 0x000000) => {
      return new THREE.MeshPhongMaterial({
        color: color,
        shininess: Math.max(1, (1 - roughness) * 100),
        specular: new THREE.Color(0.2, 0.2, 0.2),
        emissive: emissive
      });
    };
    
    const kioskBodyMaterial = createMaterial(0xf8f9fa, 0.15, 0.05);
    const screenBezelMaterial = createMaterial(0x2c3e50, 0.2, 0.8);
    const cardReaderMaterial = createMaterial(0x34495e, 0.3, 0.7);
    const logoMaterial = createMaterial(0x27ae60, 0.2, 0.1, 0x0a3d20);
    const screenUIMaterial = createMaterial(0x000000, 0.1, 0.0, 0x001122);

    // Create kiosk body
    const bodyGeometry = new THREE.BoxGeometry(1.2, 2.0, 0.4);
    const body = new THREE.Mesh(bodyGeometry, kioskBodyMaterial);
    body.castShadow = true;
    kiosk.add(body);

    // Create screen assembly
    const screenBezelGeometry = new THREE.BoxGeometry(1.0, 1.7, 0.06);
    const screenBezel = new THREE.Mesh(screenBezelGeometry, screenBezelMaterial);
    screenBezel.position.set(0, 0.05, 0.28);
    screenBezel.castShadow = true;
    kiosk.add(screenBezel);

    // Inner screen recess
    const screenRecessGeometry = new THREE.BoxGeometry(0.92, 1.62, 0.02);
    const screenRecess = new THREE.Mesh(screenRecessGeometry, new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a 
    }));
    screenRecess.position.set(0, 0.05, 0.305);
    kiosk.add(screenRecess);

    // Actual screen surface
    const screenSurfaceGeometry = new THREE.BoxGeometry(0.88, 1.58, 0.005);
    const screenSurface = new THREE.Mesh(screenSurfaceGeometry, screenUIMaterial);
    screenSurface.position.set(0, 0.05, 0.31);
    kiosk.add(screenSurface);

    // Load UI texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/Picture1.png', (texture) => { 
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace; 
      screenUIMaterial.map = texture;
      screenUIMaterial.needsUpdate = true; 
    });

    // Position camera
    camera.position.set(4, 2, 4);
    camera.lookAt(0, 0, 0);

    // Mouse interaction variables
    let mouseDown = false;
    let mouseButton = 0;
    let mouseX = 0;
    let mouseY = 0;
    let autoRotate = true;

    // Mouse event listeners
    renderer.domElement.addEventListener('mousedown', (event: MouseEvent) => {
      mouseDown = true;
      mouseButton = event.button;
      mouseX = event.clientX;
      mouseY = event.clientY;
      autoRotate = false;
    });
    
    renderer.domElement.addEventListener('mousemove', (event: MouseEvent) => {
      if (!mouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      if (mouseButton === 0) {
        kiosk.rotation.y += deltaX * 0.008;
        kiosk.rotation.x += deltaY * 0.008;
        kiosk.rotation.x = Math.max(-Math.PI/4, Math.min(Math.PI/4, kiosk.rotation.x));
      } else if (mouseButton === 2) {
        camera.position.x -= deltaX * 0.01;
        camera.position.y += deltaY * 0.01;
      }
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
    
    renderer.domElement.addEventListener('mouseup', () => {
      mouseDown = false;
    });
    
    renderer.domElement.addEventListener('wheel', (event: WheelEvent) => {
      const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
      const factor = event.deltaY > 0 ? 1.05 : 0.95;
      const newDistance = Math.max(2.5, Math.min(12, distance * factor));
      
      const direction = camera.position.clone().normalize();
      camera.position.copy(direction.multiplyScalar(newDistance));
    });
    
    renderer.domElement.addEventListener('dblclick', () => {
      camera.position.set(4, 2, 4);
      kiosk.rotation.set(0, 0, 0);
      autoRotate = true;
    });
    
    renderer.domElement.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Auto-rotate demo
      if (autoRotate) {
        kiosk.rotation.y += 0.005;
      }
      
      // Screen UI texture animation
      if (screenUIMaterial.emissive) {
        screenUIMaterial.emissive.setHex(0x001122 + Math.floor((Math.sin(time * 2) + 1) * 0.5 * 0x002244));
      }
      
      // Dynamic lighting
      screenLight.intensity = 0.8 + Math.sin(time * 2) * 0.2;
      rimLight.intensity = 0.5 + Math.sin(time * 1.5) * 0.1;
      
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    // Start animation
    animate();
    setIsLoading(false);

    // Cleanup
    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div id="container" ref={containerRef}>
      {isLoading && (
        <div id="loading">
          <div className="loading-spinner"></div>
          Loading Professional Kiosk Model...
        </div>
      )}
      <div id="controls">
        <h3>F8 Metro Kiosk</h3>
        <p>🖱️ Left click + drag: Rotate</p>
        <p>🔍 Mouse wheel: Zoom</p>
        <p>⚡ Right click + drag: Pan</p>
        <p>🎯 Double click: Focus</p>
      </div>
      <div id="info">
        Professional Transit Kiosk<br />
        Realistic Materials & Lighting
      </div>
    </div>
  );
} 
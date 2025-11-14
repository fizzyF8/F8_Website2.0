import { useEffect, useRef, useState } from 'react';

export default function UnicornStudioEmbed({ 
  projectId = "1qpipNvszw8yfmoe6OyZ", 
  width = "100%", 
  height = "900px",
  fullPage = false 
}) {
  const elementRef = useRef(null);
  const sceneRef = useRef(null);
  const observerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer for visibility-based loading and pausing
    if (elementRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
            
            // Pause/resume animation based on visibility
            if (sceneRef.current && window.UnicornStudio) {
              try {
                if (entry.isIntersecting) {
                  // Resume animation when visible
                  if (sceneRef.current.play) sceneRef.current.play();
                } else {
                  // Pause animation when not visible
                  if (sceneRef.current.pause) sceneRef.current.pause();
                }
              } catch (e) {
                // Silently handle if pause/play methods don't exist
              }
            }
          });
        },
        {
          root: null,
          rootMargin: '50px', // Start loading slightly before visible
          threshold: 0.1
        }
      );

      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Only initialize when visible
    if (!isVisible) return;

    // Initialize script (optimized based on Framer component)
    const initializeScript = (callback) => {
      if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false };
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
        script.async = true;
        script.defer = true;
        script.onload = function() {
          if (!window.UnicornStudio.isInitialized) {
            UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
          }
          callback();
        };
        script.onerror = () => console.error("Failed to load UnicornStudio script");
        (document.head || document.body).appendChild(script);
      } else {
        callback();
      }
    };

    // Initialize Unicorn Studio
    const initializeUnicornStudio = () => {
      if (projectId && elementRef.current) {
        elementRef.current.setAttribute("data-us-project", projectId);

        if (window.UnicornStudio) {
          // Check for existing scene
          const existingScene = window.UnicornStudio.scenes?.find(
            scene => scene.element === elementRef.current || 
                     scene.element?.contains(elementRef.current)
          );

          if (existingScene) {
            existingScene.destroy();
          }

          // Initialize new scene
          window.UnicornStudio.init().then(scenes => {
            const ourScene = scenes.find(
              scene => scene.element === elementRef.current || 
                       scene.element?.contains(elementRef.current)
            );
            if (ourScene) {
              sceneRef.current = ourScene;
            }
          }).catch(err => {
            console.error("Failed to initialize UnicornStudio:", err);
          });
        }
      }
    };

    if (projectId) {
      if (window.UnicornStudio) {
        initializeUnicornStudio();
      } else {
        initializeScript(initializeUnicornStudio);
      }
    }

    // Cleanup
    return () => {
      if (sceneRef.current) {
        try {
          sceneRef.current.destroy();
        } catch (e) {
          // Silently handle cleanup errors
        }
        sceneRef.current = null;
      }
    };
  }, [projectId, isVisible]);

  // Detect device performance and adjust settings
  const getPerformanceSettings = () => {
    // Ensure we're in browser environment
    if (typeof window === 'undefined') {
      return {
        fps: '30',
        dpi: '1',
        scale: '1'
      };
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia && 
                                  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Detect low-end devices (heuristic based on hardware concurrency and memory)
    const isLowEndDevice = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || 
                          (navigator.deviceMemory && navigator.deviceMemory <= 4);
    
    if (prefersReducedMotion || isLowEndDevice) {
      return {
        fps: '24',
        dpi: '1',
        scale: '0.9'
      };
    }
    
    // Default optimized settings (balanced performance)
    return {
      fps: '30', // Reduced from 60 for better performance
      dpi: '1', // Reduced from 1.5 for better performance
      scale: '1'
    };
  };

  const perfSettings = getPerformanceSettings();

  const baseStyle = {
    width: width,
    height: height,
    position: 'relative',
    zIndex: 1,
    minHeight: '300px',
    // GPU acceleration optimizations
    transform: 'translateZ(0)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
  };

  const fullPageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    zIndex: 0,
    minHeight: '100vh',
    // GPU acceleration optimizations
    transform: 'translateZ(0)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    perspective: '1000px',
    // Mobile fixes
    maxWidth: '100vw',
    margin: 0,
    padding: 0,
  };

  return (
    <div 
      ref={elementRef}
      data-us-dpi={perfSettings.dpi}
      data-us-scale={perfSettings.scale}
      data-us-fps={perfSettings.fps}
      data-us-lazyload="true"
      style={fullPage ? fullPageStyle : baseStyle}
      className={`unicorn-studio-embed ${fullPage ? 'unicorn-studio-embed-fullpage' : ''}`}
      aria-label="Interactive 3D Animation showcasing Frog8 technology"
      role="img"
    />
  );
}

